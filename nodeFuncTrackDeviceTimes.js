// Input validation
if (!msg.payload) {
    node.error("Missing payload in message");
    return null;
}

let p = msg.payload; // This is the sensor data object
let devices = global.get("deviceTimes") || {};

// Validate required fields
if (!p.device_id) {
    node.error("Missing device_id in payload");
    return null;
}

if (typeof p.device_id !== 'string' && typeof p.device_id !== 'number') {
    node.error("device_id must be a string or number");
    return null;
}

let device_id = String(p.device_id); // Ensure string key

// Helper function to validate ISO date format (accepts both UTC and local formats)
function isValidISODate(dateString) {
    try {
        const date = new Date(dateString);
        // Check if the date is valid and the string can be parsed
        if (isNaN(date.getTime())) {
            return false;
        }
        
        // Accept both millisecond and microsecond precision timestamps
        // Standard ISO: 2025-11-04T11:45:08.978Z or 2025-11-04T11:45:08.978
        // Microsecond: 2025-11-04T11:45:08.978981
        const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3,6})?(Z|[+-]\d{2}:\d{2})?$/;
        return isoRegex.test(dateString);
    } catch (e) {
        return false;
    }
}

// Helper function to get local time in ISO format without timezone suffix
function getLocalISOString(date) {
    const localDate = new Date(date);
    // Get local time components
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    const hours = String(localDate.getHours()).padStart(2, '0');
    const minutes = String(localDate.getMinutes()).padStart(2, '0');
    const seconds = String(localDate.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

// Helper function to truncate timestamp to second precision in local time
function truncateToSeconds(isoString) {
    const date = new Date(isoString);
    return getLocalISOString(date);
}

// Validate and set timestamp in local time
let now_iso;
if (p.time_last_seen_iso) {
    if (isValidISODate(p.time_last_seen_iso)) {
        now_iso = truncateToSeconds(p.time_last_seen_iso);
    } else {
        node.warn("Invalid timestamp format: " + p.time_last_seen_iso + ", using system time");
        now_iso = getLocalISOString(new Date());
    }
} else {
    now_iso = getLocalISOString(new Date());
}

try {
    if (!devices[device_id]) {
        // First-ever report of device_id
        devices[device_id] = {
            first_seen_iso: now_iso,
            last_seen_iso: now_iso,
            device_name: p.device_name || null,
            protocol_id: p.protocol_id || null,
            protocol_name: p.protocol_name || null
        };
        node.log("New device registered: " + device_id + " (" + (p.device_name || 'Unknown') + ")");
    } else {
        // Update "last seen"
        devices[device_id].last_seen_iso = now_iso;
        // Optionally update name/protocol (if they can change)
        devices[device_id].device_name = p.device_name || devices[device_id].device_name;
        devices[device_id].protocol_id = p.protocol_id || devices[device_id].protocol_id;
        devices[device_id].protocol_name = p.protocol_name || devices[device_id].protocol_name;
    }

    global.set("deviceTimes", devices);

    // Add monitoring info
    const deviceCount = Object.keys(devices).length;
    if (deviceCount % 10 === 0) {
        node.log("Currently tracking " + deviceCount + " devices");
    }

    // Output useful info for downstream nodes or dashboard
    msg.tracking = devices[device_id];
    msg.tracking.total_devices = deviceCount;
    
    return msg;

} catch (error) {
    node.error("Error updating device tracking: " + error.message);
    return null;
}
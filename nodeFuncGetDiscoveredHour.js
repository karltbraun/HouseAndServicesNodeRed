let devices = global.get("deviceTimes") || {};
let deviceArray = Object.values(devices);

// Get current time and one hour ago
let now = new Date();
let oneHourAgo = new Date(now.getTime() - (60 * 60 * 1000)); // Subtract 1 hour in milliseconds

// Filter devices that were first seen within the last hour
let filteredDevices = deviceArray.filter(device => {
    if (!device.first_seen_iso) return false; // Exclude corrupted data (missing timestamp)
    
    // Parse the first_seen timestamp
    let firstSeenTime = new Date(device.first_seen_iso);
    
    // Check if first seen time is within the last hour
    return firstSeenTime >= oneHourAgo && firstSeenTime <= now;
});

// Sort by first seen time (most recent discoveries first)
let sortedDevices = filteredDevices
    .sort((a, b) => {
        // Use first_seen_iso field for sorting (most recent discoveries first)
        let timeA = new Date(a.first_seen_iso || 0).getTime();
        let timeB = new Date(b.first_seen_iso || 0).getTime();
        return timeB - timeA; // Sort descending (most recent first)
    })
    .map(device => ({
        // Ensure all important fields are included in the output
        device_id: device.device_id,
        device_name: device.device_name ? device.device_name.slice(-15) : device.device_name,
        protocol_id: device.protocol_id,
        protocol_name: device.protocol_name,
        first_seen_iso: device.first_seen_iso,
        last_seen_iso: device.last_seen_iso
    }));

return { payload: sortedDevices };

let devices = global.get("deviceTimes") || {};
let deviceArray = Object.values(devices);

// Get today's date in local time (start of day)
let today = new Date();
today.setHours(0, 0, 0, 0); // Set to start of today
let todayStr = today.toISOString().split('T')[0]; // Get YYYY-MM-DD format

// Filter devices that have NEVER been seen before today (first_seen TODAY)
let filteredDevices = deviceArray.filter(device => {
    if (!device.first_seen_iso) return false; // Exclude corrupted data (missing timestamp)
    
    // Extract date part from first_seen_iso timestamp
    let firstSeenDate = device.first_seen_iso.split('T')[0];
    return firstSeenDate === todayStr; // Include only if first seen TODAY
});

// Sort by most recent timestamp (using last_seen_iso field)
// and take only the top 10
let sortedDevices = filteredDevices
    .sort((a, b) => {
        // Use last_seen_iso field for sorting (most recent first)
        let timeA = new Date(a.last_seen_iso || 0).getTime();
        let timeB = new Date(b.last_seen_iso || 0).getTime();
        return timeB - timeA; // Sort descending (most recent first)
    })
    .slice(0, 10) // Take only the first 10
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

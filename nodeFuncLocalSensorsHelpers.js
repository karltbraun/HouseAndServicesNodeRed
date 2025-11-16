/**
 * Node-RED Function: Get Local Sensor Info
 * 
 * PURPOSE:
 * Helper function to retrieve sensor information from the global local_sensors table.
 * Can be used by other function nodes that need to look up device information.
 * 
 * USAGE EXAMPLES:
 * 
 * // Get specific device info
 * let deviceInfo = getLocalSensorInfo("101");
 * // Returns: { id_sensor_name: "SC91-C", sensor_name: "LIVING_ROOM", comment: "" }
 * 
 * // Get all devices
 * let allDevices = getLocalSensorInfo();
 * // Returns: entire local_sensors object
 * 
 * // Check if device exists
 * if (getLocalSensorInfo("101")) {
 *     // device exists
 * }
 */

function getLocalSensorInfo(deviceId) {
    const localSensors = global.get("local_sensors") || {};
    
    // If no deviceId provided, return entire table
    if (deviceId === undefined) {
        return localSensors;
    }
    
    // Return specific device info or null if not found
    return localSensors[String(deviceId)] || null;
}

function getSensorNameByDeviceId(deviceId) {
    const deviceInfo = getLocalSensorInfo(deviceId);
    return deviceInfo ? deviceInfo.sensor_name : null;
}

function getIdSensorNameByDeviceId(deviceId) {
    const deviceInfo = getLocalSensorInfo(deviceId);
    return deviceInfo ? deviceInfo.id_sensor_name : null;
}

function getAllDeviceIds() {
    const localSensors = getLocalSensorInfo();
    return Object.keys(localSensors);
}

// Example usage in a function node:
// You can copy the functions above into any function node that needs them,
// or use them inline like this:

// Example: Look up device info for routing
const deviceId = msg.payload.device_id;
const localSensors = global.get("local_sensors") || {};
const deviceInfo = localSensors[String(deviceId)];

if (deviceInfo) {
    node.log(`Processing device ${deviceId}: ${deviceInfo.sensor_name} (${deviceInfo.id_sensor_name})`);
    // Use deviceInfo for routing logic
} else {
    node.warn(`Unknown device ID: ${deviceId}`);
}

// Don't actually return anything in this helper file
return null;
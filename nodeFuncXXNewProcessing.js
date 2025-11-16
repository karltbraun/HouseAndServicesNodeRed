/**
 * Node-RED Function Node: XXNewProcessing
 *
 * - Expects global.local_sensors (dictionary of sensor info keyed by device_id)
 * - Expects global.local_sensors_count (integer, number of sensors last seen)
 * - Checks for sensor count mismatch and throws error if found
 * - Looks up device_id from incoming msg.payload in local_sensors
 * - If found, adds port_index to payload and outputs the message
 * - If not found, logs error and returns null
 */

// Get global variables
const localSensors = global.get("local_sensors") || {};
const localSensorsCount = global.get("local_sensors_count");

// Check sensor count
const currentCount = Object.keys(localSensors).length;
if (localSensorsCount && currentCount !== localSensorsCount) {
    node.error(`Sensor count mismatch: expected ${localSensorsCount}, found ${currentCount}`);
    return null;
}

// Lookup device_id in local_sensors
const deviceId = msg.payload.device_id;
const sensorInfo = localSensors[deviceId];

if (!sensorInfo) {
    node.error(`Unknown device_id: ${deviceId}`);
    return null;
}

// Add port_index to payload (mutate is fine for Node-RED efficiency)
msg.payload.port_index = sensorInfo.port_index;
return msg;

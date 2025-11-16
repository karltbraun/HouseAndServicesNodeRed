/**
 * Node-RED Function: Update Local Sensors Table
 * 
 * PURPOSE:
 * Receives MQTT configuration messages and updates the global local_sensors table
 * used for device routing and identification across the Node-RED flows.
 * 
 * INPUT:
 * - msg.topic: Should be "KTBMES/ROSA/sensors/config/local_sensors"
 * - msg.payload: JSON object containing sensor configuration data
 * 
 * EXPECTED PAYLOAD FORMAT:
 * {
 *     "101": {
 *         "id_sensor_name": "SC91-C",
 *         "sensor_name": "LIVING_ROOM",
 *         "comment": ""
 *     },
 *     "138": { ... },
 *     ...
 * }
 * 
 * OUTPUT:
 * - Updates global.local_sensors with the new configuration
 * - Returns confirmation message with update status
 * 
 * GLOBAL VARIABLE:
 * - Sets/updates: global.local_sensors (object)
 */

// Validate that this is the correct topic
const expectedTopic = "KTBMES/ROSA/sensors/config/local_sensors";
if (msg.topic !== expectedTopic) {
    node.warn(`Unexpected topic: ${msg.topic}. Expected: ${expectedTopic}`);
    return null;
}

// Validate payload exists and is an object
if (!msg.payload || typeof msg.payload !== 'object') {
    node.error("Invalid payload: Expected JSON object", msg);
    return null;
}

try {
    // If payload is a string, try to parse it as JSON
    let sensorConfig = msg.payload;
    if (typeof msg.payload === 'string') {
        sensorConfig = JSON.parse(msg.payload);
    }
    
    // Validate the structure of the configuration
    let validEntries = 0;
    let invalidEntries = 0;
    
    for (const [deviceId, config] of Object.entries(sensorConfig)) {
        // Basic validation of each entry
        if (config && 
            typeof config.id_sensor_name === 'string' && 
            typeof config.sensor_name === 'string' && 
            typeof config.comment === 'string') {
            validEntries++;
        } else {
            node.warn(`Invalid configuration for device ID ${deviceId}:`, config);
            invalidEntries++;
        }
    }
    
    // Update the global table
    global.set("local_sensors", sensorConfig);
    
    // Log the update
    node.log(`Local sensors table updated: ${validEntries} valid entries, ${invalidEntries} invalid entries`);
    
    // Create response message
    const responseMsg = {
        payload: {
            status: "success",
            message: "Local sensors table updated",
            total_entries: validEntries + invalidEntries,
            valid_entries: validEntries,
            invalid_entries: invalidEntries,
            timestamp: new Date().toISOString(),
            device_ids: Object.keys(sensorConfig)
        },
        topic: msg.topic,
        _msgid: msg._msgid
    };
    
    return responseMsg;
    
} catch (error) {
    node.error(`Failed to update local sensors table: ${error.message}`, msg);
    
    // Return error message
    return {
        payload: {
            status: "error",
            message: error.message,
            timestamp: new Date().toISOString()
        },
        topic: msg.topic,
        _msgid: msg._msgid
    };
}
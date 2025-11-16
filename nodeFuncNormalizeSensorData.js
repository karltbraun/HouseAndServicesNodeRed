/**
 * Node-RED Function: Parse Into Devices
 * 
 * PURPOSE:
 * Parses incoming MQTT messages to extract device information and standardize
 * the payload format for device monitoring and tracking.
 * 
 * INPUT:
 * - msg.topic: MQTT topic string containing device ID (expected format: path/to/device_id/endpoint)
 * - msg.payload: Numeric value representing battery status or device state
 * 
 * OUTPUT:
 * Returns a standardized message object with:
 * - payload.timestampS: Current local date/time in "YYYY-MM-DD HH:MM" format
 * - payload.device_id: Extracted device identifier from MQTT topic
 * - payload.battery_ok: Original payload value (typically battery status)
 * - payload.note: Status message ("No issues" or error description)
 * 
 * PROCESSING:
 * 1. Extracts device ID from the second-to-last element of the MQTT topic path
 * 2. Validates input data (topic format and payload type)
 * 3. Generates local timestamp for the observation
 * 4. Creates standardized payload structure for downstream processing
 * 5. Preserves original message ID and topic for traceability
 * 
 * ERROR HANDLING:
 * - Invalid topic format: Sets note to "Invalid topic format" and logs error
 * - Invalid payload type: Sets note to "Invalid payload type" and logs error
 * - Continues processing even with errors to maintain data flow
 * 
 * USAGE:
 * Typically used as the first processing step in device monitoring flows
 * to normalize incoming sensor data before tracking or alerting.
 */

// Extract device ID from topic (next to last element in path)
const topicParts = msg.topic.split('/');
const deviceId = topicParts[topicParts.length - 2]; // Next to last element

const battery_ok = msg.payload
let note = "No issues"

// Function to get current local date/time in YYYY-MM-DD hh:mm format
function getCurrentLocalDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// Optional error checking
if (typeof deviceId === 'undefined') {
    note = "Invalid topic format";
    node.error(note, msg);
}

if (typeof msg.payload !== 'number') {
    note = "Invalid payload type";
    node.error(note, msg);

}

// Create new payload object
const newPayload = {
    timestampS: getCurrentLocalDateTime(),
    device_id: deviceId,
    battery_ok: battery_ok,
    note: note
};

// Create new message with clean payload
const newMsg = {
    payload: newPayload,
    // Optional: Carry through original properties
    _msgid: msg._msgid,
    topic: msg.topic
};


return newMsg;

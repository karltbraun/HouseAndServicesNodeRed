// Extract device ID from topic (next to last element in path)
const topicParts = msg.topic.split('/');
const deviceId = topicParts[topicParts.length - 2]; // Next to last element

const battery_ok = msg.payload
let note = "No issues"

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
    time: new Date().toISOString(),
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

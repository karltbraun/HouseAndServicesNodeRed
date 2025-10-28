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

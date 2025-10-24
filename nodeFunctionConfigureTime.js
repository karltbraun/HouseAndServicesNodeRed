// msg.payload has the current timestamp (Milliseconds since epoch)
// Convert to ISO string format and adjust msg.payload
const timestamp = msg.payload; 
const isoTime = new Date(msg.payload).toISOString();

// Create a new message object or modify existing one
const newMsg = {
    payload: {
        timestamp: timestamp,
        timestampS: isoTime
    }
};

return newMsg;
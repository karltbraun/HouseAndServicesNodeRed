// setup input to DetermineOutputPath to set everything to false

// Validate input timestamp
if (!msg.payload) {
    node.warn("No timestamp provided in msg.payload");
    return null;
}

const newMsg = {};
const ts = msg.payload;

newMsg.payload = msg.payload;
newMsg.persist = {
    tag: 'RESET',
    match: false,
    timestamp: ts,
    timestampS: new Date(ts).toLocaleString('sv-SE', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    }).replace(' ', ' ')
};

return newMsg;

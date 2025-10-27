// Finish setting up the HTTP request

const newMsg = {};

// HTTP Request node expects these parameters

newMsg.method = msg.method;
newMsg.url = msg.url;
newMsg.payload = null;

// Store original values in a custom object (will persist)
// as HTTP request will clear out payload top level

newMsg.persist = {
    tag: msg.tag,
    method: msg.method,
    url: msg.url,
    expected_string: msg.expected_string,
    match: false,
    timestamp: msg.timestamp,
    timestampS: new Date(msg.timestamp).toLocaleString('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).replace(' ', ' ')
};

return newMsg;
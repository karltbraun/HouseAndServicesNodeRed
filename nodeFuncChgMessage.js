// Distribute status to appropriate dashboard output based on service tag
// Extract tag and status, create output message 

if (!msg.topic || typeof msg.topic !== 'string') {
    node.error("Invalid or missing topic", msg);
    return null;
}

const topic = msg.topic.toLowerCase(); // Fixed typo
const topic_parts = topic.split('/');

if (topic_parts.length < 3) {
    node.error("Topic must have at least 3 segments", msg);
    return null;
}

let tag = topic_parts[topic_parts.length - 1];
let method = topic_parts[topic_parts.length - 2];
let node_name = topic_parts[topic_parts.length - 3];

let outputMsg = {
    payload: msg.payload,
    tag: tag,
    method: method,
    node: node_name
};

return outputMsg;

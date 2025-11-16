// Distribute status to appropriate dashboard output based on service tag

// This is for a multi-output function node with 7 outputs:
// Output 1: tag == 'last_published'
// Output 2: node == 'ktbcs' and method == 'http' and tag == 'result'
// Output 3: node == 'ktbcs' and method == 'https' and tag == 'result'
// Output 4: node == 'skinner' and method == 'http' and tag == 'result'
// Output 5: node == 'skinner' and method == 'https' and tag == 'result'
// Output 6: node == 'nas' and method == 'http' and tag == 'result'
// Output 7: reset (sends false when tag == 'reset')
// Note: There is no https test for nas

if (!msg.topic || typeof msg.topic !== 'string') {
    node.error("Invalid or missing topic", msg);
    return null;
}

const topic = msg.topic.toLowerCase();
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

// Define output positions for clarity
const OUTPUT_LAST_PUBLISHED = 0;
const OUTPUT_KTBCS_HTTP = 1;
const OUTPUT_KTBCS_HTTPS = 2;
const OUTPUT_SKINNER_HTTP = 3;
const OUTPUT_SKINNER_HTTPS = 4;
const OUTPUT_NAS_HTTP = 5;
const OUTPUT_RESET = 6;

// Initialize all outputs to null
let outputs = new Array(7).fill(null);

// check for reset first
if (tag === 'reset') {
    // Send false to reset output
    outputs[OUTPUT_RESET] = false;
    return outputs;

// check for timestamp
} else if (tag === 'last_published') {
    // Send to output 1
    outputs[OUTPUT_LAST_PUBLISHED] = outputMsg;
    return outputs;

// if tag is not 'last_published' or 'reset', it better be 'result'
} else if (tag !== 'result') {
    // Invalid tag - not 'last_published', 'result', or 'reset'
    node.error(`Invalid tag: ${tag}. Expected 'last_published', 'result', or 'reset'`, msg);
    return null;

// tag is result - the output of checking if the web site is up and returns the right string
// we route to a different LED based on node and method
} else {
    if (node_name === 'ktbcs' && method === 'http') {
        outputs[OUTPUT_KTBCS_HTTP] = outputMsg;
    } else if (node_name === 'ktbcs' && method === 'https') {
        outputs[OUTPUT_KTBCS_HTTPS] = outputMsg;
    } else if (node_name === 'skinner' && method === 'http') {
        outputs[OUTPUT_SKINNER_HTTP] = outputMsg;
    } else if (node_name === 'skinner' && method === 'https') {
        outputs[OUTPUT_SKINNER_HTTPS] = outputMsg;
    } else if (node_name === 'nas' && method === 'http') {
        outputs[OUTPUT_NAS_HTTP] = outputMsg;
    } else {
        // Unknown node/method combination for result
        node.error(`Unknown node/method combination for result: ${node_name}/${method}`, msg);
        return null;
    }
    return outputs;
}
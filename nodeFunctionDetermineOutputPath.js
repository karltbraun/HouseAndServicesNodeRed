// Distribute status to appropriate dashboard output based on service tag

// Extract tag and status, create output message 
const tag = msg.persist.tag;
const matchStatus = msg.persist.match;
const outputMsg = { payload: matchStatus };

// Route to correct output based on tag
switch (tag.toUpperCase()) {
    case 'KTBCS_HTTP':
        return [outputMsg, null, null, null, null]; 
    case 'KTBCS_HTTPS':
        return [null, outputMsg, null, null, null]; 
    case 'SKINNER_HTTP':
        return [null, null, outputMsg, null, null]; 
    case 'SKINNER_HTTPS':
        return [null, null, null, outputMsg, null]; 
    case 'NAS_HTTP':
        return [null, null, null, null, outputMsg]; 
    case 'RESET':
        // set everything to false
        outputMsg.payload = false;
        return [outputMsg, outputMsg, outputMsg, outputMsg, outputMsg];
    default:
        node.warn(`Unknown tag: ${tag}`);
        return null;
} 
// Debug function to verify what's in the message after HTTP request
// Place this function node between HTTP request and debug node

// Log the entire message structure
node.log("Full message object:");
node.log(JSON.stringify(msg, null, 2));

// Check specific properties
node.log("msg.payload:", typeof msg.payload);
node.log("msg.persist:", msg.persist);
node.log("msg.statusCode:", msg.statusCode);

// List all message properties
node.log("All msg properties:", Object.keys(msg));

return msg;
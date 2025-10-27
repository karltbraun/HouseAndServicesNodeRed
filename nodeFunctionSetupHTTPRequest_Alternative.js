// Alternative: Modify existing msg object instead of creating new one
const url = "http://ktbcs.xyz";
const method = "GET";

// Use existing msg object
msg.method = method;
msg.url = url;
msg.payload = null;

return msg;
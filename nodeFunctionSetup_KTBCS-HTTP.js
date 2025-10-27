// Store preserved values in a custom object
const tag = "KTBCS_HTTP"
const url = "http://ktbcs.xyz";
const method = "GET";
const expected_string = "<title>KTBCS - Professional Technology Consulting</title>";

const newMsg = {};

flow.set('svc_service', tag);

newMsg.tag = tag;
newMsg.url = url;
newMsg.method = method;
newMsg.expected_string = expected_string;
newMsg.timestamp = msg.payload;

return newMsg;
// input: msg.payload
//   msg.payload.timestamp - current timestamp in milliseconds since epoch
//   msg.payload.timestampS - current timestamp in ISO string format

const newMsg = msg || {};

newMsg.payload.url = 'http://ktbcs.xyz';
newMsg.payload.method = "HTTP";
newMsg.payload.expectStr = "<title>KTBCS - Professional Technology Consulting</title>";

return newMsg;
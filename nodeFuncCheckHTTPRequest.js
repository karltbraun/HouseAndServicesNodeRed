// input: 
//   msg.payload - the output of the HTTP request node
//   msg.persist - preserved values from setup node
//     msg.persist.method - original HTTP method
//     msg.persist.url - original URL
//     msg.persist.expected_string - string to look for in payload

const expected_string = msg.persist.expected_string;
const returned_string = String(msg.payload || "");
const match = returned_string.includes(expected_string);

// copy all existing persist data
const newMsg = { ...msg };

// update payload and persist.match
newMsg.payload = match;
newMsg.persist.match = match;

return newMsg;
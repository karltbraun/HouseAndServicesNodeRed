// Get timestamp - check if inject node provided one, otherwise use current time
const timestamp = msg.timestamp || Date.now();
const status = msg.payload;

const tsMsg = {};
const stMsg = {};

tsMsg.payload = timestamp;
stMsg.payload = status;

return [tsMsg, stMsg];

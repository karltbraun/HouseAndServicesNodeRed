// get the current time, change it to a string showing ISO format
const currentTime = new Date().toISOString();
msg.payload.time = currentTime;

// Get current time and format it as "YYYY-MM-DD hh:mm"
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');

const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}`;

// Set the formatted time to msg.payload for Node-RED output
msg.payload = "Last Checked: " + formattedTime;

return msg;
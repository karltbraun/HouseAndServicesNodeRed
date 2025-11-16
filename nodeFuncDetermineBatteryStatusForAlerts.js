// if device_name starts with UNKNOWN, return null
if (msg.payload.device_name.startsWith("UNKNOWN")) {
    return null;
}

// if battery_ok is an integer == 1, battery is OK
// we don't report it
if (msg.payload.battery_ok === 1) {
    return null;
}

// we have either a false (0) or some other value
let subject = msg.payload.device_name + " Battery Status Not OK " + msg.payload.battery_ok;

let line1 = "Alert Generated At: " + new Date().toLocaleString() + "\n";
let line2 = "Device: " + msg.payload.device_name + "\n";
let line3 = "Battery Status: " + msg.payload.battery_ok + "\n";

let newMsg = {
    "topic": subject,
    "payload": line1 + line2 + line3
}
return newMsg;


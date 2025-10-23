let subject = "Battery Status Not OK" + msg.payload.device_name;
let line1 = msg.timestamp + "\n";
let line2 = "Device: " + msg.payload.device_name + "\n";
let line3 = "Battery Status: " + msg.payload.battery_ok + "\n";

let newMsg = {
    "topic": subject,
    "payload": line1 + line2
}
return newMsg;

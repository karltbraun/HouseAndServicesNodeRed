// Add error checking
if (!msg.payload || typeof msg.payload.device_name === 'undefined') {
    node.error("Invalid message format", msg);
    return null;
}

let deviceName = msg.payload.device_name;
let timestamp = msg.timestamp
let batteryOk = msg.payload.battery_ok === 1 ? true : msg.payload.battery_ok === 0 ? false : null;

// output payload should be boolean
// other message attributes defined for email output
let newMsg = {
    payload: batteryOk,
    batteryOk: batteryOk,
    deviceName: deviceName,
    timestamp: timestamp
};

switch (deviceName) {
    case "Living_Room":
        return [newMsg, null, null, null, null];
    case "Patio":
        return [null, newMsg, null, null, null];
    case "Shrine_Room":
        return [null, null, newMsg, null, null];
    case "Porch":
        return [null, null, null, newMsg, null];
    default:
        return [null, null, null, null, newMsg];
}


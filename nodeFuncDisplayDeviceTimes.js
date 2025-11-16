let devices = global.get("deviceTimes") || {};
let deviceArray = Object.values(devices);
return { payload: deviceArray };

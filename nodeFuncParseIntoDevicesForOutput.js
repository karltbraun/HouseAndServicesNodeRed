
// Get the sensor_name from the payload
let sensorName = msg.payload.sensor_name ? msg.payload.sensor_name.toUpperCase() : null;

// Get the global local_sensors table
let localSensors = global.get("local_sensors") || {};

// Find the output index for this sensor_name
let outputIndex = null;
let sensorKeys = Object.keys(localSensors);
for (let i = 0; i < sensorKeys.length; i++) {
    let entry = localSensors[sensorKeys[i]];
    if (entry.sensor_name && entry.sensor_name.toUpperCase() === sensorName) {
        outputIndex = i;
        break;
    }
}

// Prepare output array (one slot per output port)
let outputs = Array(sensorKeys.length + 1).fill(null);

if (outputIndex !== null) {
    // Valid sensor, send to correct port
    outputs[outputIndex] = msg;
} else {
    // Not found, send to error port (last port)
    msg.error = `Unknown sensor_name: ${sensorName}`;
    outputs[outputs.length - 1] = msg;
}

return outputs;


// Check inProcess flow variable and control flow execution
// If inProcess is true: we are still processing previously triggered flow.
//     exit the flow (return null)
// If inProcess is false: set it to true and proceed

const inProcess = flow.get('svc_in_process_1');

// if already processing - exit the flow by returning null
if (inProcess === true) {
    node.warn("Flow already in process - exiting");
    flow.set('svc_aborted', true); 
    return null;
}

// Not processing - set inProcess flag to true and proceed
// save time stamp for future flow reference
flow.set('svc_aborted', false);
flow.set('svc_in_process_1', true);
node.log("Set svc_in_process_1 to true - proceeding with flow");

flow.set('svc_lastCheckTime', msg.payload); // trigger passes time stamp
flow.set('svc_lastCheckTimeS', new Date(msg.payload).toLocaleString());

return msg;
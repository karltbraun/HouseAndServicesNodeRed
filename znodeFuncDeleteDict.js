// Delete the flow dictionary (if it exists)
flow.set('service_status', null);
flow.set('batteryStatuses', null);

node.log("Deleted flow dictionary 'service_status'");

return null;

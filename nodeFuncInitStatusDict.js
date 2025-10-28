// we are going to have a flow dictionary for our various objects
// The dictionary will be called service_status 
// 
// The dictionary will be defined as follow:
// service_status = {
//     name: String,
//     ping: Boolean,
//     http: Boolean,
//     https: Boolean,
//     timestamp: Number,
//     timestampS: String
// }

// Initialize flow dictionary service_status if it doesn't exist
let serviceStatus = flow.get('service_status') || {};

return msg;


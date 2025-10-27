// Wait for svc_in_process_2 with timeout protection

// Set sleep duration in milliseconds
const sleepDuration = 10;

async function waitForProcessFlag(timeoutMs = 10000) { // 10 second timeout
    const startTime = Date.now();
    
    while (flow.get('svc_in_process_2') === true) {
        if (Date.now() - startTime > timeoutMs) {
            throw new Error("Timeout waiting for svc_in_process_2 to become false");
        }
        await new Promise(resolve => setTimeout(resolve, sleepDuration));
    }
}

(async () => {
    try {
        node.log("Waiting for svc_in_process_2 to become false...");
        await waitForProcessFlag();
        node.log("svc_in_process_2 is now false - proceeding");
        node.send(msg);
    } catch (error) {
        node.error("Wait failed: " + error.message);
        // Optionally send to error output or handle gracefully
    }
})();
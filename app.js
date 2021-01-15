
const enterPrompt = require('./lib/prompt');

async function init() {
    try {
        await enterPrompt();
    }
    catch (error) {
        console.error(error);
    }

}

init();
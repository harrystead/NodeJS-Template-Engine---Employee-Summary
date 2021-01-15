
const prompt = require('./lib/prompt');

async function init() {
    try {
        await prompt.enterPrompt();
    }
    catch (error) {
        console.error(error);
    }

}

init();
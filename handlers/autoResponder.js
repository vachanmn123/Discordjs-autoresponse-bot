const {
    readdirSync
} = require("fs");
console.log("Welcome to autoResponder HANDLER /--/ Discord: TakedownIvy#7802".yellow);

// jsdoc
// @param {Discord.Client} client
// @returns {void}
// @description
// This function is called when the bot is ready.
// It loads the autoResponses.


module.exports = (client) => {
    try {
        // Load the json files in autoResponses/ folder
        const autoResponses = readdirSync("./autoResponses/").filter(file => file.endsWith(".json"));
        autoResponses.forEach(file => {
            const autoResponse = require(`../autoResponses/${file}`);
            client.autoResponder.set(autoResponse.name, autoResponse);
            console.log(`Loaded autoResponder: ${autoResponse.name}`.green);
        });
    }
    catch (e) {
        console.log(e);
    }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/milrato
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
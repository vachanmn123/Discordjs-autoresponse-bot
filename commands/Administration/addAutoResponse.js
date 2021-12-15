const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const fs = require('fs')
module.exports = {
  name: "addAutoResponse", //the command name for execution & for helpcmd [OPTIONAL]
  category: "Administration", //the command category for helpcmd [OPTIONAL]
  aliases: ["addresponse"], //the command aliases for helpcmd [OPTIONAL]
  cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
  usage: "addAutoResponse", //the command usage for helpcmd [OPTIONAL]
  description: "Add an auto response", //the command description for helpcmd [OPTIONAL]
  memberpermissions: ["MANAGE_ROLES"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  minargs: 0, // minimum args for the message, 0 == none [OPTIONAL]
  maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
  minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
  maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
  argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
  argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try{
        // Get the json file from the arguments
        let json = args.join(" ").replace("```json", "").replace("```", "").replace("`", "");
        console.log(json)
        // Get the file
        try{
            let file = JSON.parse(json);
            if (!file.name) {return message.reply("MAKE SURE U FOLLOW THE FORMAT: `NO NAME FOUND`")}
            if (!file.type) {return message.reply("MAKE SURE U FOLLOW THE FORMAT: `NO TYPE FOUND`")}
            if (!file.triggers) {return message.reply("MAKE SURE U FOLLOW THE FORMAT: `NO TRIGGERS FOUND`")}
            if (!file.responses) {return message.reply("MAKE SURE U FOLLOW THE FORMAT: `NO RESPONSES FOUND`")}
            if (!(typeof file.triggers == "object")) {return message.reply("MAKE SURE U FOLLOW THE FORMAT: `TRIGGERS SHOULD BE A LIST`")}
            if (!(typeof file.responses == "object")) {return message.reply("MAKE SURE U FOLLOW THE FORMAT: `RESPONSES SHOULD BE A LIST`")}
            if (!(typeof file.name == "string")) {return message.reply("MAKE SURE U FOLLOW THE FORMAT: `NAME SHOULD BE A STRING`")}
            if (!(typeof file.type == "string")) {return message.reply("MAKE SURE U FOLLOW THE FORMAT: `TYPE SHOULD BE A STRING`")}
            // Create a new file in ../../autoResponses/
            var path = require("path");
            const newFilePath = path.join(__dirname, `../../autoResponses/${file.name}.json`);
            fs.writeFileSync(newFilePath, JSON.stringify(file, null, 4), (err) => {if (err) return message.reply("ERROR: " + err)});
        } catch(err) {message.reply("ERROR" + err); return;}
        const embed = new MessageEmbed()
            .setColor(ee.color)
            .setTitle("Add an auto response")
            .setDescription(`:white_check_mark: You have successfully added an auto response!`)
            .setFooter(`${ee.footertext}`)
            .setTimestamp();
        return message.reply({embeds: [embed]});
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
  }
}
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/

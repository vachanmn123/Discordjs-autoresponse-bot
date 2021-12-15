const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = { //if [OPTIONAL] it means, you don't need to type it!
  name: "autoresponderload", //the Command Name [REQUIRED]
  category: "Administration", //the Command Category [OPTIONAL]
  aliases: ["reloadresponses", "updateresponses"], //the command aliases [OPTIONAL]
  cooldown: 2, //the Command Cooldown (Default in /botconfig/settings.json) [OPTIONAL]
  usage: "autoresponderload", //the Command Usage [OPTIONAL]
  description: "RELOADS THE AUTORESPONSES!", //the command description [OPTIONAL]
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
        require("../../handlers/autoResponder.js")(client);
        const emb = new MessageEmbed()
            .setColor(ee.color)
            .setTitle("Reloaded AutoResponses!")
            .setDescription(`:white_check_mark: AutoResponses reloaded!`)
            .setFooter(`${ee.footertext}`)
            .setTimestamp();
        message.reply({embeds: [emb]});
      }
  }

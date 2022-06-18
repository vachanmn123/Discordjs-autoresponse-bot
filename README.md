# THIS REPOSITORY IS NO LONGER BEING ACTIVELY DEVELOPED AND CONTAINS MANY VULNERABILITIES, PLEASE REVIEW CODE BEFORE USING.

# This is a discord bot which allows you to automatically respond to a message containg a specific word or phrase.

# Installation

To install the bot, You will need to have nodejs and npm installed on your machine.
next clone this repository and run `npm install` in the root directory.

# Running the bot

To run the bot, you will need to have a discord bot token. You can get one from the [discordapp.com/developers/applications/me](https://discordapp.com/developers/applications/me) page and create a new application and then under the bot section create a new bot. Copy the token and paste it into the `token` variable in the `config.json` file found at `./botconfig/config.json`.  
To add a channel to the auto responder whitelist you will need to add an entry to the `AutoResponderChannelWhitelist` array in the `settings.json` file.

# Inviting the bot to your server

To invite your bot go back to the application page in the discord developers portal and in the oauth2 section under URL generator select the following permissions, and copy the URL and paste it into your URL bar.
WILL ADD IMAGE HERE!

# Setting up the dashboard

To setup the dashboard, set the `dashboardPort` in `./botconfig/settings.json` to the port you want the dashboard to run on.

# Adding more auto responses - MANUAL

To add more auto responses, you will need to add a new file to the `autoresponse` folder. The file name should be a single word describing the response. The file should contain a list of phrases to respond to. Here is an example:

```json
{
  "name": "offlineModeWarning",
  "type": "string",
  "triggers": ["SERVER IS RUNNING IN OFFLINE/INSECURE MODE!"],
  "responses": [
    "Hey! This is just a warning to tell you that your server is running in the offline mode to allow cracked players to join. There is nothing to worry about!"
  ]
}
```

# Contributing

To contribute to the bot, you can either fork the repository or create a new issue.

# Credits

Thanks to https://milrato.eu /--/ Discord: Tomato#6966 for the base code.

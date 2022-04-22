const {ClientUser} = require("discord.js");
const config = require("../config.json");
const {commandHandlerConfig} = require("../functions/command-handler")

module.exports = {
  name: 'messageCreate',
  once: false,
  execute(message) {
    if(!(message.author.id === message.client.user.id)){
      if (message.guildId){
        commandHandlerConfig.commandHandlerServer(message, "commands")
      } else {
        commandHandlerConfig.commandHandlerDM(message, "commands")
      }
    } else {
      //console.log(`Message ignored, sent by the bot.`)
    }
  },
};


const axios = require("axios");
const discord = require("discord.js");
require('dotenv').config();

module.exports = {
  name: "newaccount",
  aliases: ["newa"].push(this.name),
  dm: true,
  server: true,
  permissions: "all",
  category: "BackLinks",
  description: "Get lists",
  syntax: "",
  execute(message, msgItems, otherDetails) {
    console.log(`The command ${this.name} has been called by ${message.author.username}.`)
    console.log(msgItems)

    axios.get ('http://localhost:8000/lists/New-discord', {
      headers : otherDetails["headers"],
      data: {
        discord_username : message.author.username,
        discord_discriminator : message.author.discriminator,
        discord_id : message.author.id,
      }
    }, )
      .then(res => {
        let data = res.data[0]

      })
      .catch(err => {
        console.log('Error: ', err.message);
      });
  }
}
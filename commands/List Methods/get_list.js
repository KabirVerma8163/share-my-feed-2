const axios = require("axios");
const discord = require("discord.js");
// const discordPassword =
require('dotenv').config();

module.exports = {
  name: "getlists",
  aliases: ["getlists"],
  dm: true,
  server: true,
  permissions: "all",
  category: "BackLinks",
  description: "Get lists",
  syntax: "",
  execute(message, msgItems, otherDetails){
    console.log(`The command ${this.name} has been called by ${message.author.username}.`)
    console.log(msgItems)

    // axios.post('http://localhost:8000/list', {
    //   list_id: msgItems[0],
    // })
    axios.get ('http://localhost:8000/lists/Get-lists', {
      headers : otherDetails["headers"],
      data: {
        discord_id : message.author.id,
        // discord_username : message.author.username
      }
      }, )
      .then(res => {
        let data = res.data[0]
        // console.log(data.links)
        // console.log(data)
        let fields = []
        data.links.forEach((link, index) => {
          let item = {
            name : link.link_name,
            value : `https://${link.link_url}`
          }
          fields.push(item)
        })
        message.channel.send({
          embeds : [new discord.MessageEmbed()
            .setTitle(data.list_name)
            .setFields(...fields)
          ]
        })
      })
      .catch(err => {
        console.log('Error: ', err.message);
      });

  }
}
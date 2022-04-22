const config = require('../config.json');
const fs = require('fs')
const {serverDetailsConfig} = require("../config");

module.exports = {
  name: 'guildCreate',
  once: false,
  execute(guild) {
    if(!config.server_list[guild.id]){
      // Defines the new values for the server using the Sample in config.json
      serverDetailsConfig.server.serverDefine(guild, (newGuildObject) => {
        config.server_list[guild.id] = newGuildObject
        console.log(`Successfully joined the server: ${guild.name}`)
        const user = guild.client.users.cache.get(guild.ownerId);
        user.send(`thank you for inviting me to your server`)
      })
        .then(() => {
          //Saving the data to a JSON file
          fs.writeFile('./config.json', JSON.stringify(config), (err => {
            if (err) console.log(err)
            else console.log(`Config.json has been updated successfully`)
          }))
        })
    } else {
      if(guild.name !== "ToastedWaffle's server"){
        const user = guild.client.users.cache.get(guild.ownerId);
        user.send(`thank you for inviting me to your server`)
          .catch(console.error)
      }
      console.log(`I have rejoined ${guild}!`)
    }
  },
};
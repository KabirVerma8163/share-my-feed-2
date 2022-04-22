const fs = require("fs");
const config = require("../config.json");
const commandsFolderPath = `../commands/`

let header
header = {
  'Content-Type': 'application/json',
  'Client-Type': ['Discord'],
  'Client-Password': [process.env.DISCORD_PASSWORD]
}

let commandHandlerConfig = {
  commandHandlerServer: function (message, folderPath){
    let commandName, msgItems
    let guildId = message.guildId
    const guild = config.server_list[guildId]
    const validPrefixes = guild['prefixes']

    validPrefixes.forEach((prefix) => {
      let msgPrefix = message.content[prefix.length - 1]
      if (msgPrefix === prefix) {
        msgItems = message.content.split(' ')
        commandName = msgItems[0].substring(1).toLowerCase()
      }
    })

    if (commandName) {
      let files = commandHandlerConfig.getCommands(folderPath)

      files.forEach((file) => {
        const command = require(`${commandsFolderPath}${file}`)
        if (command.aliases) {
          if (command.aliases.filter((alias) => alias === commandName).length) {
            if (command.server) {
              msgItems.shift()
              command.execute(message, msgItems, {"headers" : header})
            } else {
              console.log("Command can't be run in a server")
            }
          }
        }
      })
    }

  },
  commandHandlerDM: function (message, folderPath){
    let commandName, msgItems
    const prefix = config.default_prefix
    if (message.content[prefix.length - 1] === prefix) {
      msgItems = message.content.split(' ')
      commandName = msgItems[0].substring(1).toLowerCase()
    }

    if (commandName) {
      let files = commandHandlerConfig.getCommands(folderPath)

      files.forEach((file) => {
        const command = require(`${commandsFolderPath}${file}`)
        if(command.aliases) {
          if (command.aliases.filter((alias) => alias === commandName).length) {
            if(command.dm){
              msgItems.shift()
              command.execute(message, msgItems, {"headers" : header})
            } else {
              console.log("Command can't be run in a dm")
            }
          }
        }
      })
    }
  },
  getCommands: function(folderPath){
    let files = [], directories = []

    fs.readdirSync(folderPath, { withFileTypes: true })
      .map((dirent) => {
        if (dirent.isDirectory()) directories.push(dirent.name)
        else files.push(dirent.name)
      })
    directories.forEach((directory) => {
      let newFolderPath = folderPath + "/" + directory
      fs.readdirSync(newFolderPath, { withFileTypes: true })
        .forEach((file) => files.push(directory + "/" + file.name) )
    })

    files = files.filter((file) => file.endsWith(".js"))

    return files
  },
}

module.exports.commandHandlerConfig = commandHandlerConfig
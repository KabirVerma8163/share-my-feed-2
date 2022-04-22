let serverDetailsConfig = {
  "server": {
    "owner": {
      "ownerSample": {
        "ownerUserName": "",
        "ownerDiscriminator": "",
        "ownerTag": "",
        "ownerId": "",
      },
      serverOwnerInfoDefine: async (guild, callback) => {
        let user = await guild.client.users.fetch(guild.ownerId)
        let ownerDetails = {
          "ownerUserName": user.username,
          "ownerDiscriminator": user.discriminator,
          "ownerTag": user.tag,
          "ownerId": guild.ownerId
        }
        callback(ownerDetails)
      }
    },
    "prefixes": {
      "prefixesSample": {
        "prefixes" : ["_"]
      },
      serverPrefixDefine: async (callback) => {
        let prefixes = serverDetailsConfig.server.prefixes.prefixesSample.prefixes
        callback(prefixes)
      }
    },
    "serverDetails": {
      "serverDetailsSample": {
        "channels": {
          "botCommandsAllowed": [],
          "botCommandsNotAllowed": []
        }
      },
      serverDetailsDefine: async (callback) => {
        let serverDetails = serverDetailsConfig.server.serverDetails.serverDetailsSample
        callback(serverDetails)
      }

    },
    serverDefine: async (guild, callback) => {
    // Defines all the necessary values for the server
      let newGuildObject = {}
      await serverDetailsConfig.server.owner.serverOwnerInfoDefine(guild, (ownerDetails) => {
        newGuildObject["owner"] = ownerDetails
      })
      await serverDetailsConfig.server.prefixes.serverPrefixDefine((prefixes) => {
        newGuildObject["prefixes"] = prefixes
      })
      await serverDetailsConfig.server.serverDetails.serverDetailsDefine((serverDetails) => {
        newGuildObject["serverDetails"] = serverDetails
      })
      // Defines the guild of the server data
      newGuildObject["guildId"] = guild.id
      // passes the newGuildObject which contains all the necessary values for the server
      callback(newGuildObject)
    }
    // "guild": {},
    // guildDefine: async (guild, callback) => {
    //   callback(guild)
    // }
  },
}

module.exports.serverDetailsConfig = serverDetailsConfig
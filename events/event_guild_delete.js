module.exports = {
  name: 'guildDelete',
  on: false,
  execute(guild) {
    console.log(`I have left the guild ${guild}.`);
    // const user = guild.client.users.cache.get(guild.ownerId);
    // user.send(`See you`)
    //   .then((message) => {
    //     console.log(`Message Sent Successfully: \n ${message}`)
    //   })
    //   .catch(console.error)

    // console.log(guild)
  },
};
// Require the necessary discord.js classes
const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json')
require('dotenv').config();

const discordPassword = "SecretaryAPI_Password"

const myIntents = new Discord.Intents()
myIntents.add(Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_BANS,
  Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
  Discord.Intents.FLAGS.GUILD_WEBHOOKS, Discord.Intents.FLAGS.GUILD_INVITES,
  Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MESSAGES,
  Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
  Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING)

// Create a new client instance
const client = new Discord.Client({ intents: myIntents, partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN)

// // When the client is ready, run this code (only once)
// client.once('ready', (c) => {
//   console.log(`Ready! Logged in as ${c.user.tag}`);
// });
//
// client.on('messageCreate', async (msg) => {
//   // if (msg.content === 'Hello') msg.reply('Hi');
//   // if (msg.content === '?SaveLink')console.log(msg.author);
//   console.log(msg.content)
//   // console.log(msg)
// });
//
// client.on('messageDelete', async (msg) => {
//   // if (msg.content === 'Hello') msg.reply('Hi');
//   // if (msg.content === '?SaveLink')console.log(msg.author);
//   console.log(msg)
//   // console.log(msg)
// });
//
// client.on('channelCreate', (msg) => {
//   // if (msg.content === 'Hello') msg.reply('Hi');
//   // if (msg.content === '?SaveLink')console.log(msg.author);
//   console.log("Channel made")
//   msg.setName("Bhushan")
//   // console.log(msg)
// });
//
// client.on('', (guild) => {
//
// })


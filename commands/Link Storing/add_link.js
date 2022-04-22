
const https = require("axios")
const http = require("http")
const axios = require("axios");

module.exports = {
  name: "addlink",
  aliases: ["addlink", "addl", "linkadd", "linka"],
  dm: true,
  server: true,
  permissions: "all",
  category: "BackLinks",
  description: "Adds a command to a specified category with a specified description",
  syntax: "",
  execute(message, msgItems, ){
    console.log(`The command ${this.name} has been called by ${message.author.username}.`)
    console.log(msgItems)

    axios.get('http://localhost:8000/list')
      .then(res => {
        // const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
        // console.log('Status Code:', res.status);
        // console.log('Date in Response header:', headerDate);
        //
        // const users = res.data;
        //
        // for(user of users) {
        //   console.log(`Got user with id: ${user.id}, name: ${user.name}`);
        // }
      })
      .catch(err => {
        console.log('Error: ', err.message);
      });
  }
}
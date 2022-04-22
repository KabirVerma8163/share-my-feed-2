module.exports = {
  name: "deletelink",
  aliases: ["deletelink", "dellink", "dlink", "linkdel", "linkdelete", "linkd"],
  dm: true,
  server: true,
  permissions: "all",
  category: "BackLinks",
  description: "Deletes a specific link",
  syntax: "",
  execute(msgItems, message){
    console.log(`The command ${this.name} has been called.`)
  }
}
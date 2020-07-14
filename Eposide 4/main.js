const Discord = require("discord.js")
const fs = require("fs")
const db = require("quick.db")
const config = require("./config.json")
const client = new Discord.Client()

let prefixx = config.prefix

client.on("ready",() => {
    console.log("Logged to discord")
    client.user.setStatus("dnd")
    client.user.setActivity("Dream Code <3",{})
})

client.commands = new Discord.Collection(undefined,undefined);
client.aliases = new Discord.Collection(undefined,undefined);

fs.readdir("./cmds/", async (err, files) => {

    if(err) console.log(err)
    if(!files) return console.log("Unable to find commands.")
    let jsfile = files.filter(f => f.split(".").pop() == "js")
    if (jsfile <= 0){
        console.log("Unable to find commands.")
        return;
    }

    for (const f of jsfile){
        let props = require(`./cmds/${f}`)
        console.log(`${f} loaded.`)
        client.commands.set(props.help.name,props)
        for (const aliase of props.conf.aliase){
            client.aliases.set(aliase,props)
        }
    };
    console.log("All Commands have been loaded successfully.")
})

client.on("message", async message => {
    if(message.author.bot) return;
    let prefix;
    if(!message.guild) prefix = prefixx
    if(message.guild) prefix = prefixx
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return message.channel.send("You can't use commands via DMs in this bot. You can only use guild").catch(e => client.channels.cache.get("724983000286101636").send(e))
    let messageArray = message.content.split(' ').join(' ').split(" ");
    let cmd = messageArray[0]
    let args = messageArray.slice(1);

    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(!commandfile) commandfile = client.aliases.get(cmd.slice(prefix.length))
    if(commandfile) commandfile.run(client,message,args);

})
client.login(config.token)
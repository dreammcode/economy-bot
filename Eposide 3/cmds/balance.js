const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async(client,message,args) => {


    let user; 
    if(!args[0]) user = message.author
    if(args[0] && isNaN(args[0])) user = message.mentions.users.first()
    if(args[0] && !isNaN(args[0])){
        user = client.users.cache.get(args[0]);
        if(!message.guild.members.cache.has(args[0])) return message.channel.send(`:x: User not found.`)
    }
    

    let bal = db.fetch(`balance.${user.id}`) || "0"

    let embed = new Discord.MessageEmbed()
    .setColor("#7CFC00")
    .setTimestamp()
    .setAuthor(user.tag,user.avatarURL())
    .setDescription(`Balance:\`${bal.toString()}\``)

    message.channel.send(embed)
}

exports.conf = {
    aliase:["bal"]
}

exports.help = {
    name:"balance",
    usage:"balance / balance userID / balance @user",
    description:"You learn balance"
}
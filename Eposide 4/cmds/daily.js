const Discord = require("discord.js")
const db = require("quick.db")
const ms = require("parse-ms")
module.exports.run = async(client,message,args) => {


    let reward = Math.floor(Math.random() * 1000); //random 1-1000 Sample:951
    let time = 43200000
//24 hours = 86400000
//12 hours = 86400000/2 = 43200000
    let daily = await db.fetch(`daily.${message.author.id}`)

    if(daily !== null && time - (Date.now() - daily) > 0){
        let msg = ms(time - (Date.now() - daily));
        message.reply(`You already collected your daily reward, you can come back in **${msg.hours}h ${msg.minutes}m ${msg.seconds}s**`)

    }else {
        let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username,message.author.displayAvatarURL())
        .setColor("RANDOM")
        .setDescription(`**Collected:**\`${reward}\``)

        message.channel.send(embed)
db.add(`balance.${message.author.id}`,reward)
        db.set(`daily.${message.author.id}`,Date.now())
    }
}

exports.conf = {
    aliase:["daily"]
}

exports.help = {
    name:"dailyreward",
    usage:"dailyreward",
    description:"Empty :/"
}
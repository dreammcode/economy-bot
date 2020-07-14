const Discord = require("discord.js")
const db = require("quick.db")
const ms = require("parse-ms")
module.exports.run = async(client,message,args) => {
    const mesage = message
    let lootreward = Math.floor(Math.random() * 350);
    
    let time = 600000//ummm 10 minutes = 600 000
    
    let lootDB = await db.fetch(`loot.${mesage.author.id}`)
    
    if(lootDB !== null && time - (Date.now() - lootDB) > 0){
        let msg = ms(time - (Date.now() - lootDB))
        mesage.reply(`:x: You already collected your loot reward you can come back in \`${msg.hours}h ${msg.minutes}m ${msg.seconds}s\``)
    
    }else {
    
        mesage.reply(`You collected loot reward \`${lootreward}\``)
    
        db.add(`balance.${mesage.author.id}`,lootreward)
        db.set(`loot.${mesage.author.id}`,Date.now())
}
}

exports.conf = {
    aliase:[]
}

exports.help = {
    name:"loot",
    usage:"loot",
    description:"Empty :/"
}




/*
const mesage = message
let lootreward = Math.floor(Math.random() * 350);

let time = 600000//ummm 10 minutes = 600 000

let lootDB = await db.fetch(`loot.${mesage.author.id}`)

if(lootDB !== null && time - (Date.now() - lootDB) > 0){
    let msg = ms(time - (Date.now() - lootDB))
    mesage.reply(`:x: You already collected your loot reward you can come back in \`${msg.hours}h ${msg.minutes}m ${msg.seconds}s\``)

}else {

    mesage.reply(`You collected loot reward \`${lootreward}\``)

    db.add(`balance.${mesage.author.id}`)
    db.set(`loot.${mesage.author.id}`,Date.now())

    //mesage :DDDDD
    //fix mesage = message
}*/
//Constants
const config = require('./config.json')
const Discord = require('discord.js')
const client = new Discord.Client()
const translate = require('node-google-translate-skidz')
const es_channel = client.channels.get(config.spanish-channel)
const en_channel = client.channels.get(config.english-channel)

client.on("message", message => {
    if(message.channel.id === es_channel.id) {
        translateText('es', 'en', en_channel, message.content)
    } else if(message.channel.id === en_channel.id) {
        translateText('en', 'es', es_channel, message.content)
    }
})

function translateText(language_from,language_to,channel,content) {
    translate({
        text: content,
        source: language_from,
        target: language_to
      }, function(result) {
        var embed = new Discord.RichEmbed()
            .setDescription(result)
            .setAuthor(message.author.username, message.author.displayAvatarURL)
        channel.send(embed)
      })
}

client.login(config.bot_token)
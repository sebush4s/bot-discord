const Command = require("../base/Command.js");
const { version } = require("discord.js");
const moment = require("moment");
const Discord = require('discord.js');
require("moment-duration-format");

class Stats extends Command {
  constructor (client) {
    super(client, {
      name: "stats",
      description: "Statystyki bota",
      usage: "stats",
    });
  }

  async run (message, args, level) {
    const duration = moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const embed = new Discord.MessageEmbed()
  	.setColor('#66c955')
  	.setTitle('Statystyki')
  	.addField('Mem usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
    .addField('Uptime', `${duration}`)
    .addField('Użytkownicy', `${this.client.users.cache.size.toLocaleString()}`)
    .addField('Serwery', `${this.client.guilds.cache.size.toLocaleString()}`)
    .addField('Kanały', `${this.client.channels.cache.size.toLocaleString()}`)
    .addField('Discord.js', `v${version}`)
    .addField('Node', `${process.version}`)
  	.setTimestamp()
    message.channel.send(embed)
  }
}

module.exports = Stats;

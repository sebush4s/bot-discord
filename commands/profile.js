const Command = require("../base/Command.js");
const Discord = require('discord.js');

class MyLevel extends Command {
  constructor (client) {
    super(client, {
      name: "profil",
      description: "Wyświetla twój profil.",
      usage: "profil",
      guildOnly: true
    });
  }

  async run (message, args, level) {
    const friendly = this.client.config.permLevels.find(l => l.level === level).name;
    const embed = new Discord.MessageEmbed()

    	.setColor('#a206c9')
    	.setTitle(message.author.username)
    	.addField('Poziom uprawnień', `\`\`\`${level}\`\`\``)
      .addField('Ranga', `\`\`\`${friendly}\`\`\``)
    	.setImage(message.author.avatarURL)
    	.setTimestamp()

    message.channel.send(embed);
  }
}

module.exports = MyLevel;

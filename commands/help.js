const Command = require("../base/Command.js");
const Discord = require('discord.js');

class Help extends Command {
  constructor (client) {
    super(client, {
      name: "help",
      description: "Wyświetla dostępne komendy.",
      category: "System",
      usage: "help [komenda]",
      aliases: ["h", "pomoc"]
    });
  }

  async run (message, args, level) {
    if (!args[0]) {
      const settings = message.settings;

      const myCommands = message.guild ? this.client.commands.filter(cmd => this.client.levelCache[cmd.conf.permLevel] <= level) : this.client.commands.filter(cmd => this.client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);

      const commandNames = myCommands.keyArray();
      const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
      let currentCategory = "";
      let output = `**Użyj ${this.client.config.defaultSettings.prefix}pomoc <nazwa komendy> żeby zobaczyć o niej więcej informacji**\n`;
      const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
      sorted.forEach( c => {
        const cat = c.help.category.toProperCase();
        if (currentCategory !== cat) {
          output += `\u200b\n **__${cat}__**\n`;
          currentCategory = cat;
        }
        output += `${settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} - ${c.help.description}\n`;
      });

      const embed = new Discord.MessageEmbed()
    	.setColor('#66c955')
    	.setTitle('Lista komend')
    	.setDescription(output, {code:"asciidoc", split: { char: "\u200b" }})
    	.setTimestamp()
      message.channel.send(embed)

    } else {
      let command = args[0];
      if (this.client.commands.has(command)) {
        command = this.client.commands.get(command);
        if (level < this.client.levelCache[command.conf.permLevel]) return;
        const embed = new Discord.MessageEmbed()
      	.setColor('#66c955')
      	.setTitle(command.help.name)
      	//.setDescription(`${command.help.description}\nużycie - ${command.help.usage}\nalisy - ${command.conf.aliases.join(", ")}`, {code:"asciidoc"}`)
        .addField('Opis', `\`\`\`${command.help.description}\`\`\``)
        .addField('Użycie', `\`\`\`${command.help.usage}\`\`\``)
        .addField('Aliasy', `\`\`\`${command.conf.aliases.join(", ")}\`\`\``)
      	.setTimestamp()
        message.channel.send(embed)
      }
    }
  }
}

module.exports = Help;

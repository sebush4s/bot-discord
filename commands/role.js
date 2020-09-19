const Command = require("../base/Command.js");
const Discord = require("discord.js");

class Roles extends Command {
  constructor (client) {
    super(client, {
      name: "role",
      description: "Pokazuje role użytkownika.",
      category:"Generalne",
      usage: "role <użytkownik>",
      aliases: ["moje-role"],
    });
  }

  async run (message, args, level) {
    let user;

    if(message.mentions.users.first()) {
        user = message.mentions.users.first()
    }else if (args[0]) {
        user = message.guild.members.cache.get(args[0]).user;
    }else{
        user = message.author;
    }

    let roles = `<@&${message.guild.member(user)._roles.join('> <@&')}>`

    if(roles === "<@&>") roles = "Ten użytkownik nie ma żadnych roli!";

    const embed = new Discord.MessageEmbed()
        .setTitle(`Role użytkownika${user.tag}`)
        .setColor(message.member.displayHexColor)
        .setDescription(roles)

    return message.channel.send(embed)
  }
}

module.exports = Roles;

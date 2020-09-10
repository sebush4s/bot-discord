const Discord = require('discord.js');
module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (message) {

    if (message.author.bot) return;

    if (message.guild && !message.channel.permissionsFor(message.guild.me).missing("SEND_MESSAGES")) return;

    const settings = this.client.getSettings(message.guild);

    message.settings = settings;

    const prefixMention = new RegExp(`^<@!?${this.client.user.id}> ?$`);
    if (message.content.match(prefixMention)) {
      const embed = new Discord.MessageEmbed()
      .setTitle('Prefix')
      .setDescription(`Prefix na tym serwerze to \`${settings.prefix}\``)
      return message.channel.send(embed);
    }

    if (message.content.indexOf(settings.prefix) !== 0) return;

    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.guild && !message.member) await message.guild.fetchMember(message.author);

    const level = this.client.permlevel(message);

    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
    if (!cmd) return;

    if (cmd && !message.guild && cmd.conf.guildOnly)
      return message.channel.send("Tej komendy nie można wykonać w wiadomości prywatnej. Spróbuj jej użyć na jakimś serwerze.");

    if (level < this.client.levelCache[cmd.conf.permLevel]) {
      if (settings.systemNotice === "true") {
        const embed = new Discord.MessageEmbed()
        .setColor('#eb4034')
        .setTitle('Brak uprawnień')
        .setDescription(`Wymagany poziom uprawnień do użycia tej komendy to ${this.client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`)
        .addField('Twój poziom uprawnień', `${level} (${this.client.config.permLevels.find(l => l.level === level).name})`);
        return message.channel.send(embed);
      } else {
        return;
      }
    }

    message.author.permLevel = level;

    message.flags = [];
    while (args[0] &&args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }

    this.client.logger.log(`${this.client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) wykonal komende ${cmd.help.name}`, "cmd");
    cmd.run(message, args, level);
  }
};

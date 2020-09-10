// Witanie nowych uzytkownikow
const Discord = require('discord.js');

module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (member) {

    const settings = this.client.getSettings(member.guild);

    if (settings.welcomeEnabled !== "true") return;

    const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

    const embed = new Discord.MessageEmbed()

  	.setColor('#66c955')
  	.setTitle('Nowy użytkownik!')
  	.setDescription(welcomeMessage)
  	.setTimestamp()

    member.guild.channels.cache.find(c => c.name === settings.welcomeChannel).send(embed).catch(console.error);
  }
};

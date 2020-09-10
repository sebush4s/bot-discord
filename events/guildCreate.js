module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (guild) {

    this.client.user.setActivity(`${this.client.settings.get("default").prefix}help | ${this.client.guilds.cache.size} Serweów`);
    this.client.logger.log(`Dodano nowy serwer: ${guild.name} (${guild.id}) | ${guild.memberCount - 1} uzytkownikow`);
  }
};

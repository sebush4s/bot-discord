module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (guild) {

    this.client.user.setActivity(`${this.client.settings.get("default").prefix}help | ${this.client.guilds.cache.size} Serwerow`);
    this.client.settings.delete(guild.id);
    this.client.logger.log(`Usunieto z serwera: ${guild.name} (${guild.id}) | ${guild.memberCount} uzytkownikow`);
  }
};

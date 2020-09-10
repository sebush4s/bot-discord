module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run () {

    await this.client.wait(1000);

    this.client.appInfo = await this.client.fetchApplication();
    setInterval( async () => {
      this.client.appInfo = await this.client.fetchApplication();
    }, 60000);

    if (!this.client.settings.has("default")) {
      if (!this.client.config.defaultSettings) throw new Error("Nie mozna zaladowac podstawowych ustawien z pliku lub bazy danych!");
      this.client.settings.set("default", this.client.config.defaultSettings);
    }

    this.client.user.setActivity(`${this.client.settings.get("default").prefix}help | ${this.client.guilds.cache.size} Serwerow`);

    this.client.logger.log(`${this.client.user.tag} nadzoruje: ${this.client.users.cache.size} uzytkownikow | ${this.client.guilds.cache.size} serwerow.`, "ready");
  }
};

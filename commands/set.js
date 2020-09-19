const Command = require("../base/Command.js");

class SetCMD extends Command {
  constructor(client) {
    super(client, {
      name: "set",
      description: "Zobacz lub zmień ustawienia dla swojego serwera.",
      category: "System",
      usage: "set <view/get/edit> <key> <value>",
      guildOnly: true,
      aliases: ["setting", "settings"],
      permLevel: "Administrator"
    });
  }

  async run(message, [action, key, ...value], level) { // eslint-disable-line no-unused-vars
    // Komenda by Feris
    const settings = message.settings;
    const defaults = this.client.settings.get("default");
    const overrides = this.client.settings.get(message.guild.id);
    if (!this.client.settings.has(message.guild.id)) this.client.settings.set(message.guild.id, {});
  
    if (action === "edit") {
      if (!key) return message.reply("Podaj klucz do zmiany");
      if (!settings[key]) return message.reply("Taki klucz nie istnieje!");
      const joinedValue = value.join(" ");
      if (joinedValue === settings[key]) return message.reply("To ustawienia ma już tą wartość!");

      if (!this.client.settings.has(message.guild.id)) this.client.settings.set(message.guild.id, {});
      
      this.client.settings.set(message.guild.id, joinedValue, key);
      message.reply(`${key} pomyślnie zmieniono na ${joinedValue}`);
    } else
  
    // If a user does `-set del <key>`, let's ask the user if they're sure...
    if (action === "del" || action === "reset") {
      if (!key) return message.reply("Prosze podaj klucz do usunięcia (resetu).");
      if (!settings[key]) return message.reply("Taki klucz nie istnieje w ustawieniach");
      if (!overrides[key]) return message.reply("Ten klucz ma już domyślne ustawienia.");

      const response = await this.client.awaitReply(message, `Czy jesteś pewny że chcesz ustawić \`${key}\` do ustawień domyślnych \`${defaults[key]}\`?`);

      if (["y", "yes", "tak", "t"].includes(response)) {

        this.client.settings.delete(message.guild.id, key);
        message.reply(`${key} został pomyślnie zresetowany do wartości domyślnej.`);
      } else

      if (["n","no","cancel", "nie", "n", "anuluj"].includes(response)) {
        message.reply(`Twoje ustawienia dla \`${key}\` pozostaje \`${settings[key]}\``);
      }
    } else

    if (action === "get") {
      if (!key) return message.reply("Prosze podaj klucz do zobaczenia");
      if (!settings[key]) return message.reply("Ten klucz nie istnieje w ustawieniach!");
      message.reply(`Wartość ${key} jest obecnie ${settings[key]}`);
      
    } else {
      const array = [];
      Object.entries(settings).forEach(([key, value]) => {
        array.push(`${key}${" ".repeat(20 - key.length)}::  ${value}`); 
      });
      await message.channel.send(`= Aktualne ustawienia gildi =\n${array.join("\n")}`, {code: "asciidoc"});
    }
  }
}

module.exports = SetCMD;

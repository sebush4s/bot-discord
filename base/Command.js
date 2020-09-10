class Command {

  constructor (client, {
    name = null,
    description = "Brak opisu.",
    category = "Różne",
    usage = "Brak użycia.",
    enabled = true,
    guildOnly = false,
    aliases = new Array(),
    permLevel = "User"
  }) {
    this.client = client;
    this.conf = { enabled, guildOnly, aliases, permLevel };
    this.help = { name, description, category, usage };
  }
}
module.exports = Command;

const Command = require("../base/Command.js");

class Eval extends Command {
  constructor (client) {
    super(client, {
      name: "eval",
      description: "WYkonywanie kodu Javascript.",
      category:"System",
      usage: "eval <kod>",
      aliases: ["ev"],
      permLevel: "Bot Owner"
    });
  }

  async run (message, args, level) {
    const code = args.join(" ");
    try {
      const evaled = eval(code);
      const clean = await this.client.clean(evaled);
      const MAX_CHARS = 3 + 2 + clean.length + 3;
      if (MAX_CHARS > 2000) {
        message.channel.send("Output miał powyżej 2000 znaków. Wysyłanie pliku.", { files: [{ attachment: Buffer.from(clean), name: "output.txt" }] });
      }
      message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${await this.client.clean(this.client, err)}\n\`\`\``);
    }
  }
}

module.exports = Eval;

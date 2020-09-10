const input = require("readline-sync");
const Enmap = require("enmap");
const fs = require("fs");

let baseConfig = fs.readFileSync("./util/setup_base.txt", "utf8");

const defaultSettings = {
  "prefix": "-",
  "modLogChannel": "mod-log",
  "modRole": "Moderator",
  "adminRole": "Administrator",
  "systemNotice": "true",
  "welcomeChannel": "welcome",
  "welcomeMessage": "Użytkownik {{user}} dołączył na serwer! :confetti_ball:",
  "welcomeEnabled": "false"
};

const settings = new Enmap({ name: "settings", cloneLevel: "deep" });

(async function () {
  console.log("Rozpoczynanie konfiguracji. Jesli chcesz to zrobic recznie, wcisnij CTRL+C!");
  await settings.defer;
  if (settings.has("default")) {
    if (input.keyInYN("Ustawienia domyslne są już obecne. Przywroc domyslne? ")) {
      settings.set("default", defaultSettings);
    }
  } else {
    console.log("Wstawianie domyślnych ustawien serwerow do bazy danych...");
    settings.set("default", defaultSettings);
  }

  const token = input.question("Wprowadz token bota: ");

  baseConfig = baseConfig
    .replace("{{defaultSettings}}", JSON.stringify(defaultSettings, null, 2))
    .replace("{{token}}", `"${token}"`);

  fs.writeFileSync("./config.js", baseConfig);
  console.log("PAMIETAJ, ABY NIGDY NIE UDOSTĘPNIAC SWOJEGO TOKENU!");
  console.log("Konfiguracja zakonczona!");
  await settings.close();
}());

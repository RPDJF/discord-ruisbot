// Configuration file for the game "Rui's Mine"
const gameName = "Rui's Mine";
const gameLogo = "https://i.ibb.co/L84rGdT/ruismine-logo.png";
const gameThumbnail =
  "https://cdn-icons-png.flaticon.com/512/1213/1213235.png?w=360";
const gameCoolDownInMinute = 30;
const minimumRounds = 2;

// Items
const items = [
  {
    value: 3,
    occurence: 1000, // 100%
    name: {
      fr: "pierre",
      en: "stone",
    },
    emoji: ":rock:",
  },
  {
    value: 8,
    occurence: 500, // 50%
    name: {
      fr: "charbon",
      en: "coal",
    },
    emoji: "<:coal_dust:1155122780166160394>",
  },
  {
    value: 20,
    occurence: 250, // 25%
    name: {
      fr: "lingot de fer",
      en: "iron",
    },
    emoji: "<:Iron_ingot:1155120062286536724>",
  },
  {
    value: 100,
    occurence: 125, // 12.5%
    name: {
      fr: "lingot d'or",
      en: "gold",
    },
    emoji: "<a:gold:1155121920119934976>",
  },
  {
    value: 600,
    occurence: 30, // 3%
    name: {
      fr: "diamant",
      en: "diamond",
    },
    emoji: "<a:diamond:1155119834045087774>",
  },
  {
    value: 3000,
    occurence: 10, // 1%
    name: {
      fr: "émeraude",
      en: "emerald",
    },
    emoji: "<a:emerauld:1155119016474574898>",
  },
];

module.exports = {
  gameName,
  items,
  minimumRounds,
  gameLogo,
  gameThumbnail,
  gameCoolDownInMinute,
};

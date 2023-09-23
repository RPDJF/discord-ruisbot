// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "evillaugh",
    description: {
        en: "Evil laughter or mischief.",
        fr: "Rire diabolique ou espièglerie."
    },
    usage: "evillaugh",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `:smiling_imp: ${msg.author} lets out an evil laugh, filled with mischief. :joy:`,
                `${msg.author} is up to no good, laughing mischievously! :smirk:`,
                `:smirk: ${msg.author} can't help but laugh mischievously. :smiling_imp:`,
                `${msg.author} embraces their inner mischief with an evil laugh. :joy:`,
                `:joy: ${msg.author} plots something mischievous and can't stop laughing. :smirk:`,
                `${msg.author} enjoys a moment of mischief with an evil laugh. :smiling_imp:`
            ],
            fr: [
                `:smiling_imp: ${msg.author} éclate d'un rire diabolique, empli d'espièglerie. :joy:`,
                `${msg.author} ne prépare rien de bon, riant de manière espiègle ! :smirk:`,
                `:smirk: ${msg.author} ne peut s'empêcher de rire de manière espiègle. :smiling_imp:`,
                `${msg.author} embrasse sa nature espiègle avec un rire diabolique. :joy:`,
                `:joy: ${msg.author} prépare quelque chose d'espiègle et ne peut pas arrêter de rire. :smirk:`,
                `${msg.author} profite d'un moment d'espièglerie avec un rire diabolique. :smiling_imp:`
            ]
        };

        const randomIndex = Math.floor(Math.random() * phrases[guild.lang].length);
        const randomPhrase = phrases[guild.lang][randomIndex];

        const image = (await axios.get(`https://api.otakugifs.xyz/gif?reaction=${args[0]}`)).data;
        const embeds = embedUtility.short(randomPhrase);
        embeds[0].data.image = { url: image.url };

        msg.reply({ embeds }).catch((err) => {
            console.error(err);
            return (1);
        });
    },
};
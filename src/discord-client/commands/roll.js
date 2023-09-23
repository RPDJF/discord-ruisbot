// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "roll",
    description: {
        en: "Playfully roll around.",
        fr: "Jouer à se rouler joyeusement."
    },
    usage: "roll",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `${msg.author} playfully rolls around with joy! :stuck_out_tongue:`,
                `:stuck_out_tongue: ${msg.author} can't resist rolling around playfully! :joy:`,
                `${msg.author} enjoys some playful rolling around! :stuck_out_tongue_winking_eye:`,
                `${msg.author} rolls around with a smile! :joy:`,
                `:joy: ${msg.author} can't help but roll around playfully! :stuck_out_tongue_winking_eye:`,
                `${msg.author} has a fun time rolling around! :stuck_out_tongue:`
            ],
            fr: [
                `${msg.author} se roule joyeusement avec malice ! :stuck_out_tongue:`,
                `:stuck_out_tongue: ${msg.author} ne peut résister à jouer à se rouler joyeusement ! :joy:`,
                `${msg.author} prend plaisir à se rouler joyeusement ! :stuck_out_tongue_winking_eye:`,
                `${msg.author} se roule avec le sourire ! :joy:`,
                `:joy: ${msg.author} ne peut s'empêcher de jouer à se rouler joyeusement ! :stuck_out_tongue_winking_eye:`,
                `${msg.author} passe un bon moment à se rouler joyeusement ! :stuck_out_tongue:`
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
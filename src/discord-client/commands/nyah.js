// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "nyah",
    description: {
        en: "Express a cute 'Nyah!'",
        fr: "Exprimer un mignon 'Nyah!'"
    },
    usage: "nyah",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `:cat: ${msg.author} playfully says 'Nyah!' :heart:`,
                `${msg.author} channels their inner cat with a cute 'Nyah!' :cat2:`,
                `:cat2: ${msg.author} can't resist a sweet 'Nyah!' :heart:`,
                `${msg.author} lets out an adorable 'Nyah!' :cat:`,
                `:heart: ${msg.author} expresses cuteness with a 'Nyah!' :cat2:`,
                `${msg.author} can't help but go 'Nyah!' in a cute way! :heart:`
            ],
            fr: [
                `:cat: ${msg.author} dit avec malice 'Nyah !' :heart:`,
                `${msg.author} canalise son côté chat avec un mignon 'Nyah !' :cat2:`,
                `:cat2: ${msg.author} ne peut résister à un tendre 'Nyah !' :heart:`,
                `${msg.author} lâche un adorable 'Nyah !' :cat:`,
                `:heart: ${msg.author} exprime la mignonnerie avec un 'Nyah !' :cat2:`,
                `${msg.author} ne peut s'empêcher de dire 'Nyah !' de manière mignonne ! :heart:`
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
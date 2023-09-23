// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "punch",
    description: {
        en: "punch someone.",
        fr: "frapper quelqu'un."
    },
    usage: "punch <user|random>",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const target = args[1] || msg.guild.members.cache.random().user;
        const phrases = {
            en: [
                `:face_with_symbols_over_mouth: ${msg.author} throws a punch at ${target}!`,
                `:punch: ${msg.author} delivers a powerful blow to ${target}'s face!`,
                `:boxing_glove: ${msg.author} engages in a fierce brawl with ${target}!`,
                `:boom: Explosive fists as ${msg.author} and ${target} trade punches!`,
                `:anger: ${msg.author} unleashes their rage, pummeling ${target}!`,
                `:boom: A collision of fists as ${msg.author} and ${target} engage in combat!`
            ],
            fr: [
                `:face_with_symbols_over_mouth: ${msg.author} lance un coup de poing à ${target} !`,
                `:punch: ${msg.author} délivre un coup puissant au visage de ${target} !`,
                `:boxing_glove: ${msg.author} s'engage dans une lutte acharnée avec ${target} !`,
                `:boom: Des poings explosifs alors que ${msg.author} et ${target} échangent des coups de poing !`,
                `:anger: ${msg.author} libère sa colère, encaissant ${target} !`,
                `:boom: Une collision de poings alors que ${msg.author} et ${target} se battent !`
            ]
        };        

        const randomIndex = Math.floor(Math.random() * phrases[guild.lang].length);
        const randomPhrase = phrases[guild.lang][randomIndex];

        const image = (await axios.get(`https://api.otakugifs.xyz/gif?reaction=${args[0]}`)).data;
        const embeds = embedUtility.short(randomPhrase);
        embeds[0].data.image = { url: image.url };

        msg.reply({ embeds }).catch((err) => {
            console.error(err);
            return(1);
        });
    },
};
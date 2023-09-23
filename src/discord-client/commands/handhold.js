// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "handhold",
    description: {
        en: "Hold hands with someone.",
        fr: "Tenir la main de quelqu'un."
    },
    usage: "handhold <user|random>",
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
                `:two_hearts: ${msg.author} holds hands with ${target} lovingly! :handshake:`,
                `${msg.author} and ${target} walk hand in hand, sharing a special bond! :couple_with_heart:`,
                `:handshake: ${msg.author} and ${target} clasp their hands together in a sign of unity! :two_hearts:`,
                `${msg.author} and ${target} interlock their fingers, feeling the warmth of their connection! :heart_eyes:`,
                `:two_hearts: ${msg.author} and ${target} share a tender moment by holding hands! :handshake:`,
                `:couple_with_heart: ${msg.author} and ${target} enjoy the sweetness of holding hands! :two_hearts:`
            ],
            fr: [
                `:two_hearts: ${msg.author} tient la main de ${target} avec amour ! :handshake:`,
                `${msg.author} et ${target} marchent main dans la main, partageant un lien spécial ! :couple_with_heart:`,
                `:handshake: ${msg.author} et ${target} joignent leurs mains en signe d'unité ! :two_hearts:`,
                `${msg.author} et ${target} entrelacent leurs doigts, ressentant la chaleur de leur connexion ! :heart_eyes:`,
                `:two_hearts: ${msg.author} et ${target} partagent un moment tendre en se tenant la main ! :handshake:`,
                `:couple_with_heart: ${msg.author} et ${target} apprécient la douceur de se tenir la main ! :two_hearts:`
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
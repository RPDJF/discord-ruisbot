// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "brofist",
    description: {
        en: "Give someone a brofist.",
        fr: "Donner un coup de poing amical à quelqu'un."
    },
    usage: "brofist <user|random>",
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
                `:fist: ${msg.author} gives a friendly brofist to ${target}! :muscle:`,
                `${msg.author} and ${target} exchange a strong brofist! :boom:`,
                `:fist::fist: ${msg.author} and ${target} bump fists in a show of unity! :raised_hands:`,
                `${msg.author} and ${target} share a brofist moment! :fist_bump:`,
                `:fist_right::fist_left: ${msg.author} and ${target} fist bump with enthusiasm! :fist_bump:`,
                `:fist::fist_right: ${msg.author} and ${target} connect fists with a resounding brofist! :boom:`
            ],
            fr: [
                `:fist: ${msg.author} donne un coup de poing amical à ${target} ! :muscle:`,
                `${msg.author} et ${target} échangent un solide coup de poing amical ! :boom:`,
                `:fist::fist: ${msg.author} et ${target} se tapent les poings en signe d'unité ! :raised_hands:`,
                `${msg.author} et ${target} partagent un moment de coup de poing amical ! :fist_bump:`,
                `:fist_right::fist_left: ${msg.author} et ${target} se donnent un coup de poing avec enthousiasme ! :fist_bump:`,
                `:fist::fist_right: ${msg.author} et ${target} connectent leurs poings avec un retentissant coup de poing amical ! :boom:`
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
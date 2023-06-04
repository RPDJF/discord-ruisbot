// APP VARs
// PACKAGE IMPORTS
//      MODULE
const discord = require("discord.js");
const { GatewayIntentBits } = require("discord.js");
const commands = require("./commands");
const functions = commands.functions;
const default_values = require("./data/default_values");
//      DATA
//          Firebase
const db = require("./db");
const guildRef = db.collection('guilds');
//          Cache for firebase
const {getCacheGuildData, updateCacheGuildData} = require("./data/cache");
//          Dotenv
require("dotenv").config();
//          JSON FILES
// CONSTANCES
const default_prefix = default_values.prefix;
const default_client_token = default_values.client_token;
// APP INIT
// create client
const client = new discord.Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent] });
const guildId = "778001532124790834";
const clientId = default_values.client_id;
const rest = new discord.REST({ version: "10"}).setToken(default_client_token);
// deploy slash commands
let slashCommands = new Array();
for(const command in commands){
    try{
        // push converted commands to slashCommands
        slashCommands.push(commands[command].data.toJSON());
    }
    catch(e){
        // don't console.log bc it just says that some commands aren't slash compatible wich is normal
    }
}
// fetch slashCommands
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			discord.Routes.applicationCommands(clientId),
			{ body: slashCommands },
		);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (e) {
		console.error(e);
	}
})();
// APP Process
client.on("ready", () => {
    // Display the bot's name on bot ready
    console.log("Logged in as " + client.user.tag + " !");
    // init presence
    ruisbotPresence();
});

// slash commands
client.on(discord.Events.InteractionCreate, async interaction =>{
    try{
        // return if not command
        if(!interaction.isChatInputCommand()) return;
        // parse interaction events as messageCreate for commands compatibility
        let msg = interaction;
        msg.author = msg.user;
        let args = [];
        args.push(interaction.commandName); // fill args with interaction options
        if(interaction.options.data !== undefined){
            interaction.options.data.forEach(item => {
                args.push(item.value);
            })
        }
        // cache
        let prefix = default_values.prefix;
        let lang = default_values.lang;
        // cache
        const cache = await getCacheGuildData(msg);
        if(cache !== undefined){
            if(cache.prefix !== undefined) prefix = cache.prefix;
            if(cache.lang !== undefined) lang = cache.lang;
        }
        // change prefix to convert to slashcommands
        switch (interaction.commandName) {
            case "help":
                commands.help.start(msg, args, lang);
                break;
            case "ping":
                commands.ping.start(msg);
                break;
            case "meme":
                commands.meme.start(msg);
                break;
            case "mine":
                commands.mine.start(msg, args, lang, prefix);
                break;
            case "lang":
                updateCacheGuildData(msg, await commands.lang.start(msg, args, lang));
                break;
            case "dick":
                commands.dick.start(msg, lang);
                break;
            case "prefix":
                updateCacheGuildData(msg, await commands.prefix.start(msg, args, lang, prefix));
                break;
            case "version":
                commands.version.start(msg);
                break;
            case "invite":
                commands.invite.start(msg);
                break;
            case "chat":
                commands.chat.start(msg, client, lang, true);
                break;
            case "draw":
                commands.draw.start(msg,args,lang);
                break;
            case "secret":
                commands.secret.start(msg, args);
                break;
            default:
                if (await commands.weebpack.start(msg, args, lang)) return;
                commands.unknow.start(msg, lang, prefix);
                break;
        }
    } catch (err) {
        console.log(err);
    }
});
client.on(discord.Events.MessageCreate, async msg => {
    try {
        // cache
        let prefix = default_values.prefix;
        let lang = default_values.lang;
        // cache
        const cache = await getCacheGuildData(msg);
        if(cache !== undefined){
            if(cache.prefix !== undefined) prefix = cache.prefix;
            if(cache.lang !== undefined) lang = cache.lang;
        }
        // ignores bot message
        if (msg.author.bot) return;
        // OpenAI response when mentionned
        if(msg.mentions.users.has(client.user.id)){
            commands.chat.start(msg, client, lang, false) // reused on commands
            return;
        }
        // BACKUP PREFIX
        //////////////////////////////////////////
        //          BOT COMMAND                 //
        // syntax   : !prefix                   //
        // param    : new prefix                //
        // reply    : change prefix             //
        //////////////////////////////////////////
        // only runs if prefix is not default prefix
        if(prefix != default_prefix && msg.content.substring(0, default_prefix.length) == default_prefix) {
            let args = msg.content.substring(default_prefix.length).trim().split(/\s+/);
            if(args[0] == "prefix") updateCacheGuildData(msg, await commands.prefix.start(msg, args, lang, prefix));
        }
        // check prefix, stop process if prefix's not right
        // needs fix for limiting the usage of firestore
        let content;
        // content without prefix
        if(msg.content.substring(0, prefix.length) == prefix) content = msg.content.substring(prefix.length);
        else return;
        // commands
        let args = content.trim().split(/\s+/);
        let stringArgs = content.substring(args[0].length+1);
        switch (args[0]) {
            case "help":
                commands.help.start(msg, args, lang);
                break;
            case "ping":
                commands.ping.start(msg);
                break;
            case "meme":
                commands.meme.start(msg);
                break;
            case "mine":
                commands.mine.start(msg, args, lang, prefix);
                break;
            case "lang":
                updateCacheGuildData(msg, await commands.lang.start(msg, args, lang));
                break;
            case "dick":
                commands.dick.start(msg, lang);
                break;
            case "prefix":
                updateCacheGuildData(msg, await commands.prefix.start(msg, args, lang, prefix));
                break;
            case "version":
                commands.version.start(msg);
                break;
            case "invite":
                commands.invite.start(msg);
                break;
            case "chat":
                commands.chat.start(msg, client, lang, true);
                break;
            case "draw":
                const aTemp = [];
                aTemp[0] = "draw";
                aTemp[1] = stringArgs;
                commands.draw.start(msg, aTemp, lang);
                break;
            case "secret":
                commands.secret.start(msg, args);
                break;
            default:
                if (await commands.weebpack.start(msg, args, lang)) return;
                commands.unknow.start(msg, lang, prefix);
                break;
        }
    } catch (e) {
        console.log(e);
    }
});
// CUSTOM FUNCTIONS
// SET BOT'S PRESENCE
function ruisbotPresence() {
    // Récupération des informations sur l'utilisateur, les channels et les serveurs
    const userCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    const channelCount = client.channels.cache.size;
    const guildCount = client.guilds.cache.size;
    // On crée un tableau avec les trois types d'activité
    const activities = [
        `${userCount} Users`,
        `${channelCount} Channels`,
        `${guildCount} Servers`,
    ];
    // On définit l'index de l'activité à afficher
    let index = 0;
    // On définit une fonction qui change l'activité toutes les 5 secondes
    setInterval(() => {
        // On met à jour l'activité
        client.user.setActivity(`${default_prefix}help | ${activities[index]}`);
        // On passe à l'activité suivante
        index = (index + 1) % activities.length;
    }, 5000);
}
// Contains the bot TOKEN fetched by dotenv
client.login(default_client_token);

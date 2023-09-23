// import
const db = require("../../db");
const discord = require("discord.js");
const {items, minimumRounds, gameLogo, gameName, gameThumbnail} = require("../../..//config/mine.conf");
const { BOT_AUTHOR, PRIMARY_COLOR, BOT_ICON } = require("../../../config/bot-conf");
const {name, version} = require("../../../package.json");
const embedUtility = require("../features/embedUtility")

/**
 * 
 * @param {discord.Message} msg 
 * @param {Array<string>} args 
 * @param {string} lang 
 * @param {string} prefix 
 * @returns 
 */
async function execute(msg, args){
    // fetch data
    const guild = await db.getData("guilds", msg.guildId);
    const userData = await db.getData(`guilds/${msg.guildId}/users`, msg.author.id);
    if(args.length < 2)
        play(msg, guild, userData);
    else
        switch(args[1]){
            case "stat":
            case "stats":
                if(userData == undefined || userData.mine == undefined){
                    msg.reply({embeds: embedUtility.errorMessage("Tu n'as aucune donnée !", "Joue d'abord au jeu avant de vouloir voir tes statistiques ;)")});
                    return (0);
                }
                msg.reply({
                    embeds: mineStatsEmbedBuilder(guild, userData.mine.minedItems),
                    files: [gameLogo]
                });
                break;
            default:
                break;
    }
}

function play(msg, guild, userData){
    // mining
    const inventory = mine();
    // check if user is new
    if(!(userData == undefined || userData.mine == undefined)){
        const lastUsage = userData.mine.lastusage;
        // check if CoolDown
        const differenceInMinutes = (new Date() - lastUsage) / (1000 * 60);
        if(differenceInMinutes < 30){
            msg.reply({
                embeds: mineCoolDownEmbedBuilder(guild, 30 - Math.floor(differenceInMinutes)),
                files: [gameLogo]
            });
            return(0);
        }
        const cloudInventory = userData.mine.minedItems;
        // display
        msg.reply({
            embeds: mineSuccessEmbedBuilder(guild, inventory, getScore(cloudInventory)), files: [gameLogo]
        });
        // update database
        for(item in inventory){
            inventory[item] += cloudInventory[item];
        }
    }else{
        // display
        msg.reply({
            embeds: mineSuccessEmbedBuilder(guild, inventory, 0), files: [gameLogo]
        });
    }
    db.writeData(`guilds/${msg.guildId}/users`, msg.author.id, {
        mine:{
            minedItems: inventory,
            lastusage: new Date().getTime()
        }}
    );
}

function mine() {
    const inventory = [];
    const loop = Math.floor(Math.random() * 4 + minimumRounds);
    for (let i = 0; i < loop; i++)
        for (let item = 0; item < items.length; item++){
            if(inventory[item] == undefined)
                inventory.push(0);
            if (Math.floor(Math.random() * 1000 + 1) < items[item].occurence){
                inventory[item]++;
            }
        }
    return inventory;
}

function getScore(inventory) {
    let score = 0;
    for (let item = 0; item < items.length; item++){
        if(inventory[item] == undefined)
            inventory.push(0);
        score += inventory[item] * items[item].value;
    }
    return score;
}

function mineSuccessEmbedBuilder(guild, inventory, highscore){
    const score = getScore(inventory);
    let description;
    const fields = [];
    switch(guild.lang){
        case "fr":
            description = "Vous avez bien miné aujourd'hui ! Vous partez donc vous reposer.";
            break;
        default:
            description = "You did a great a job ! You went sleeping a little bit.\nㅤ"
            break;
    }
    for(item in items){
        fields.push({
            name: `${items[item].emoji} ${items[item].name[guild.lang]}`,
            value: `\`\`\`x${inventory[item]}\`\`\``,
            inline: true
        });
    }
            description = "You did a great a job ! You went sleeping a little bit.\nㅤ"
    fields.push({name:"ㅤ", value:"ㅤ", inline: false});
    switch(guild.lang){
        case "fr":
            fields.push({
                name: "Argent récolté",
                value: `\`\`\`$${score}\`\`\``,
                inline: true
            });
            fields.push({
                name: "Argent au total",
                value: `\`\`\`$${highscore + score}\`\`\``,
                inline: true
            });
            break;
        default:
            fields.push({
                name: "Added value",
                value: `\`\`\`$${score}\`\`\``,
                inline: true
            });
            fields.push({
                name: "Stock resale value",
                value: `\`\`\`$${highscore + score}\`\`\``,
                inline: true
            });
            break;
    }
    
    const embed = new discord.EmbedBuilder()
        .setAuthor(BOT_AUTHOR)
        .setTitle(gameName)
        .setDescription(description)
        .setFields(fields)
        .setColor(PRIMARY_COLOR)
        .setThumbnail(gameThumbnail)
        .setTimestamp()
        .setFooter({text: `${name} ${version}`, iconURL: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"});
    return ([embed]);
}

function mineCoolDownEmbedBuilder(guild, timeLeft){
    let description;
    switch(guild.lang){
        case "fr":
            description = `Non ! Tu as encore besoin de repos, attends **${timeLeft} minutes** avant de retourner au boulot !`;
            break;
        default:
            description = `Nop ! You need to rest a little bit yet, **${timeLeft} minutes** left before being able to mine again !`;
            break;
    }
    const embed = new discord.EmbedBuilder()
        .setAuthor(BOT_AUTHOR)
        .setTitle(gameName)
        .setDescription(description)
        .setColor(16080449)
        .setThumbnail(gameThumbnail)
        .setTimestamp()
        .setFooter({text: `${name} ${version}`, iconURL: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"});
    return ([embed]);
}

function mineStatsEmbedBuilder(guild, cloudInventory){
    const score = getScore(cloudInventory);
    const fields = [];
    switch(guild.lang){
        case "fr":
            fields.push({
                name: "Votre inventaire",
                value: ":arrow_down::arrow_down::arrow_down:",
                inline: false
            });
            break;
        default:
            fields.push({
                name: "Your inventory",
                value: ":arrow_down::arrow_down::arrow_down:",
                inline: false
            });
            break;
    }
    for(item in items){
        if(cloudInventory[item] == undefined){
            fields.push({
                name: `${items[item].emoji} ${items[item].name[guild.lang]}`,
                value: `\`\`\`x0\`\`\``,
                inline: true
            }); 
        } else{
            fields.push({
                name: `${items[item].emoji} ${items[item].name[guild.lang]}`,
                value: `\`\`\`x${cloudInventory[item]}\`\`\``,
                inline: true
            });
        }
    }
    switch(guild.lang){
        case "fr":
            fields.push({
                name: "Blocs minés",
                value: `\`\`\`x${cloudInventory[0]}\`\`\``,
                inline: false
            });
            fields.push({
                name: "Argent au total",
                value: `\`\`\`$${score}\`\`\``,
                inline: false
            });
            break;
        default:
            fields.push({
                name: "Mined blocks",
                value: `\`\`\`x${cloudInventory[0]}\`\`\``,
                inline: false
            });
            fields.push({
                name: "Your balance",
                value: `\`\`\`$${score}\`\`\``,
                inline: false
            });
            break;
    }

    const embed = new discord.EmbedBuilder()
        .setAuthor(BOT_AUTHOR)
        .setTitle(gameName)
        .setFields(fields)
        .setColor(PRIMARY_COLOR)
        .setThumbnail(gameThumbnail)
        .setTimestamp()
        .setFooter({text: `${name} ${version}`, iconURL: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"});
    return ([embed]);
}

module.exports = {
    name: "mine",
    description: {
        en: "a mine mini-game",
        fr: "un mini-jeu de minage"
    },
    usage: "mine",
    category: "fun",
    execute
};
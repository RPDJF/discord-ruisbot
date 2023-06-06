// import
const jsnLangPack = require("../jsnLangPack.json");
const commands = require("./index");
const discord = require("discord.js");
const functions = require("./functions");
const {getCacheUserData} = require("./../data/cache");
/**
 * 
 * @param {discord.Message} msg 
 * @param {Array<string>} args 
 * @param {string} lang 
 * @param {string} prefix 
 * @returns 
 */
async function start(msg, args, lang, prefix){
    // var inits
    let replyOutput = `${msg.author}\n\n`; // reply output (mention user at first)
    let results = ""; // results output
    // cache init
    const userData = await getCacheUserData(msg);
    let userMineData; // userMineData init, default values if not exists
    if(userData === undefined || userData.mine === undefined){
        userMineData = {
            lastusage: 0,
            minedItems: [0, 0, 0, 0, 0],
            score: 0,
        }
    } else {
        userMineData = userData.mine;
    }
    // settings
    const itemsRef = commands.settings.items; // objects init
    const minRounds = 4; // minimum mine 
    const timeOffset = 1;
    // session data
    let score = 0;
    let minedItems = [0, 0, 0, 0, 0];
    // set default data if nevers has mined
    // databse data
    const lastScore = userMineData.score; 
    const lastMinedItems = userMineData.minedItems;
    // sum data
    let sumScore;
    let sumMinedItems;
    // check if has args
    if(args.length < 2){
        // dont have args, then just mine
        const rounds = Math.floor(Math.random() * 2 + minRounds);
        // check if player is time limit
        if(Date.now() < userMineData.lastusage + 15 * 60 * 1000){
            // has to wait, replies how much
            replyOutput += (jsnLangPack[lang].mine.timeout).replace("{timeout}", Math.floor(((userMineData.lastusage + 15 * 60 * 1000) - Date.now()) / 1000 / 60) + 1);
            await functions.embedReply(msg, jsnLangPack[lang].mine.title, "#F55E41", replyOutput, "https://i.stack.imgur.com/Fzh0w.png", undefined, undefined, undefined, undefined, undefined, undefined, "https://cdn-icons-png.flaticon.com/512/1213/1213235.png?w=360", "https://i.ibb.co/L84rGdT/ruismine-logo.png");
            return; // stops here
        } else{
            // just mine
            // foreach items in itemsRef
            for(const item in itemsRef){
                const rarity = 100 - itemsRef[item].occurence; // defines rarity
                // mine item
                for(let i = 0; i < rounds; i++){
                    // if random > rarity, then claim item
                    if(Math.floor(Math.random() * 100 + 1) > rarity) minedItems[item]++;
                }
            }
            // generate results string by calculating score
            for(let i = 0; i < minedItems.length; i++){
                score += itemsRef[i].value * minedItems[i];
                // result reply string
                results += `> \`\t${minedItems[i]}\t\`  -  ${itemsRef[i].emoji}  **${itemsRef[i].name[lang]}**`;
                // new line if not finished
                if (i + 1 != minedItems.length) results += "\n"
            }
            // calculate all mined items (with database)
            sumMinedItems = minedItems.map(function (num, idx) {
                return num + lastMinedItems[idx];
            });
            // calculate all score (with database)
            sumScore = lastScore + score;
            // send data
            const data = {
                mine: {
                    lastusage: Date.now(),
                    score: (sumScore),
                    minedItems: sumMinedItems
                }
            }
            // reply
            functions.addUserData(msg, data);
            replyOutput += `${jsnLangPack[lang].mine.stat.replace("{mined}", rounds)}
            ${results}
            ${jsnLangPack[lang].mine.score} ${score}
            ${jsnLangPack[lang].mine.tscore} ${sumScore}`;
            functions.embedReply(msg, jsnLangPack[lang].mine.title, undefined, replyOutput, "https://i.stack.imgur.com/Fzh0w.png", undefined, undefined, undefined, undefined, undefined, undefined, "https://cdn-icons-png.flaticon.com/512/1213/1213235.png?w=360", "https://i.ibb.co/L84rGdT/ruismine-logo.png");
            return; // stops here
        }
    } else{
        // command options
        switch(args[1]){
            case "stats":
            case "stat":
                // option that display mine's user stats
                // checks has already played
                if(userMineData === undefined){
                    // didn't have
                    replyOutput += (jsnLangPack[lang].mine.notPlayedYet).replace("{prefix}", prefix);
                } else{
                    // has already played
                    for(let i = 0; i < userMineData.minedItems.length; i++){
                        replyOutput += `> \`\`\t${userMineData.minedItems[i]}\t\`\` - ${itemsRef[i].emoji} **${itemsRef[i].name[lang]}**\n`;
                    }
                    // generate last and next command usage
                    const lastUsage = new Date(new Date(userMineData.lastusage).getTime() + timeOffset * 3600 * 1000);
                    const nextUsage = new Date(lastUsage.getTime() + 15 * 60 * 1000);
                    replyOutput += `\n${jsnLangPack[lang].mine.tscore} ${userMineData.score}`;
                    replyOutput += `\n\n${jsnLangPack[lang].mine.lastused} ${(lastUsage.getUTCHours() < 10 ? '0' : '')}${lastUsage.getUTCHours()}:${(lastUsage.getUTCMinutes() < 10 ? '0' : '')}${lastUsage.getUTCMinutes()}`;
                    replyOutput +=  `\n${jsnLangPack[lang].mine.nextuse} ${(nextUsage.getUTCHours() < 10 ? '0' : '')}${new Date(lastUsage.getTime() + 15 * 60 * 1000).getUTCHours()}:${(nextUsage.getUTCMinutes() < 10 ? '0' : '')}${nextUsage.getUTCMinutes()}`;
                }
                functions.embedReply(msg, jsnLangPack[lang].mine.title_stats, undefined, replyOutput, "https://i.stack.imgur.com/Fzh0w.png", undefined, undefined, undefined, undefined, undefined, undefined, "https://cdn-icons-png.flaticon.com/512/1213/1213235.png?w=360", "https://i.ibb.co/L84rGdT/ruismine-logo.png");
                break;
        }
    }
}

module.exports = {
    data: new discord.SlashCommandBuilder()
    .setName("mine")
    .setDescription("Mine minigame")
    .addStringOption(option =>
        option.setName("options")
            .setDescription(`ex: stats`)
            .addChoices(
                {name: "stats", value: "stats"}
            )),
    start
};
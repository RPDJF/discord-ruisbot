// imports
const discord = require("discord.js");
const db = require("../db");
const default_values = require("./default_values")
// cache var
const cachedGuildData = [];
const cachedUserData = [];
// userdata cache, prevent from fs api to getting spammed
// get cache
/**
 * 
 * @param {discord.Message} msg 
 * @returns
 */
async function getCacheUserData(msg){
    let output;
    try{
        // check if cache already exists
        const id = `${msg.guildId}_${msg.author.id}`;
        if(!cachedUserData.some(cache => cache.id === id)){
        // if there is no cache
            const guildRef = db.collection('guilds'); // guildRef init
            const guildDoc = guildRef.doc(msg.guild.id); // guildDoc init
            const userRef = guildDoc.collection("users"); // userRef init
            const userDoc = userRef.doc(msg.author.id); // userDoc init
            const userData = (await userDoc.get()).data(); // get user data
            if(userData !== undefined){
                // fill output with firestore db values
                output = userData;
                // check if entry already exists (bc of async)
                if (!cachedUserData.some(g => g.id === id)){
                    output = {id: id, ...userData};
                    // push cache
                    cachedUserData.push(output);
                    console.log(`cached user ${id}`);
                }
                // drops entries if cache limit reached
                if(cachedUserData.length > 20) cachedUserData.shift();
            }
        } else{
            const cache = cachedUserData.find(_cache => _cache.id === id);
            output = cache
        }
    }catch(e){
        console.log(e);
    }
    return output;
}
// set userdata cache
/**
 * 
 * @param {discord.Message} msg 
 */
async function updateCacheUserData(msg, userData){
    const id = `${msg.guildId}_${msg.author.id}`;
    const cache = cachedUserData.find(_cache => _cache.id === id);
    // check if cache exists and if guildata isn't undefined
    if (cache && userData !== undefined) {
        // update each key
        Object.keys(userData).forEach(key => {
            if(userData[key]) cache[key] = userData[key];
        });
        console.log(`updated user ${id}`);
    }
    // get cache
    getCacheUserData(msg);

}
// guilddata, prevent from fs api to getting spammed
// get cache
/**
 * 
 * @param {discord.Message} msg 
 * @returns
 */
async function getCacheGuildData(msg){
    let output;
    try{
        // check if cache already exists
        if(!cachedGuildData.some(cache => cache.id === msg.guildId)){
        // if there is no cache
            const guildRef = db.collection("guilds");
            const guildDoc = guildRef.doc(msg.guildId);
            // get guild data
            const guildData = (await guildDoc.get()).data();
            if(guildData !== undefined){
                // fill output with firestore db values
                output = guildData;
                // check if entry already exists (bc of async)
                if (!cachedGuildData.some(g => g.id === msg.guildId)){
                    output = {id: msg.guildId, ...guildData};
                    // push cache
                    cachedGuildData.push(output);
                    console.log(`cached guild ${msg.guildId}`);
                }
                // drops entries if cache limit reached
                if(cachedGuildData.length > 20) cachedGuildData.shift();
            }
        } else{
        // if cache exists
            output = cachedGuildData.find(_cache => _cache.id === msg.guildId);
        }
    }catch(e){
        console.log(e);
    }
    return output;
}
// set guildata cache
/**
 * 
 * @param {discord.Message} msg 
 */
async function updateCacheGuildData(msg, guildData){
    const cache = cachedGuildData.find(_cache => _cache.id === msg.guildId);
    // check if cache exists and if guildata isn't undefined
    if (cache && guildData !== undefined) {
        // update each key
        Object.keys(guildData).forEach(key => {
            if(guildData[key]) cache[key] = guildData[key];
        });
        console.log(`updated guild ${msg.guildId}`);
    }
    // get cache
    getCacheGuildData(msg);
}
// exports cache
module.exports = {getCacheGuildData, updateCacheGuildData, getCacheUserData, updateCacheUserData}
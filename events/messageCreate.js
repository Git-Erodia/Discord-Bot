const Warn = require("../databases/Warn");
const BannedWords = require("../databases/BannedWords");
const Raid = require("../databases/Raid");
const {LimitedCollection} = require("discord.js");
const LinkRegex = require("../utils/LinkRegex");

module.exports = {
    name: 'messageCreate',
    async execute(message)
    {
        if(Raid.getConfig().get("antiLink", false) && !message.author.bot) {
            let findLink = false;

            let links = [
                'discord.gg',
                'dsc.bio',
                'www',
                'https',
                'http',
                '.ga',
                '.fr',
                '.com',
                '.tk',
                '.ml',
                '://'
            ];
            links.forEach((link) => {
                if(message.content.toLowerCase().includes(link) && !message.member.roles.cache.has("1084506110926540891")) findLink = true;
            });
            if(LinkRegex.inviteRegExp.test(message.content.toLowerCase()) && !message.member.roles.cache.has("1084506110926540891")) findLink = true;

            if(findLink) {
                message.delete().catch((e) => function (){});
                Warn.warnMember(message.member);
            }
        }

        if(Raid.getConfig().get("antiBadWords", false) && !message.author.bot) {
            let WORDS = BannedWords.getAllWords();
            let findWord = false;
            WORDS.forEach((word) => {
                if(message.content.toLowerCase().includes(word)) {
                    findWord = true; console.log(message.content.toLowerCase(), word)
                }

            });

            if(findWord && !message.member.roles.cache.has("1084506110926540891")) {
                message.delete().catch((e) => function (){});
                Warn.warnMember(message.member);
            }
        }

        if(Raid.getConfig().get("antiWebhook", false) && message.author.bot) {
            if (!message.webhookId)return;
            let id = message.webhookId;
            try {
                await (await message.fetchWebhook()).delete("antiWebhook");
            } catch (e) {}
        }
    }
};

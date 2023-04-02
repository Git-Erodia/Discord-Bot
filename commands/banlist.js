const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");
const FactionData = require("../utils/FactionData");
const {Config} = require("../utils/Config");
const Path = require("path");

const embed = new MessageEmbed().setColor("2b2d31");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banlist')
        .setDescription("Permet d'obtenir la liste des personnes banni(e)(s)."),
    async execute(interaction, client) {
        let user = interaction.user;
        const guild = interaction.guild;
        let member = guild.members.cache.get(user.id);

        const minecraftName = interaction.options.getString('pseudonyme');

        if(!member.roles.cache.has("1084506110926540891")) {
            interaction.reply({content: "Désolée, vous devez être un membre du Staff d'Érodia pour effectuer cette commande.", ephemeral: true});
            return;
        }

        let TAG = "```";

        let descriptionDiscord = "";
        await interaction.guild.bans.fetch().then(
            bans => {
                let list = bans.map(user => user.user.username).join('\n');
                if (list.length >= 1950) list = `${list.slice(0, 1948)}`;

                descriptionDiscord += `Discord **(${bans.size})**:\n\`\`\`${list}\`\`\`\n\n`;
            }
        ).catch(e => {});

        let descriptionIG = [];
        let suppNumber = 0;
        let banConfig = require('../../Faction/plugin_data/FactionCore/config/ban.json');

        if(banConfig.length !== 0){
            Object.entries(banConfig).forEach((str) => {
                if (descriptionIG.length <= 1949) {
                    let user = str[0];
                    let info = str[1];
                    let temps = info["temps"];

                    let remainingTime = Date.now() - temps;
                    let day = Math.floor(remainingTime / 86400);
                    let hourSeconds = remainingTime % 86400;
                    let hour = Math.floor(hourSeconds / 3600);
                    let minuteSec = hourSeconds % 3600;
                    let minute = Math.floor(minuteSec / 60);
                    let remainingSec = minuteSec % 60;
                    let second = Math.ceil(remainingTime);

                    descriptionIG.push(`| 🎈 **${user}**: ${TAG}\nPar: ${info["staff"]}\nRaison: ${info["raison"]}\nTemps: ${day} jour(s), ${hour} heure(s), ${minute} minute(s)${TAG}\n`);
                } else suppNumber++;
            });
        }

        let descriptionBAN = "<a:blanc:1083553795230929047> Bannisement";
        let descriptionIGG = `InGame **(${descriptionIG.length})**:\n\n${descriptionIG.join(",\n")}`;
        if(suppNumber !== 0) descriptionIGG += `\n*${suppNumber} autres personnes*`;
        descriptionIGG += `\n`;

        const embed1 = new MessageEmbed().setColor("2b2d31").setDescription(descriptionBAN);
        const embed2 = new MessageEmbed().setColor("2b2d31").setDescription(descriptionDiscord);
        const embed3 = new MessageEmbed().setColor("2b2d31").setDescription(descriptionIGG);

        interaction.reply({embeds: [
                embed1,
                embed2,
                embed3,
                    ], ephemeral: false});
    },
};
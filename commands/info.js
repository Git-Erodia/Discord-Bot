const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");
const FactionData = require("../utils/FactionData");
const {Config} = require("../utils/Config");
const Path = require("path");
const config = require("../../Faction/plugin_data/FactionCore/config/players.json");
const banConfig = require("../../Faction/plugin_data/FactionCore/config/ban.json");
const embed = new MessageEmbed().setColor("2b2d31");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription("Obtenir les informations d'une personne")
        .addStringOption(option =>
            option.setName('user')
                .setDescription("Entrer le nom de la personne")
                .setRequired(true)),
    async execute(interaction, client)
    {
        let user = interaction.user;
        const guild = interaction.guild;
        let member = guild.members.cache.get(user.id);

        const player = interaction.options.getString("user");

        let config = require('../../Faction/plugin_data/FactionCore/config/players.json');

        const pConfig = config[player];

        let banConfig = require('../../Faction/plugin_data/FactionCore/config/ban.json');
        const pbanConfig = banConfig[player];

        if(config[player] === null){
            embed.setDescription("<a:blanc:1083553795230929047> Désolée, le joueur est introuvable.");
            interaction.reply({embeds: [embed], ephemeral: true});
            return;
        }

        let description = `<a:blanc:1083553795230929047> Informations concernant **${player}**:\n\n`;

        let rank = pConfig["rank"];
        let money = pConfig["money"];
        let killstreak = pConfig["killstreak"];
        let kills = pConfig["kills"];
        let morts = pConfig["morts"];

        let TAG = "```";
        description += `Grade: ${TAG}${rank}${TAG}\n`;
        description += `Argent: ${TAG}${money}${TAG}\n`;
        description += `KillStreak: ${TAG}${killstreak}${TAG}\n`;
        description += `Kill(s): ${TAG}${kills}${TAG}\n`;
        description += `Mort(s): ${TAG}${morts}${TAG}\n`;

        let ban = "Non";
        if(banConfig[player] !== undefined) ban = "Oui";
        description += `\nBanni(e): ${TAG}` + ban + `${TAG}`;

        embed.setDescription(description)
        interaction.reply({embeds: [embed], ephemeral: false});
    },
};
const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");
const ServeurStatus = require("../tasks/ServeurStatus");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Permet d'obtenir la latence du bot."),
    async execute(interaction, client) {
        let user = interaction.user;
        const guild = interaction.guild;
        let member = guild.members.cache.get(user.id);

        const waiting = new MessageEmbed()
            .setDescription("Calcul...")
            .setColor("2b2d31")
        const sent = await interaction.reply({ embeds: [waiting], fetchReply: true, ephemeral: true });

        let message = "";
        message += "<a:blanc:1083553795230929047> Voici les résultats des pings effectué.\n\n";
        message += `Websocket: ${client.ws.ping}ms\n`;
        message += `API Discord: ${sent.createdTimestamp - interaction.createdTimestamp}ms\n`;

        let query = ServeurStatus.getLastQuery();
        if(query !== undefined) {
            let latency = query.getLatency().split(":");
            message += `\nAPI libquery: ${latency[0]}ms\n`;
            message += `API bedrock-protocol: ${latency[1]}ms`;
        }

        let embed = new MessageEmbed()
            .setDescription(message)
            .setColor("2b2d31")

        interaction.editReply({embeds: [embed]});
    },
};
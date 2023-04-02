const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");
const ServeurStatus = require("../tasks/ServeurStatus");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('connection')
        .setDescription("Permet d'obtenir des informations concernant le serveur."),
    async execute(interaction, client) {
        let user = interaction.user;
        const guild = interaction.guild;

        let member = guild.members.cache.get(user.id);

        let link = `https://connection.erodia.fr/`;
        let embed = new MessageEmbed()
            .setDescription(`<a:blanc:1083553795230929047> Comment se connecter ?\n\nIl suffit d'ajouter un serveur, puis y entrer comme Addresse IP **play.erodia.fr** et comme port **19132**\n\n[Se connecter](${link})`)
            .setColor("2b2d31")

        interaction.reply({embeds: [embed], ephemeral: true});
    },
};
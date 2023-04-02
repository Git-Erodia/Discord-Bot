const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription("Permet d'envoyer un message sous l'identité du bot.")
        .addStringOption(option =>
            option.setName('message')
                .setDescription("Entrer le message souhaiter")
                .setRequired(true)),
    async execute(interaction, client) {
        let user = interaction.user;
        const guild = interaction.guild;
        let member = guild.members.cache.get(user.id);

        const message = interaction.options.getString('message');

        if(!member.roles.cache.has("1084506110926540891")) {
            interaction.reply({content: "Désolée, vous devez être un membre du Staff d'Érodia pour effectuer cette commande.", ephemeral: true});
            return;
        }

        let embed = new MessageEmbed()
            .setDescription(message)
            .setColor("2b2d31")

        interaction.channel.send({embeds: [embed]});
        interaction.reply({content: "Le message à été envoyer avec succès!", ephemeral: true});
    },
};
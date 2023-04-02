const {SlashCommandBuilder, SlashCommandSubcommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription("Gérer les tickets")
        .addSubcommand(sub => sub
            .setName("add")
            .setDescription("Ajouter une personne a un ticket.")
            .addUserOption(option => option.setName("user").setDescription("Entrer le nom de la personne").setRequired(true))
        ),
    async execute(interaction, client) {
        if(interaction.options.getSubcommand() === "add") await require("./sub/ticket/add").execute(client, interaction);
    },
};
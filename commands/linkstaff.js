const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");
const StaffName = require("../databases/StaffName");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('linkstaff')
        .setDescription("Permet d'identifier sont pseudonyme Minecraft à Discord.")
        .addStringOption(option =>
            option.setName('pseudonyme')
            .setDescription("Entrer votre pseudo minecraft")
            .setRequired(true)),
    async execute(interaction, client) {
        let user = interaction.user;
        const guild = interaction.guild;
        let member = guild.members.cache.get(user.id);

        const minecraftName = interaction.options.getString('pseudonyme');

        if(!member.roles.cache.has("1084506110926540891")) {
            interaction.reply({content: "Désolée, vous devez être un membre du Staff d'Érodia pour effectuer cette commande.", ephemeral: true});
            return;
        }

        if(StaffName.getConfig().get(member.id) !== undefined){
            interaction.reply({content: `Désolée, vous êtes déjà enregistrer dans la base de donné sous le pseudonyme **${StaffName.getConfig().get(member.id)}**.`, ephemeral: true});
            return;
        }

        StaffName.getConfig().set(member.id, minecraftName);
        StaffName.getConfig().save();

        let embed = new MessageEmbed()
            .setDescription(`<a:blanc:1083553795230929047> Vous avez été enregistrer dans notre base de données avec succès sous le pseudonyme ${minecraftName}`)
            .setColor("2b2d31")

        interaction.reply({embeds: [embed], ephemeral: true});
    },
};
const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");
const embed = new MessageEmbed().setColor("2b2d31");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sanction')
        .setDescription("Permet de sanctionné temporairement une personne du serveur")
        .addUserOption(option =>
            option.setName('user')
                .setDescription("Entrer le nom de la personne")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('temps')
                .setDescription("Entrer le temps de la sanction")
                .setRequired(true)),
    async execute(interaction, client)
    {
        let channel = client.channels.cache.get("1084575140450414694");

        let user = interaction.user;
        const guild = interaction.guild;
        let member = guild.members.cache.get(user.id);

        const sanctionnedUser = interaction.options.getUser("user");
        const sanctionned = client.guilds.cache.get(interaction.guildId).members.cache.get(sanctionnedUser.id);
        const temps = interaction.options.getString('temps');

        if(!member.roles.cache.has("1084506110926540891")) {
            embed.setDescription("<a:blanc:1083553795230929047> Désolée, vous devez être un membre du Staff d'Érodia pour effectuer cette commande.")
            interaction.reply({embeds: [embed], ephemeral: true});
            return;
        }

        if (sanctionned.roles.highest.rawPosition > member.roles.highest.rawPosition) {
            embed.setDescription("<a:blanc:1083553795230929047> La personne que vous souhaitez sanctionné possède un grade supérieure au votre!")
            interaction.reply({embeds: [embed], ephemeral: true});
            return;
        }

        let time = 1000;
        if(temps.includes("jours")) time = time * 60 * 60 * 24 * parseInt(temps);
        if(temps.includes("heures")) time = time * 60 * 60 * parseInt(temps);
        if(temps.includes("minutes")) time = time * 60 * parseInt(temps);

        embed.setDescription(`<a:blanc:1083553795230929047> <@${sanctionnedUser.id}> a été sanctionné par <@${user.id}> pendant ${temps}`);
        sanctionned.timeout(time)

        channel.send({embeds: [embed]});
        interaction.reply({embeds: [embed], ephemeral: true});
    },
};
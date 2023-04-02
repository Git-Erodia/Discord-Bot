const {MessageEmbed} = require("discord.js");

const embed = new MessageEmbed().setColor("2b2d31");

module.exports = {
    execute: async function (interaction, client)
    {
        const row = new client.discord.MessageActionRow()
            .addComponents(
                new client.discord.MessageButton()
                    .setCustomId('confirm-close')
                    .setLabel('Fermer le ticket')
                    .setStyle('DANGER'),
                new client.discord.MessageButton()
                    .setCustomId('no')
                    .setLabel('Annuler la fermeture')
                    .setStyle('SECONDARY'),
            );

        embed.setDescription("<a:blanc:1083553795230929047> Êtes vous sûr de vouloir fermer le ticket ?");
        await interaction.reply({embeds: [embed], components: [row]});
    }
}

const {MessageEmbed} = require("discord.js");
const embed = new MessageEmbed().setColor("2b2d31");

module.exports = {
    async execute(client, interaction)
    {
        const chan = client.channels.cache.get(interaction.channelId);
        const user = interaction.options.getUser('user');

        if (!chan.topic.includes('ticket')) {
            embed.setDescription("<a:blanc:1083553795230929047> Désolée, vous devez être dans un ticket pour effectuer cette commande.");
            interaction.reply({embeds: [embed], ephemeral: true});
            return;
        }

        chan.edit({
            permissionOverwrites: [{
                id: user.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
                {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: "1084506110926540891",
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
            ],
        }).then(async () => {
            embed.setDescription(`<a:blanc:1083553795230929047> <@${user.id}> a été ajouté au ticket avec succès !`)
            interaction.reply({embeds: [embed]});
        });
    }
}
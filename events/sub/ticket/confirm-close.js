const {MessageEmbed} = require("discord.js");

const embed = new MessageEmbed().setColor("2b2d31");

module.exports = {
    execute: async function (interaction, client)
    {
        const guild = client.guilds.cache.get(interaction.guildId);
        const chan = guild.channels.cache.get(interaction.channelId);

        let topic = chan.topic.split(" ");
        topic = topic[2];

        chan.edit({
            name: `closed-${chan.name}`,
            permissionOverwrites: [
                {
                    id: client.users.cache.get(topic),
                    deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                    id: "1084506110926540891",
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                },
            ],
        })
            .then(async () => {
                embed.setDescription(`<a:blanc:1083553795230929047> Ticket fermé par <@!${interaction.user.id}>`)
                const row = new client.discord.MessageActionRow()
                    .addComponents(
                        new client.discord.MessageButton()
                            .setCustomId('delete-ticket')
                            .setLabel('Supprimer le ticket')
                            .setEmoji('🗑️')
                            .setStyle('DANGER'),
                    );

                chan.send({
                    embeds: [embed],
                    components: [row]
                });
            });

    }
}

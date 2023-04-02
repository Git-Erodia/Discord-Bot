const {MessageEmbed} = require("discord.js");

const embed = new MessageEmbed().setColor("2b2d31");

module.exports = {
    execute: async function (interaction, client) {
        if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic === interaction.user.id)) {
            embed.setDescription(`<a:blanc:1083553795230929047> Désolée, vous avez déjà un ticket en cours...`);
            return interaction.reply({embeds: [embed], ephemeral: true});
        }

        interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
            parent: "1083105640412610631",
            topic: `ticket de ${interaction.user.id}`,
            permissionOverwrites: [{
                id: interaction.user.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
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
            type: 'text',
        }).then(async c => {
            embed.setDescription(`<a:blanc:1083553795230929047> Votre ticket à été crée avec succès! <#${c.id}>`);
            interaction.reply({
                embeds: [embed],
                ephemeral: true
            });

            embed.setDescription(`<a:blanc:1083553795230929047> Veuillez séléctionnez la catégorie de votre ticket.`);
            const row = new client.discord.MessageActionRow()
                .addComponents(
                    new client.discord.MessageSelectMenu()
                        .setCustomId('category')
                        .setPlaceholder('Séléctionnez la catégorie du ticket')
                        .addOptions([
                            {
                                label: 'Demande',
                                value: 'demande',
                                emoji: '🗳',
                            },
                            {
                                label: 'Questions',
                                value: 'questions',
                                emoji: '🌹',
                            },
                            {
                                label: 'Recrutement',
                                value: 'recrutement',
                                emoji: '📃',
                            },
                            {
                                label: 'Remboursement',
                                value: 'remboursement',
                                emoji: '💲',
                            },
                            {
                                label: 'Problème Connexion',
                                value: 'probleme-connexion',
                                emoji: '🎈',
                            },
                            {
                                label: 'Problèmes Grade',
                                value: 'probleme-grade',
                                emoji: '🎨',
                            },
                            {
                                label: 'Report',
                                value: 'report',
                                emoji: '🧊',
                            },
                            {
                                label: 'Autres',
                                value: 'autres',
                                emoji: '💍',
                            },
                        ]),
                );

            let msg = await c.send({
                content: `<@!${interaction.user.id}>`,
                embeds: [embed],
                components: [row]
            });

            const collector = msg.createMessageComponentCollector({
                componentType: 'SELECT_MENU',
                time: 20000
            });

            collector.on('collect', i => {
                if (i.user.id === interaction.user.id) {
                    if (msg.deletable) {
                        msg.delete().then(async () => {
                            let message = "";
                            message += `<a:blanc:1083553795230929047> Ticket ${i.values[0]}\n\n`;
                            message += `*Voici donc le ticket de <@!${interaction.user.id}>, merci de precisez toute les informations que nous serait utile à la gestion et la complétion de votre ticket.*`;
                            embed.setDescription(message);

                            const row = new client.discord.MessageActionRow()
                                .addComponents(
                                    new client.discord.MessageButton()
                                        .setCustomId('close-ticket')
                                        .setLabel('Fermer le ticket')
                                        .setEmoji('899745362137477181')
                                        .setStyle('DANGER'),
                                );

                            const opened = await c.send({
                                content: `<@&1084506110926540891>`,
                                embeds: [embed],
                                components: [row]
                            });

                            opened.pin().then(() => {
                                opened.channel.bulkDelete(1);
                            });
                        });
                    }
                    c.edit({
                        name: `${i.values[0]}-${interaction.user.username}`,
                        parent: "1083105640412610631"
                    });
                }
            });

            collector.on('end', collected => {
                if (collected.size < 1) {
                    embed.setDescription(`<a:blanc:1083553795230929047> Désolée, aucune catégorie n'as été séléctionnez au bou de 30 secondes, fermeture du ticket...`);
                    c.send({embeds: [embed]}).then(() => {
                        setTimeout(() => {
                            if (c.deletable) {
                                c.delete();
                            }
                        }, 1000 * 30);
                    });
                }
            });
        });
    }
}

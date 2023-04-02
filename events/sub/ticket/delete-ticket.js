const {MessageEmbed} = require("discord.js");
const hastebin = require("hastebin");

const embed = new MessageEmbed().setColor("2b2d31");

module.exports = {
    execute: async function (interaction, client)
    {
        const guild = client.guilds.cache.get(interaction.guildId);
        const chan = guild.channels.cache.get(interaction.channelId);

        embed.setDescription("<a:blanc:1083553795230929047> Suppression du salon en cours...");
        interaction.reply({embeds: [embed]});

        setTimeout(() => {
            chan.delete();
        }, 1000 * 10);

        /*chan.messages.fetch().then(async (messages) => {
            let a = messages.filter(m => m.author.bot !== true).map(m =>
                `${new Date(m.createdTimestamp).toLocaleString('fr-FR')} - ${m.author.username}#${m.author.discriminator}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`
            ).reverse().join('\n');
            if (a.length < 1) a = "Nothing"
            hastebin.createPaste(a, {
                contentType: 'text/plain',
                server: 'https://hastebin.com/'
            }, {})
                .then(function (urlToPaste) {

                    embed.setDescription(`<a:blanc:1083553795230929047> Logs du ticket\n\nTicket crée par <@!${chan.topic}>  et supprimé par <@!${interaction.user.id}>\n[**Cliquez ici pour voir les logs**](${urlToPaste})`);
                    client.channels.cache.get(client.config.logsTicket).send({embeds: [embed]});
                    client.users.cache.get(chan.topic).send({embeds: [embed]}).catch(() => {});

                    embed.setDescription("<a:blanc:1083553795230929047> Suppression du salon en cours...");
                    chan.send({embeds: [embed]});

                    setTimeout(() => {
                        chan.delete();
                    }, 1000 * 10);
                });
        });*/
    }
}

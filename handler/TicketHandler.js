const {MessageEmbed} = require("discord.js");
const embed = new MessageEmbed().setColor("2b2d31");

const toDelete = 10000;

module.exports = {
    async execute(client)
    {
        let guild = client.guilds.cache.get("1082934212837003264");
        let channel = guild.channels.cache.get("1083096019497144511");

        const list = await fetchMore(channel, toDelete);

        let i = 1;

        list.forEach(underList => {
            underList.forEach(msg => {
                i++;
                if (i < toDelete) setTimeout(function () {msg.delete()}, 1000 * i);
            });
        });

        setTimeout(() => {
            sendTicket(client, channel);
        }, i);
    }
}

function sendTicket(client, channel)
{
    embed.setDescription("<a:blanc:1083553795230929047> Ticket\n*Cliquez sur le bouton ci-dessous pour ouvrir un ticket*");
    const row = new client.discord.MessageActionRow()
        .addComponents(
            new client.discord.MessageButton()
                .setCustomId('open-ticket')
                .setLabel('Ouvrir un ticket')
                .setEmoji('✉️')
                .setStyle('PRIMARY'),
        );
    channel.send({
        embeds: [embed],
        components: [row]
    });
}

async function fetchMore(channel, limit) {
    if (!channel) {
        throw new Error(`Expected channel, got ${typeof channel}.`);
    }
    if (limit <= 100) {
        return channel.messages.fetch({
            limit
        });
    }

    let collection = [];
    let lastId = null;
    let options = {};
    let remaining = limit;

    while (remaining > 0) {
        options.limit = remaining > 100 ? 100 : remaining;
        remaining = remaining > 100 ? remaining - 100 : 0;

        if (lastId) {
            options.before = lastId;
        }

        let messages = await channel.messages.fetch(options);

        if (!messages.last()) {
            break;
        }

        collection = collection.concat(messages);
        lastId = messages.last().id;
    }
    collection.remaining = remaining;

    return collection;
}
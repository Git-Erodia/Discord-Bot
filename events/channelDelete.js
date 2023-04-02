const Raid = require("../databases/Raid");

module.exports = {
    name: 'channelDelete',

    async execute(channel, client)
    {
        const audit = (await channel.guild.fetchAuditLogs({type: "CHANNEL_DELETE"})).entries.first();
        if (audit?.executor?.id === client.user.id || audit?.executor?.id === channel?.guild?.ownerId) return;

        if(Raid.getConfig().get("antiDeleteChannel", false)) {
            channel.guild.channels.create(channel.name).then(chan => {
                chan.edit({
                    topic: channel?.topic,
                    position: channel?.position || 0,
                    parent: channel?.parent,
                    nsfw: channel?.nsfw
                })
            });
        }
    }
};

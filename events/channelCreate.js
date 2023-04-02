const Raid = require("../databases/Raid");

module.exports = {
    name: 'channelCreate',

    async execute(channel, client)
    {
        const audit = (await channel.guild.fetchAuditLogs({type: "CHANNEL_CREATE"})).entries.first();
        if (audit?.executor?.id === client.user.id || audit?.executor?.id === channel?.guild?.ownerId) return;

        if(Raid.getConfig().get("antiCreateChannel", false)) {
            let config = Raid.getTempConfig();
            let place = `antiCreateChannel.${new Date().toDateString()}.${audit.executor?.id}.${channel.name}`;

            config.setNested(place, (config.getNested(place) ?? 0) + 1);
            if(config.getNested(place) >= 3) {
                channel.delete().catch(e => function (){});
                await channel.guild.channels.cache.forEach((chan) => {
                    if (chan.name.includes(channel.name))
                        chan.delete().catch((e) => function (){});
                });
            }
        }
    }
};

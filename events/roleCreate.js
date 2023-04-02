const Raid = require("../databases/Raid");

module.exports = {
    name: 'roleCreate',

    async execute(role, client)
    {
        const audit = (await role.guild.fetchAuditLogs({type: "ROLE_CREATE"})).entries.first();
        if (audit?.executor?.id === client.user.id || audit?.executor?.id === role?.guild?.ownerId) return;

        if(Raid.getConfig().get("antiCreateRole", false)) {
            let config = Raid.getTempConfig();
            let place = `antiCreateRole.${new Date().toDateString()}.${audit.executor?.id}.${role.name}`;

            config.setNested(place, (config.getNested(place) ?? 0) + 1);
            if(config.getNested(place) >= 3) {
                role.delete().catch(e => function (){});
                await role.guild.roles.cache.forEach((r) => {
                    if (r.name.includes(role.name)) r.delete().catch((e) => function (){});
                });
            }
        }
    }
};

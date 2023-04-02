const Raid = require("../databases/Raid");

module.exports = {
    name: 'roleDelete',

    async execute(role, client)
    {
        const audit = (await role.guild.fetchAuditLogs({type: "ROLE_DELETE"})).entries.first();
        if (audit?.executor?.id === client.user.id || audit?.executor?.id === role?.guild?.ownerId) return;

        if(Raid.getConfig().get("antiDeleteRole", false)) {
            role.guild.roles.create({
                name: role?.name,
                color: role?.color,
                hoist: role?.hoist,
                permissions: role?.permissions,
                position: role?.position,
                mentionable: role?.mentionable,
                reason: 'Anti-Role'
            });
        }
    }
};

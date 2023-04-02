const Raid = require("../databases/Raid");
const LinkRegex = require("../utils/LinkRegex");

module.exports = {
    name: 'guildUpdate',

    async execute(oldGuild, guild)
    {
        if(Raid.getConfig().get("antiGuildManage", false)) {

            if (guild.defaultMessageNotifications === 'ALL_MESSAGES') {
                await guild.setDefaultMessageNotifications('ONLY_MENTIONS', 'All Messages cannot be enabled').catch(() => null);
            }

            if (guild.name === oldGuild.name) return;

            const executor = (await guild.fetchAuditLogs({type: "GUILD_UPDATE"})).entries.first();
            if(executor?.executor?.id !== guild?.ownerId) await guild.setName(oldGuild.name);
        }
    }
};

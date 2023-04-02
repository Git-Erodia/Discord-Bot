const {MessageEmbed, UserFlags} = require("discord.js");
const Raid = require("../databases/Raid");
const BAD_PERMISSIONS = [
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "MANAGE_MESSAGES",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "BAN_MEMBERS",
    "KICK_MEMBERS",
    "MENTION_EVERYONE",
    "MUTE_MEMBERS"
];

module.exports = {
    name: 'guildMemberAdd',

    async execute(member)
    {
        if(Raid.getConfig().get("antiBot", false) && member.user.bot) {
            const auditLogs = await member.guild.fetchAuditLogs({type: "BOT_ADD"});
            const auditLog = auditLogs.entries.first();
            const executor = auditLog.executor;

            if(executor) {
                const flags = await member.user.fetchFlags(false), botRole = member.roles.botRole;

                let message = "";
                message += "<a:blanc:1083553795230929047> Un Robot à été ajouté sur Érodia.\n\n";
                message += `Le Robot ${member.user.tag} a été ajouté par ${executor.tag}`;

                if(flags.has(UserFlags.FLAGS.VERIFIED_BOT)) {
                    message += "Celui-ci est vérifié <:verifi:1084525069159628810>";
                } else {
                    if(member.bannable) await member.ban();
                    message += `\nN'étant pas vérifié, celui-ci a été banni du serveur.`;
                }

                let embed = new MessageEmbed()
                    .setDescription(message)
                    .setColor("2b2d31")

                const channel = member.guild.channels.cache.get('1083149692159922266');
                channel.send({embeds: [embed]})
                return;
            }
        }

        const channel = member.guild.channels.cache.get('1083099086976204810');
        let embed = new MessageEmbed()
            .setDescription(`<:discordlogo:1083565506608504952> ${member.user.username} vien de nous rejoindre.\n<:flame:1083564863298752652> Ont est désormais ${member.guild.memberCount} membres.`)
            .setThumbnail(member.user.avatarURL)
            .setColor("2b2d31")
        channel.send({embeds: [embed]})
    }
};

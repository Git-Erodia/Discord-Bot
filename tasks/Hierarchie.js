const {MessageEmbed} = require("discord.js");
const StaffName = require("../databases/StaffName");
module.exports = {
    async start(client)
    {
        let guild = client.guilds.cache.get("1082934212837003264");
        let channel = client.channels.cache.get("1083114646115975168");

        setInterval(() => {
            channel.bulkDelete(1, true).catch((err) => {});

            let roles = [
                "1082934566722998272", "1084505698202824724", "1084506515756568686", "1084505468535324733", "1084506308876718110", "1084506223241609316",
            ];

            let list = "";

            let config = StaffName.getConfig();

            roles.forEach((id) => {
                list += `\n<@&${id}>: \n${guild.roles.cache.get(id).members.map(m=> `${m.user.username} (${config.get(m.user.id) ?? "Inconnue"})`).join(',\n')}\n`;
            });

            let embed = new MessageEmbed()
                .setDescription(list)
                .setColor("2b2d31")
            channel.send({embeds: [embed]})

        }, 1000 * 120);
    }
};
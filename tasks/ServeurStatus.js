const Query = require('../utils/Query');
const {MessageEmbed} = require("discord.js");

let LAST_QUERY;

let MESSAGE = null;

module.exports = {
    async start(client)
    {
        let channel = client.channels.cache.get("1083121266111811674");

        setInterval(() => {
            let query = Query.create("play.erodia.fr", 19132, async function () {
                if (MESSAGE === null) channel.bulkDelete(1, true).catch((err) => {
                });

                let status = "<:rouge:1084164847543001129> **Serveur Fermer**";
                if (query.getVersion() !== undefined) status = "<:vert:1084164845525536909> **Serveur ouvert**";

                let online = query.getOnlinesPlayers();
                let onlineMax = query.getMaxOnlinesPlayers();
                let version = query.getVersion();
                let latency = `${query.getLatency()}`.split(":").join("ms, ");
                let software = query.getSoftWare();

                if (online === undefined) online = 0;
                if (onlineMax === undefined) onlineMax = 0;
                if (version === undefined) version = "Dernière version";
                if (latency === undefined) version = "0ms";

                const TAG = "```";

                let embed = new MessageEmbed()
                    .setDescription(`🎈 **Informations du serveur**\n\n| 👑 **Adresse IP**: ${TAG}play.erodia.fr${TAG}\n| 👑 **PORT**:${TAG}19132${TAG}\n\n| ${status}\n\n| 🎇 Connecté(s): ${TAG}${online}/${onlineMax} actuellement joueurs connectées.${TAG}\n| ✨ Version du serveur ${TAG}${version}${TAG}\n\n| 💍 Latence: ${TAG}${latency}${TAG}`)
                    .setColor("2b2d31")

                if (MESSAGE === null) {
                    MESSAGE = await channel.send({embeds: [embed]});
                } else MESSAGE.edit({embeds: [embed]});
                LAST_QUERY = query;
            });
        }, 1000 * 60);
    },

    getLastQuery()
    {
        return LAST_QUERY;
    }
};
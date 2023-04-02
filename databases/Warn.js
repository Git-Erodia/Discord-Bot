const {Config} = require("../utils/Config");
const Path = require("path");
const {MessageEmbed} = require("discord.js");
let config = new Config(Path.join(process.cwd() + "/databases/warn.json"), "json");

module.exports = {
    getConfig()
    {
        return config;
    },

    warnMember(member)
    {
        config.setNested(`${new Date().toDateString()}.${member.id}`, (config.getNested(`${new Date().toDateString()}.${member.id}`) ?? 0) + 1);
        config.save();

        if(config.getNested(`${new Date().toDateString()}.${member.id}`) >= 5) {
            member.timeout(5 * 60 * 1000).catch(e => function () {});

            config.setNested(`${new Date().toDateString()}.${member.id}`, 0);
            config.save();

            let embed = new MessageEmbed()
                .setDescription(`<a:blanc:1083553795230929047> Vous avez été temporairement restreint d'accès à Érodia car vous ne respectez pas les règles du serveur.`)
                .setColor("2b2d31")

            member.send({embeds: [embed]}).catch(e => function (){});
            return;
        }

        let embed = new MessageEmbed()
            .setDescription(`<a:blanc:1083553795230929047> Désolée, vous ne pouvez pas envoyer ce type de message.`)
            .setColor("2b2d31")

        member.send({embeds: [embed]}).catch(e => function (){});
    }
}
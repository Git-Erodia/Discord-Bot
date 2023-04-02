const {MessageEmbed} = require("discord.js");
const Raid = require("../../../databases/Raid");

const embed = new MessageEmbed().setColor("2b2d31");

module.exports = {
    async execute(client, interaction){
        let status = interaction.options.getBoolean("status");

        let stateEmoji = status ? "<:vert:1084164845525536909>" : "<:rouge:1084164847543001129>";

        embed.setDescription(stateEmoji + ` | Le système pour empêcher la modification du serveur est désormais ${status ? "activé" : "désactivé"}`);

        Raid.getConfig().set("antiGuildManage", status);
        Raid.getConfig().save();

        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
}
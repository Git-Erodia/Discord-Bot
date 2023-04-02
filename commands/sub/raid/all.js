const {MessageEmbed} = require("discord.js");
const Raid = require("../../../databases/Raid");

const embed = new MessageEmbed().setColor("2b2d31");

module.exports = {
    async execute(client, interaction){
        let status = interaction.options.getBoolean("status");

        let stateEmoji = status ? "<:vert:1084164845525536909>" : "<:rouge:1084164847543001129>";

        embed.setDescription(stateEmoji + ` | Tous les systèmes d'anti-raid sont désormais ${status ? "activés" : "désactivés"}`);

        Raid.getConfig().set("antiCreateChannel", status);
        Raid.getConfig().set("antiDeleteChannel", status);
        Raid.getConfig().set("antiBot", status);
        Raid.getConfig().set("antiCreateRole", status);
        Raid.getConfig().set("antiDeleteRole", status);
        Raid.getConfig().set("antiBadWords", status);
        Raid.getConfig().set("antiLink", status);
        Raid.getConfig().set("antiGuildManage", status);
        Raid.getConfig().set("antiWebhook", status);
        Raid.getConfig().save();

        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
}
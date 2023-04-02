const {SlashCommandBuilder, SlashCommandSubcommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('raid')
        .setDescription("Gérer les raids")
        .addSubcommand(sub => sub
            .setName("all")
            .setDescription("Gérer tous les types de raids")
            .addBooleanOption(option => option.setName("status").setDescription("Statut").setRequired(true))
        )
        .addSubcommand(sub => sub
            .setName("anticreatechannel")
            .setDescription("antiCreateChannel")
            .addBooleanOption(option => option.setName("status").setDescription("Statut").setRequired(true))
        )
        .addSubcommand(sub => sub
            .setName("antideletechannel")
            .setDescription("antiDeleteChannel")
            .addBooleanOption(option => option.setName("status").setDescription("Statut").setRequired(true))
        )
        .addSubcommand(sub => sub
            .setName("antibot")
            .setDescription("antiBot")
            .addBooleanOption(option => option.setName("status").setDescription("Statut").setRequired(true))
        )
        .addSubcommand(sub => sub
            .setName("anticreaterole")
            .setDescription("antiCreateRole")
            .addBooleanOption(option => option.setName("status").setDescription("Statut").setRequired(true))
        )
        .addSubcommand(sub => sub
            .setName("antideleterole")
            .setDescription("antiDeleteRole")
            .addBooleanOption(option => option.setName("status").setDescription("Statut").setRequired(true))
        )
        .addSubcommand(sub => sub
            .setName("antibadwords")
            .setDescription("antiBadWords")
            .addBooleanOption(option => option.setName("status").setDescription("Statut").setRequired(true))
        )
        .addSubcommand(sub => sub
            .setName("antiwebhook")
            .setDescription("antiWebhook")
            .addBooleanOption(option => option.setName("status").setDescription("Statut").setRequired(true))
        )
        .addSubcommand(sub => sub
            .setName("antilink")
            .setDescription("antiLink")
            .addBooleanOption(option => option.setName("status").setDescription("Statut").setRequired(true))
        )
        .addSubcommand(sub => sub
            .setName("antiguildmanage")
            .setDescription("antiGuildManage")
            .addBooleanOption(option => option.setName("status").setDescription("Statut").setRequired(true))
        ),
    async execute(interaction, client) {
        let user = interaction.user;
        const guild = interaction.guild;
        let member = guild.members.cache.get(user.id);

        if(!member.permissions.has("ADMINISTRATOR")) {
            interaction.reply({content: "Désolée, vous devez être un membre du Staff d'Érodia pour effectuer cette commande.", ephemeral: true});
            return;
        }

        if(interaction.options.getSubcommand() === "all") await require("./sub/raid/all").execute(client, interaction);
        if(interaction.options.getSubcommand() === "anticreatechannel") await require("./sub/raid/anticreatechannel").execute(client, interaction);
        if(interaction.options.getSubcommand() === "antideletechannel") await require("./sub/raid/antideletechannel").execute(client, interaction);
        if(interaction.options.getSubcommand() === "antibot") await require("./sub/raid/antibot").execute(client, interaction);
        if(interaction.options.getSubcommand() === "anticreaterole") await require("./sub/raid/anticreaterole").execute(client, interaction);
        if(interaction.options.getSubcommand() === "antideleterole") await require("./sub/raid/antideleterole").execute(client, interaction);
        if(interaction.options.getSubcommand() === "antibadwords") await require("./sub/raid/antibadwords").execute(client, interaction);
        if(interaction.options.getSubcommand() === "antilink") await require("./sub/raid/antilink").execute(client, interaction);
        if(interaction.options.getSubcommand() === "antiguildmanage") await require("./sub/raid/antiguildmanage").execute(client, interaction);
        if(interaction.options.getSubcommand() === "antiwebhook") await require("./sub/raid/antiwebhook").execute(client, interaction);
    },
};
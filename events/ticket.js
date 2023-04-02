module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client)
    {
        if (!interaction.isButton()) return;
        if (interaction.customId === "open-ticket") await require('./sub/ticket/open-ticket').execute(interaction, client);
        if (interaction.customId === "close-ticket") await require('./sub/ticket/close-ticket').execute(interaction, client);
        if (interaction.customId === "confirm-close") await require('./sub/ticket/confirm-close').execute(interaction, client);
        if (interaction.customId === "delete-ticket") await require('./sub/ticket/delete-ticket').execute(interaction, client);
    }
}

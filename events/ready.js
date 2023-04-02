const gradient = require("gradient-string");
const ServerStatus = require("../tasks/ServeurStatus");
const Hierarchie = require("../tasks/Hierarchie");
const BannedWords = require("../databases/BannedWords");
const Ticket = require("../handler/TicketHandler");

module.exports = {
  name: 'ready',
  async execute(client)
  {
    console.clear();
    console.log(gradient('#ffdd00', '#d35400')("" +
        "                                                                                            \n" +
        "                                 ███████╗██████╗  ██████╗ ██████╗ ██╗ █████╗                \n" +
        "                                 ██╔════╝██╔══██╗██╔═══██╗██╔══██╗██║██╔══██╗               \n" +
        "                                 █████╗  ██████╔╝██║   ██║██║  ██║██║███████║               \n" +
        "                                 ██╔══╝  ██╔══██╗██║   ██║██║  ██║██║██╔══██║               \n" +
        "                                 ███████╗██║  ██║╚██████╔╝██████╔╝██║██║  ██║               \n" +
        "                                 ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝╚═╝  ╚═╝               \n" +
        "                                                                                            \n" +
        "                        ╔═════════════════════════╗         ╔═════════════════════════╗     \n" +
        "                        ║      dsc.gg/erodia      ║         ║       dsc.gg/erodia     ║     \n" +
        "                     ╔═══════════════════════════════════════════════════════════════════╗  \n" +
        "                     ║                                                                   ║  \n" +
        "                     ║                                                                   ║  \n" +
        "                     ║                                                                   ║  \n" +
        "                     ║                                                                   ║  \n" +
        "                     ║                       Made by Zwuiix#0001                         ║  \n" +
        "                     ║                                                                   ║  \n" +
        "                     ║                                                                   ║  \n" +
        "                     ║                                                                   ║  \n" +
        "                     ║                                                                   ║  \n" +
        "                     ╚═══════════════════════════════════════════════════════════════════╝  \n" +
        "\n" +
        `\t\t\t\t\t    Bot connected with ${client.user.username}` +
        ""));

    await client.user.setActivity("Gérer érodia", { type: "COMPETING"});
    await client.user.setStatus('idle');

    await ServerStatus.start(client);
    await Hierarchie.start(client);
    await BannedWords.load();
    //await Ticket.execute(client);
  }
};

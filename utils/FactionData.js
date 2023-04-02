const {Config} = require("./Config");
const Path = require("path");
module.exports = {
    ban: new Config(Path.join("/home/root1/Faction/plugin_data/FactionCore/config/ban.json"), "json"),
    players: new Config(Path.join("/home/root1/Faction/plugin_data/FactionCore/config/players.json"), "json"),
}
const {Config} = require("../utils/Config");
const Path = require("path");
let config = new Config(Path.join(process.cwd() + "/databases/raid.json"), "json");
let temp_raid = new Config(Path.join(process.cwd() + "/databases/temp-raid.json"), "json");

module.exports = {
    getConfig()
    {
        return config;
    },

    getTempConfig()
    {
        return temp_raid;
    }
}
const {Config} = require("../utils/Config");
const Path = require("path");
let config = new Config(Path.join(process.cwd() + "/databases/staffname.json"), "json");

module.exports = {
    getConfig()
    {
        return config;
    }
}
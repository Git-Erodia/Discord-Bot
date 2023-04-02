const {Config} = require("../utils/Config");
const Path = require("path");
const fs = require("fs");

let WORDS = [];

module.exports = {
    async load()
    {
        const wordsFiles = fs.readdirSync(Path.join(process.cwd() + "/databases/banned-words"));
        for (const file of wordsFiles) {
            let fileSync = fs.readFileSync(Path.join(process.cwd() + `/databases/banned-words/${file}`), 'utf-8');
            const words = fileSync.split(/\r?\n/);
            words.forEach((word) => WORDS.push(word));
        }
    },

    getAllWords()
    {
        return WORDS;
    }
}
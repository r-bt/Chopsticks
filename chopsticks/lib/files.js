const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = {
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },
    getMarkdownFiles: () => {
        return fs.readdirSync(process.cwd()).filter((file) => {
            return path.extname(file).toLowerCase() == ".md";
        });
    },
    getPdfs: () => {
        return fs.readdirSync(process.cwd()).filter((file) => {
            return path.extname(file).toLowerCase() == ".pdf";
        });
    },
    getScriptDirectoryBase: () => {
        const script = __dirname;
        return script.substring(0, script.lastIndexOf('/'));
    }
}

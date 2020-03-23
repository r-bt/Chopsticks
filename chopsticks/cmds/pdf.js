const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('../lib/inquirer');
const files = require('../lib/files');
const Templater = require('../lib/templater');
const fs = require('fs');
const pdf = require('../lib/pdf');
const ora = require('ora');

module.exports = (args) => {

    clear();
    console.log(
            chalk.cyan(
                    figlet.textSync("Chopsticks", {horizontalLayout: 'full'})
            )
    );

    let markdowns = files.getMarkdownFiles();
    if(markdowns.length == 0){
        console.log(chalk.red('Error: No markdown files were found'));
        process.exit()
    }

    const run = async() => {
        const config = await inquirer.askConfig();
        const spinner = ora().start()
        templater = new Templater(config.template);
        promises = [];
        markdowns.forEach((file, i) => {
            text = fs.readFileSync(file, 'utf8');
            let content = templater.generate(text, config);
            promises.push(pdf.createPdf(content, config.template, file));
        });
        Promise.all(promises).then((buffers) => {
            const fileName = args._[1] || "sushi.pdf"
            pdf.savePdfs(buffers, fileName);
            spinner.stop();
        });
    }

    run();

}

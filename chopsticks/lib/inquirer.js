const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk')

const validate = (value) => {
    if(value.length){
        return true;
    }else{
        return "Please respond"
    }
}

async function askChopsticks() {
    const questions = [
        {
            name: "title",
            message: "Enter the title of the Sushi Card:",
            validate: validate
        },
        {
            name: "description",
            message: "Enter a description of the Sushi:",
            validate: validate
        },
        {
            name: "author",
            message: "Enter the author:",
            validate: validate
        },
        {
            name: "template",
            message: "What template do you want to use (leave empty for default):",
            default: "default",
        }
    ];
    return inquirer.prompt(questions);
}

async function askTemplate(template) {
    const text = fs.readFileSync(__dirname + `/../templates/${template}/config.json`, 'utf8');
    try{
        const config = JSON.parse(text);
        if(config.tags.length > 0){
            return inquirer.prompt(config.tags);
        }else{
            return false;
        }
    }catch{
        console.log(chalk.red('Error: Invalid template config file'));
    }
}

module.exports.askChopsticks = askChopsticks;
module.exports.askTemplate = askTemplate;

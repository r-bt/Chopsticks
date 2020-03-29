const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk')
const path = require('path');
const files = require('./files');

const validate = (value) => {
    if(value.length){
        return true;
    }else{
        return "Please respond"
    }
}

/**
    Issues: Will filter the default value
    Solution: Initalize global default and check against this
**/
const filePath = (value) => {
    return new Promise((resolve, reject) => {
        if(path.isAbsolute(value)){
            resolve(value)
        }
        resolve(process.cwd() + `/${value}`);
    });
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
    const functions = {"validate": validate, "filePath": filePath};
    try{
        const config = JSON.parse(fs.readFileSync(__dirname + `/../templates/${template}/config.json`, 'utf8'));
        if(config.tags.length == 0){
            console.log(config.tags.length);
            return false
        }
        config.tags.map((item) => {
            if("filter" in item){
                if(!(item.filter in functions)){
                    throw new Error("Invalid function name")
                }
                item.filter = functions[item.filter]
            }
            if("default" in item && ! path.isAbsolute(item.default)){
                item.default = files.getScriptDirectoryBase() + `/templates/${template}/template/${item.default}`
            }
            return item;
        });
        return inquirer.prompt(config.tags);
    }
    catch{
        console.log(chalk.red('Error: Invalid template config file'));
        process.exit(1);
    }
}

module.exports.askChopsticks = askChopsticks;
module.exports.askTemplate = askTemplate;

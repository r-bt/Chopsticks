const inquirer = require('inquirer');

const validate = (value) => {
    if(value.length){
        return true;
    }else{
        return "Please respond"
    }
}

module.exports = {
    askConfig: () => {
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
                name: "logo",
                message: "What logo do you want to use (leave empty for default):",
                default: "logo.png",
            },
            {
                name: "template",
                message: "What template do you want to use (leave empty for default):",
                default: "default",
            }
        ];
        return inquirer.prompt(questions)
    }
};

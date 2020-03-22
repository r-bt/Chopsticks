const showdown = require('showdown');
const extensions = require('./showdown');
const Mustache = require('mustache');
const fs = require('fs');

module.exports = class Templater{

    constructor(template){
        this.template = template;
        this.page = 0;
        this.config = this.readConfig(template);
        //Register and add extensions
        this.converter = new showdown.Converter({extensions: ['titles', 'code', 'sections', 'emphasis', 'code-position', 'p-position', 'list-starts']});
        this.converter.setFlavor('github');
    }

    mdToHtml(text){
        return this.converter.makeHtml(text);
    }

    readConfig(template){
        const data = fs.readFileSync(__dirname + `/../templates/${template}/config.json`, 'utf8');
        return JSON.parse(data);
    }

    getTemplate(template){
        var page = "template.html";
        if(this.page == 0 && this.config['first_page'] != ""){
            page = this.config['first_page'];
        }
        text = fs.readFileSync(__dirname + `/../templates/${template}/template/${page}`, 'utf8');
        return text;
    }

    generate(text, config){
        config.content = this.mdToHtml(text);
        const template = this.getTemplate(this.template);
        this.page += 1;
        return Mustache.render(template, config);
    }

}

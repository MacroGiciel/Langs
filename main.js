require('dotenv').config();
const fs = require('fs');
const path = require('path');
const en_EN = require('./langs/en_EN.json');
var ignore = require('./ignore.json');
var log = {};

var data = {};

function init(){
    var allfiles = getFiles('./langs');

    allfiles.forEach(element => {
        console.log(element);

        var current = fs.readFileSync(element).toString();
            current = JSON.parse(current);
        
        var lang = element.replace('./langs/', '');
            lang = lang.replace('.json', '');

        console.log(lang, ':', current['language_version']);

        log[lang] = {};
        Object.keys(en_EN).forEach((val) => {
            if(val != "_______COMMENT"){
                if(ignore[lang] == null){
                    ignore[lang] = {};
                }
                var currentIgnores = [];
                var currentIgnore = Object.entries(ignore[lang]);
                    currentIgnore.forEach((val) => {
                        currentIgnores.push(val[1]);
                    });
                if(lang != 'en_EN'){
                    if(current[val] == en_EN[val]){
                        if(currentIgnores != null){
                            if(currentIgnores.includes(val) == false){
                                log[lang][val] = en_EN[val];
                            }
                        }
                        else{
                            log[lang][val] = en_EN[val];
                        }
                    }
                    if(current[val] == null){
                        if(currentIgnores != null){
                            if(currentIgnores.includes(val) == false){
                                log[lang][val] = en_EN[val];
                            }
                        }
                        else{
                            log[lang][val] = en_EN[val];
                        }
                    }
                }
            }
        });

        data[lang] = current['language_version'];
    });

    fs.writeFileSync('./log.json', JSON.stringify(log, null, 2));

    fs.writeFileSync('./version_lang.json', JSON.stringify(data, null, 2));
}

init();

function getFiles(dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            console.log(`INFO: ${name}`)
            getFiles(name, files_);
        }
        else{
            files_.push(name);
        }
    }
    return files_;
}
require('dotenv').config();
const fs = require('fs');

function init(){
    var allfiles = getFiles('./langs');

    allfiles.forEach(element => {
        console.log(element);

        var current = fs.readFileSync(element).toString();
            current = JSON.parse(current);
        
        var lang = element.replace('./langs/', '');
            lang = lang.replace('.json', '');

        console.log(lang, ':', current['language_version']);

        var arrayCur = current['language_version'];
            arrayCur = parseInt(arrayCur);
            arrayCur++;

        current['language_version'] = arrayCur;

        fs.writeFileSync(element, JSON.stringify(current, null, 2));
    });
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
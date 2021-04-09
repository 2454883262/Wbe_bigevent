const fs = require('fs');

const path = require('path');

const urlName = path.join(__dirname, 'index.html');

const urlNameCss = path.join(__dirname, 'clock/idnex.css');

const urlNameJs = path.join(__dirname, 'clock/idnex.Js');

const urlNameHtml = path.join(__dirname, 'clock/idnex.html');


const regStyle = /<style>[\s\S]*<\/style>/;

const regScript = /<script>[\s\S]*<\/script>/;


console.log(urlName);

fs.readFile(urlName, 'utf8', function(err, data) {
    if (err) {
        return console.log(err.message);
    }
    resolveCSS(data);
    resolveJS(data);
    resolveHTML(data);

})

function resolveCSS(data) {
    var clockCss = regStyle.exec(data);

    var newCss = clockCss[0].replace('<style>', '').replace('</style>', '');

    fs.writeFile(urlNameCss, newCss, 'utf8', err => {
        if (err) {
            return console.log(err.message);
        }
        console.log('写入css成功');
    })
}

function resolveJS(data) {
    var clockJs = regScript.exec(data);

    var newJs = clockJs[0].replace('<script>', '').replace('</script>', '');

    fs.writeFile(urlNameJs, newJs, 'utf8', err => {
        if (err) {
            return console.log(err.message);
        }
        console.log('写入js成功');
    })
}

function resolveHTML(data) {

    var clockHtml = data
        .replace(regScript, '<link rel="stylesheet" href="./idnex.css">')
        .replace(regStyle, '<script src="./idnex.Js"></script>');
    fs.writeFile(urlNameHtml, clockHtml, 'utf8', err => {
        if (err) {
            return console.log(err.message);
        }
        console.log('写入HTML成功');
    })

}
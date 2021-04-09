const fs = require('fs');
const path = require('path')
    // console.log();
const urlName = path.join(__dirname, './files/1.txt');

fs.readFile(urlName, 'utf8', function(err, data) {
    if (err) {
        return console.log(err.message);
    }

    var arr = data.split(' ');

    console.log(arr);
    var arr1 = arr.map(v => v.replace(':', '='));
    console.log(arr1.join('\n'));

    // fs.writeFile(urlName, arr1.join('\n'), 'utf8', function(err) {

    // })
})
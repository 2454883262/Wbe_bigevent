const fs = require('fs');

const path = require('path');
console.log('----------------------------');

console.log(__dirname, '__dirname');
console.log('----------------------------');

console.log(path.join('a', 'b', 'c', 'heh.txt'));
console.log('----------------------------');
console.log(path.join(__dirname, '../files/2.txt'));

fs.readFile(path.join(__dirname, './files/2.txt'), 'utf8', (err, data) => {
    if (err) return console.log(err.message);
    console.log('----------------------------');

    console.log(data);
})
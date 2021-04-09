const path = require('path');

const filePath = path.join(__dirname, './files/1.txt');

const bname = path.basename(filePath);
console.log(bname);
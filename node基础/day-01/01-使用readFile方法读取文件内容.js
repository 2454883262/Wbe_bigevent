console.log('刘帅开始上夜班');
const fs = require('fs');
fs.readFile('./files/1.txt', 'utf8', function(err, dataStr) {
    console.log(err);
    console.log('-------------');
    // console.log(dataStr);
    return dataStr;
})

console.log(dataStr);
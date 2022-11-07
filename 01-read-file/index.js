const path = require('path');
const fs = require('fs');

const file = path.resolve(__dirname, 'text.txt');

let n = fs.createReadStream(file, 'utf-8');

n.on('data', n => console.log(n));
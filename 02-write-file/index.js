const path = require('path');
const fs = require('fs');
const { stdin, stdout, exit } = require('process');

const file = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));

stdout.write('Enter yor message:\n {Type "exit" or press ctrl + c to stop}\n');

stdin.on('data', (n) => {
    if(n.toString().trim() == 'exit') {
        ending();
    } else {
       file.write(n);
    }
});

function ending() {
    stdout.write('\n Good luck!');
    exit();
}

process.on('SIGINT', ending);
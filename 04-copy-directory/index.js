const fs = require('fs');
const path = require('path');
//const { readdir } = require('fs/promises');

const file = path.resolve(__dirname, 'files');
const copy = path.resolve(__dirname, 'copy-files');

if (!fs.existsSync(copy)) {
    fs.mkdir((copy), (err) => {
        if (err) return err.message;
    });
};

fs.readdir(file, (err, data) => {
    if (err) return err.message;
    data.forEach(item => {
        fs.copyFile(path.resolve(__dirname, path.join('files', item)), path.resolve(__dirname, path.join('copy-files', item)), (err) => {
            if (err) return err.message;
        });
    });
});
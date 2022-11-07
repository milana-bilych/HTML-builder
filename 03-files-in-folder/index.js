const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

let n = path.resolve(__dirname, 'secret-folder');

readdir(n, { withFileTypes: true })
   .then((data) => data.forEach(file => {
      const files = path.resolve(n, file.name);

      if (file.isFile()) {
         fs.stat(files, (err, stats) => {
            if (stats) {
               return console.log(`${path.extname(files)} - ${(path.basename(files, path.extname(files))).replace('.', '')} - ${((stats.size / 1024).toFixed(3))}kb`);
            }
         });
      }
   }));
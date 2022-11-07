const fs = require('fs');
const path = require('path');
//const { readdir } = require('fs/promises');

const styles = path.resolve(__dirname, 'styles');
const bundles = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(styles, {withFileTypes: true}, (err, n) => {
    if (err) {
      return console.log(err.message);
    } else {
      n.forEach(file => {
        if((path.extname(path.join(styles, file.name))) === '.css'){
            (fs.createReadStream(path.join(styles, file.name), {encoding: 'utf-8'})).pipe(bundles);
        }
      });
    }
  });
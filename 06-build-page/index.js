const fs = require('fs');
const path = require('path');

let first = path.resolve(__dirname, 'template.html');
let second = path.resolve(__dirname, 'components');
let total = path.resolve(__dirname, 'project-dist');
let template = fs.createReadStream(first, 'utf8');

fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, err => {
    if(err) throw err;
  });
  
  let styles = path.resolve(__dirname, 'styles');
  let bundles = path.resolve(__dirname, 'project-dist', 'style.css');
  
  fs.readdir(styles, { withFileTypes: true }, function(err, items) {
    if (err) {
      throw err;
    }
    const out = fs.createWriteStream(bundles);
    items.forEach(function(item) {
      let parse = path.parse(item.name).ext;
      if(item.isFile() === true && parse == '.css')  {
        const input = fs.createReadStream(path.join(styles, item.name), 'utf-8');
        input.on('data', n => out.write(n));
        input.on('error', err  => console.log('Error', err.message));
      }
    });
  });

fs.readFile(first, function (err) {
  fs.mkdir(total, { recursive: true }, err => {
    if(err) throw err;
  });    
 
  let file = fs.createWriteStream(path.resolve(total, 'index.html'), { withFileTypes: true });
  let arrOne = [];
  let arrTwo = [];
  let string;
  template.on('data', n => {
    string = n;
    
    fs.readdir(second, { withFileTypes: true }, function(err, elements) {
      if (err) {
        throw err;
      }
      elements.forEach((el) => {
        let read = fs.createReadStream(path.join(second, el.name));
        let copy = path.basename(el.name, path.extname(el.name));
        arrOne.push(read);
        arrTwo.push(copy);
        for (let i = 0; i < arrOne.length; i++) {
          arrOne[i].on('data', (data) => {
            string = string.replace(`{{${arrTwo[i]}}}`, data);
            if (i === arrOne.length - 1)
              file.write(string);
          });
        }
      });
    });
  });
});

function copyFiles(src, dist) {
    fs.readdir(src, {withFileTypes: true }, (err, items) => {
      if (err) {
        throw err;
      }
      for (let item of items) {
        if (item.isDirectory()) {
          let copySrc = path.resolve(src, item.name);
          let copyDist = path.resolve(dist, item.name);
          copyFiles(copySrc, copyDist);
        } else {
          fs.mkdir(dist, { recursive: true }, function(err) {
            if (err) {
              throw err;
            }
          });
          fs.copyFile(
            path.resolve(src, item.name),
            path.resolve(dist, item.name), 
            function (err) {
              if (err)
                throw err;
            }
          );
        }
      }
  }); 
  }

copyFiles(path.resolve(__dirname, 'assets'), path.resolve(total, 'assets'), function(err) {
  if (err) {
    throw err;
  }
});
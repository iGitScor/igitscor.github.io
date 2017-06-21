var fs = require('fs');
var path = require('path');
var purify = require('purifycss');

var content = ['_site/**/*.html'];
var css = [path.resolve('_site/style/index.css')];

purify(content, css, (purifiedResult) => {
    fs.writeFile('./_site/style/purified.css', purifiedResult, (err) => {
        if (err) {
          return console.log(err);
        }

        console.log('The file was saved!');
      }
    );
  }
);

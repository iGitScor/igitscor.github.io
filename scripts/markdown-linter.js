const glob = require('glob');
const markdownlint = require('markdownlint');

const allowedRule = 'MD033';
const config = {
  default: true,
  line_length: false,
  'no-emphasis-as-header': false,
};

const files = glob.sync('+(_posts|_drafts)/**/*.md');

var codeStatus = 0;
markdownlint({ files, config }, (err, result) => {
  if (!err) {
    const resultString = result.toString();

    if (resultString) {
      const resultArray = resultString.split('\n');
      console.log('== Linting Markdown Files...');

      for (var i = 0; i < resultArray.length; i++) {
        if (resultArray[i].indexOf(allowedRule) < 0) {
          codeStatus = 1;

          // Error - log in red
          console.log('\x1b[1m\x1b[31m\t%s\x1b[0m', resultArray[i]);
        } else {
          // Warning - log in yellow
          console.log('\x1b[1m\x1b[33m\t%s\x1b[0m', resultArray[i]);
        }
      }

      process.exit(codeStatus);
    } else {
      console.log('== OK!');
    }
  }
});

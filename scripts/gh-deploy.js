const ghpages = require('gh-pages');
const path = require('path');

// Demo deployment
ghpages.publish(
  path.join(__dirname, '..', '_site'),
  {
    branch: 'master',
    src: [
      '**/*.*',
    ],
    message: 'Automatic deployment update',
    dotfiles: true,
    add: true,
  },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('No error in the website deployment');
    }
  }
);

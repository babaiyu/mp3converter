const ghPages = require('gh-pages');

ghPages.publish('dist', function (err) {
  const isError = err;
  if (isError === undefined) {
    console.log('Success upload to github-pages');
  } else console.log('There is Error', isError);
});

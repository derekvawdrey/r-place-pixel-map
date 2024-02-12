const fs = require('fs');
const sass = require('sass');

const inputFilePath = './assets/css/scss/main.scss';
const outputFilePath = './assets/css/main.css';

const compileSass = () => {
  const result = sass.renderSync({
    file: inputFilePath,
  });

  fs.writeFileSync(outputFilePath, result.css.toString());
  console.log('SCSS compiled to CSS:', inputFilePath, '->', outputFilePath);
};

compileSass();

fs.watchFile(inputFilePath, (curr, prev) => {
  if (curr.mtime > prev.mtime) {
    compileSass();
  }
});

console.log('Watching for changes in', inputFilePath);

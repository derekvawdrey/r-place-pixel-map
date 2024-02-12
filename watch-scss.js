const fs = require('fs');
const sass = require('sass');

const inputFilePath = './assets/css/scss/main.scss';
const outputFilePath = './assets/css/main.css';

const compileSass = () => {
  try {
    const result = sass.renderSync({
      file: inputFilePath,
    });

    fs.writeFileSync(outputFilePath, result.css.toString());
    console.log('SCSS compiled to CSS:', inputFilePath, '->', outputFilePath);
  } catch (error) {
    console.error('Error compiling SCSS:', error);
  }
};

compileSass();

fs.watch(inputFilePath, { encoding: 'utf-8' }, (eventType, filename) => {
  if (eventType === 'change') {
    console.log('File changed:', filename);
    compileSass();
  }
});

console.log('Watching for changes in', inputFilePath);

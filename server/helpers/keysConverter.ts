const fs = require('fs');

const fn = async () => {
  let fData = '';
  await fs.readFile('client/public/locales/ja/translation.json', function (err, data) {
    if (err) throw err;
    fData = toKebabCase(data.toString('utf-8'));

    fs.writeFile('client/public/locales/ja/translation.json', fData, (err) => {
      if (err) throw err;
      console.log('Done writing');
    });
  });
};

fn();

const toKebabCase = (str) => {
  return str.replace(/([a-z])([A-Z])/g, (match, a, b) => `${a}-${b}`.toLowerCase());
};

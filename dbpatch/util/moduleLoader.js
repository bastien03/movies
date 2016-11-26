const path = require('path');
const fs = require('fs');

exports.load = (patchDirectory) => {
  const normalizedPath = path.join(__dirname, `../${patchDirectory}`);
  const patches = [];
  fs.readdirSync(normalizedPath).forEach((file) => {
    patches.push({
      name: file,
      module: require(`../${patchDirectory}/${file}`),
    });
  });

  return patches;
};

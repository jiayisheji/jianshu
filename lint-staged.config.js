const path = require('path');

module.exports = {
  "{apps,libs}/**/*.{ts,json,md,scss,html}": files => {
    const cwd = process.cwd();
    const filesList = files.map(file => path.relative(cwd, file)).join(',');
    return [
      `npx nx affected:lint --parallel --fix --files=${filesList}`,
      `npx nx format:write --files=${filesList}`,
      `git add ${files.join(' ')}`,
    ];
  }
}
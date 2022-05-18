const fs = require('fs');
const path = require('path');

console.log('加载测试用例.');

const cases = fs.readdirSync(path.resolve(__dirname))
  .filter(name => path.extname(name) === '.js')
  .filter(name => name !== 'index.js')
  .map(name => require(path.resolve(__dirname, name)))
  .map(c => {
    const html_path = path.join(__dirname, `${c.id}.html`);
    if (fs.existsSync(html_path)) {
      return {
        ...c,
        html: fs.readFileSync(html_path, 'utf8'),
      };
    }
    console.log(`  ${c.title} 对应 html 不存在, 跳过...`);
    return null;
  })
  .filter(c => c);

console.log(`加载测试用例完成, 共 ${cases.length} 条.`);
console.log(cases.map(c => c.title));

module.exports = cases;
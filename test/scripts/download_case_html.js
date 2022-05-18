const fs = require('fs');
const path = require('path');

const got = require('got');
const getHeaders = require('../../src/douban/libs/getHeaders');

const FORCE_UPDATE = false;
const CASES_DIR = path.join(__dirname, '../cases');

console.log('读取测试用例.');
const cases = fs.readdirSync(CASES_DIR)
  .filter(name => path.extname(name) === '.js')
  .filter(name => name !== 'index.js')
  .map(name => require(path.resolve(CASES_DIR, name)));

console.log(`读取测试用例完成, 共 ${cases.length} 条.`);
console.log(cases.map(c => c.title));

console.log('下载测试所需 html.');
(async () => {
  for (const c of cases) {
    const html_path = path.join(CASES_DIR, `${c.id}.html`);
    if (fs.existsSync(html_path) && !FORCE_UPDATE) {
      console.log(`${c.title} 已存在, 跳过...`);
      continue;
    }
    console.log(`${c.title} 下载中...`);
    const url = `https://book.douban.com/subject/${c.id}/`;
    const response = await got(url, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (response.statusCode !== 200) {
      console.log(`${c.title} 获取失败: ${response.statusCode}`);
      continue;
    }
    console.log(`${c.title} 下载完成.`);
    const html = response.body;
    fs.writeFileSync(html_path, html);
  }
  console.log('下载 html 完成.');
})();
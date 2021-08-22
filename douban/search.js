const got =require('got');
const decrypt = require('./libs/decrypt');
const headers = require('./libs/headers');

async function search(text) {
  const response = await got('https://search.douban.com/book/subject_search?search_text=' + text, {
    method: 'GET',
    headers,
  });
  const r = /window\.__DATA__ = "(.*?)";/.exec(response.body)[1];
  const result = decrypt(r);
  return result.payload.items;
};

module.exports = search;

// search('政治的逻辑').then(console.log).catch(console.log);

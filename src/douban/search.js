const got = require('got');
const decrypt = require('./libs/decrypt');
const headers = require('./libs/getHeaders')();

async function getSearchResultFromOnline(text) {
  const response = await got('https://search.douban.com/book/subject_search?search_text=' + text, {
    method: 'GET',
    headers,
  });
  const r = /window\.__DATA__ = "(.*?)";/.exec(response.body)[1];
  const result = decrypt(r);
  return result.payload.items;
}

module.exports = {
  getSearchResultFromOnline
};

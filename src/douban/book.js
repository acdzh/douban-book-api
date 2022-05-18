const got = require('got');
const headers = require('./libs/getHeaders')();
const parseHTML = require('./libs/parseHtml');

async function getBookInfoFromOnlineById(id) {
  const response = await got(`https://book.douban.com/subject/${id}/`, {
    method: 'GET',
    headers,
  });
  return parseHTML(response.body, id);
}

async function getBookInfoFromOnlineByIsbn(isbn) {
  const response = await got(`https://book.douban.com/isbn/${isbn}/`, {
    method: 'GET',
    headers,
  });
  return parseHTML(response.body);
}

module.exports = {
  getBookInfoFromOnlineById,
  getBookInfoFromOnlineByIsbn,
};
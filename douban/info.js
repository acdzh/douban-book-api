const got =require('got');
const headers = require('./libs/headers');
const parseHTML = require('./libs/parseHtml');

const fs = require('fs');
const path = require('path');

const CACHE_DIR = process.env.CACHE_DIR || './.cache';

try {
  fs.mkdirSync(path.join(CACHE_DIR, 'html', 'id'), { recursive: true });
  fs.mkdirSync(path.join(CACHE_DIR, 'html', 'isbn'), { recursive: true });
} catch(err) {}

async function getBookInfoByUrl(url, id) {
  const response = await got(url, {
    method: 'GET',
    headers,
  });
  if(id) {
    fs.writeFileSync(path.join(CACHE_DIR, 'html', 'id', `${id}.html`), response.body);
  }
  const result = parseHTML(response.body, id);
  if(!id && result.id) {
    fs.writeFileSync(path.join(CACHE_DIR, 'html', 'id', `${result.id}.html`), response.body);
  }
  if(result.isbn) {
    fs.writeFileSync(path.join(CACHE_DIR, 'html', 'isbn', `${result.isbn}.html`), response.body);
  }
  return result;
};

async function getBookInfoById(id) {
  return await getBookInfoByUrl(`https://book.douban.com/subject/${id}/`, id);
}

async function getBookInfoByIsbn(isbn) {
  return await getBookInfoByUrl(`https://book.douban.com/isbn/${isbn}/`);
}

module.exports = {
  getBookInfoByIsbn,
  getBookInfoById,
  getBookInfoByUrl
};

if (require.main === module) {
  getBookInfoByIsbn('9787506323864').then(console.log).catch(console.log);
}
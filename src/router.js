const decrypt = require('./douban/libs/decrypt');
const parseHTML = require('./douban/libs/parseHtml');
const {
  searchByText,
  getBookInfoById,
  getBookInfoByIsbn,
} = require('./douban');
const { CACHE_DB_PATH } = require('./cache');


const Router = require('@koa/router');
const { updateSearchResultToCache, updateBookInfoToCacheByIsbn } = require('./cache');
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'hello. please view the api doc at https://github.com/acdzh/douban-book-api.';
});

router.get('/search', async (ctx) => {
  const { text, update } = ctx.query;
  if (!text || text === '') {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: 'text is required.',
    };
  } else {
    try {
      const { result, is_cache } = await searchByText(text, update === '1');
      ctx.body = {
        success: true,
        data: result,
        is_cache,
      };
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: err,
      };
    }
  }
});

router.get('/book', async (ctx) => {
  const { id = '', isbn = '', update } = ctx.query;
  if (id === '' && isbn === '') {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: 'id or isbn is required.',
    };
  } else {
    try {
      const { info, is_cache } = id === ''
        ? await getBookInfoByIsbn(isbn, update === '1')
        : await getBookInfoById(id, update === '1');
      ctx.body = {
        success: true,
        data: info,
        is_cache,
      };
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        success: false,
        message: err,
      };
    }
  }
});

// for tamper-monkey
router.post('/search', async (ctx) => {
  const { text } = ctx.query;
  if (!text || text === '') {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: 'text is required.',
    };
  } else {
    const { DATA } = ctx.request.body;
    try {
      const result = decrypt(DATA).payload.items;
      if (result) updateSearchResultToCache(text, result);
      ctx.body = {
        success: true,
        data: result,
      };
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: err,
      };
    }
  }
});

router.post('/book', async (ctx) => {
  const { html } = ctx.request.body;
  try {
    const info = parseHTML(html);
    const { isbn } = info;
    if (info) updateBookInfoToCacheByIsbn(isbn, info);
    ctx.body = {
      success: true,
      data: info,
    };
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = {
      success: false,
      message: err,
    };
  }
});

router.get('/cache', async (ctx) => {
  ctx.set('Content-Type', 'application/octet-stream');
  ctx.set('Content-Disposition', 'attachment; filename=books.sqlite');
  ctx.body = require('fs').createReadStream(CACHE_DB_PATH);
});

router.get('/ping', async (ctx) => {
  ctx.body = 'pong';
});

module.exports = {
  router
};
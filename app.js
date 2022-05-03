const fs = require('fs');
const path = require('path');

const CACHE_DIR = process.env.CACHE_DIR || './.cache';

try{
  fs.mkdirSync(path.join(CACHE_DIR, 'search'), {recursive: true});
  fs.mkdirSync(path.join(CACHE_DIR, 'info', 'id'), {recursive: true});
  fs.mkdirSync(path.join(CACHE_DIR, 'info', 'isbn'), {resursive: true});
} catch(err) {}


const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

const { searchByDATA, searchByText } = require('./douban/search');
const { getBookInfoByHtml, getBookInfoById, getBookInfoByIsbn } = require('./douban/info');

const PORT = process.env.PORT || 3000;

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'hello. please view the api doc at https://github.com/acdzh/douban-book-api.';
});

router.get('/search/:text', async (ctx, next) => {
  try{
    if(ctx.query.update === '1' || !fs.existsSync(
      path.join(CACHE_DIR, 'search', `${ctx.params.text}.json`)
    )) {
      const result = await searchByText(ctx.params.text);
      ctx.body = {
        success: true,
        data: result,
        is_cache: false
      };
      fs.writeFileSync(
        path.join(CACHE_DIR, 'search', `${ctx.params.text}.json`),
        JSON.stringify(result),
        { encoding: 'utf8' }
      );
    }
    else {
      const result = JSON.parse(
        fs.readFileSync(
          path.join(CACHE_DIR, 'search', `${ctx.params.text}.json`),
          { encoding: 'utf8' }
        )
      );
      ctx.body = {
        success: true,
        data: result,
        is_cache: true
      };
    }
  } catch (err) {
    throw err;
    ctx.body = {
      success: false,
      message: err
    }
  }
});

// for tamper-monkey
router.post('/search/:text', async (ctx, next) => {
  try {
    const { DATA } = ctx.request.body;
    const result = await searchByDATA(DATA);
    ctx.body = {
      success: true,
      data: result,
      is_cache: false
    };
    fs.writeFileSync(
      path.join(CACHE_DIR, 'search', `${ctx.params.text}.json`),
      JSON.stringify(result),
      { encoding: 'utf8' }
    );
  } catch (err) {
    throw err;
    ctx.body = {
      success: false,
      message: err
    }
  }
})

router.get('/id/:id', async (ctx, next) => {
  try{
    if(ctx.query.update === '1' || !fs.existsSync(
      path.join(CACHE_DIR, 'info', 'id', `${ctx.params.id}.json`)
    )) {
      const result = await getBookInfoById(ctx.params.id);
      ctx.body = {
        success: true,
        data: result,
        is_cache: false
      };
      fs.writeFileSync(
        path.join(CACHE_DIR, 'info', 'id', `${ctx.params.id}.json`),
        JSON.stringify(result),
        { encoding: 'utf8' }
      );
      if(result.isbn) {
        fs.writeFileSync(
          path.join(CACHE_DIR, 'info', 'isbn', `${result.isbn}.txt`),
          ctx.params.id,
          { encoding: 'utf8' }
        );
      }
    }
    else {
      const result = JSON.parse(fs.readFileSync(
        path.join(CACHE_DIR, 'info', 'id', `${ctx.params.id}.json`),
        { encoding: 'utf8' }
      ));
      ctx.body = {
        success: true,
        data: result,
        is_cache: true
      };
    }
  } catch (err) {
    throw err;
    ctx.body = {
      success: false,
      message: err
    }
  }
});

// for tamper-monkey
router.post('/id/:id', async (ctx, next) => {
  try{
    const { html } = ctx.request.body;
    const result = await getBookInfoByHtml(html, ctx.params.id);
    ctx.body = {
      success: true,
      data: result,
      is_cache: false
    };
    fs.writeFileSync(
      path.join(CACHE_DIR, 'info', 'id', `${ctx.params.id}.json`),
      JSON.stringify(result),
      { encoding: 'utf8' }
    );
    if(result.isbn) {
      fs.writeFileSync(
        path.join(CACHE_DIR, 'info', 'isbn', `${result.isbn}.txt`),
        ctx.params.id,
        { encoding: 'utf8' }
      );
    }
  } catch (err) {
    throw err;
    ctx.body = {
      success: false,
      message: err
    }
  }
});

router.get('/isbn/:isbn', async (ctx, next) => {
  try{
    if(ctx.query.update === '1' || !fs.existsSync(
      path.join(CACHE_DIR, 'info', 'isbn', `${ctx.params.isbn}.txt`)
    )) {
      const result = await getBookInfoByIsbn(ctx.params.isbn);
      ctx.body = {
        success: true,
        data: result,
        is_cache: false
      };
      // console.log(result)
      if(result.id) {
        fs.writeFileSync(path.join(CACHE_DIR, 'info', 'id', `${result.id}.json`), JSON.stringify(result), { encoding: 'utf8' });
        fs.writeFileSync(path.join(CACHE_DIR, 'info', 'isbn', `${ctx.params.isbn}.txt`), result.id, { encoding: 'utf8' });
      }
    }
    else {
      const id = fs.readFileSync(path.join(CACHE_DIR, 'info', 'isbn', `${ctx.params.isbn}.txt`), { encoding: 'utf8' });
      const result = JSON.parse(fs.readFileSync(path.join(CACHE_DIR, 'info', 'id', `${id}.json`), { encoding: 'utf8' }));
      ctx.body = {
        success: true,
        data: result,
        is_cache: true
      };
    }
  } catch (err) {
    throw err;
    ctx.body = {
      success: false,
      message: err
    }
  }
});

app
  .use(cors())
  .use(logger())
  .use(bodyParser())
  .use(router.allowedMethods())
  .use(router.routes());


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
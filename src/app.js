const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

const { router } = require('./router');

const PORT = process.env.PORT || 3000;

const app = new Koa();

app
  .use(cors())
  .use(logger())
  .use(bodyParser())
  .use(router.allowedMethods())
  .use(router.routes());

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
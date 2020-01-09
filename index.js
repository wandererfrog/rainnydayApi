const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors')
const {searchCityName} = require('./routes.js')

const app = new Koa();
const router = new Router();

router.get('/search', searchCityName);
app.use(cors({ options : {origin : '*'} }))

app.use(router.routes());
app.use(router.allowedMethods());


app.listen(5000);

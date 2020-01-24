const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors')
const {searchCityName,getWeatherData,healthy} = require('./src/routes.js')

const app = new Koa();
const router = new Router();

router.get('/v1/search', searchCityName);
router.get('/v1/weather/',getWeatherData);
router.get('/v1/healthy',healthy);


app.use(cors({ options : {origin : '*'} }))

app.use(router.routes());
app.use(router.allowedMethods());

console.info("Starting server at port: "+process.env.PORT);
app.listen(port);

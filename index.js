const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors')
const {searchCityName,getWeatherData} = require('./src/routes.js')

const app = new Koa();
const router = new Router();

router.get('/v1/search', searchCityName);

// router.get('/v1/weather/',getWeather);
// router.get('/v1/forecast/',getForecast);
router.get('/v1/weather/',getWeatherData)

app.use(cors({ options : {origin : '*'} }))

app.use(router.routes());
app.use(router.allowedMethods());

console.info("Starting server at port: 5000")
app.listen(5000);

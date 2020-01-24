var request = require('request-promise');

const {getWeekDayName} = require('./utils/dates')
const {getAverageTemp,getMinTemp,getMaxTemp} = require('./utils/temperatures')

const data = require('./data/city.list.json')


async function searchCityName(ctx, next) {
    const str = ctx.request.query.city;
    if(!str){
        ctx.response.status=400
        ctx.body = []
    }

    const filteredData = await data
    .filter( city => {
        var pattern = str.split("").map((x)=>{
            return `(?=.*${x})`
        }).join("");    var regex = new RegExp(`${pattern}`, "g")    
        return city.name.match(regex);
    }).slice(0,60).map((city)=>( { value : city.name , id : city.id , label : city.name }))

    ctx.body = filteredData
}

async function getWeatherData(ctx,next){
    let params = {
        APPID : process.env.API_KEY,
    }
    params = Object.assign(params,ctx.request.query)

    const forecastData = await request({
        uri : 'https://api.openweathermap.org/data/2.5/forecast',
        qs: params
    },(err,resp,body)=>{
        // console.log(err,resp,body); //TODO: deal with error
        return body;
    })

    const currentData = await request({
        uri : 'https://api.openweathermap.org/data/2.5/weather',
        qs: params
    },(err,resp,body)=>{
        // console.log(err,resp,body); //TODO: deal with error
        return body;
    })

    const body = await prepareWeatherData(JSON.parse(currentData),JSON.parse(forecastData))
    ctx.body = body
}


async function prepareWeatherData(current,forecast){
    const MAX_GRAPH_POINTS = 8 // 8 * 3h = 24h

    let weatherData = {
        current : current,
        forecast : {},
        graph : []
    };

    try{
        // Get forecast for week
        await forecast.list.forEach( async (el,idx)=>{
            if(idx < MAX_GRAPH_POINTS)
                weatherData.graph.push(el)

            let date = new Date(el['dt_txt'])
            let key = `${date.getDate()}/${date.getMonth()+1}`
    
            if(!weatherData.forecast[key])
                weatherData.forecast[key] = {
                    name : getWeekDayName(date.getDay()),
                    temps : [],
                    min : null,
                    max : null,
                    avg : null
                }
                
            weatherData.forecast[key].temps.push({
                temp : el.main.temp,
                date : date
            })
        })
        
        await Object.keys(weatherData.forecast).forEach(async (key)=>{
                const temperatureSet = weatherData.forecast[key].temps; 
                let [max,min,avg] = await Promise.all([getMaxTemp(temperatureSet), getMinTemp(temperatureSet), getAverageTemp(temperatureSet)]);
                weatherData.forecast[key].max = max
                weatherData.forecast[key].avg = avg
                weatherData.forecast[key].min = min
            })    
        }catch(exception){
            log.error(exception)
            return {}
        }

        return weatherData;
}

module.exports = {
    searchCityName : searchCityName,
    getWeatherData : getWeatherData
}
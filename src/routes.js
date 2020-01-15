var request = require('request-promise');

const {getWeekDayName} = require('./utils/dates')
const {getAverageTemp,getMinTemp,getMaxTemp} = require('./utils/temperatures')

const data = require('./data/city.list.json')
const config = require('./config.js')


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


async function getWeather(ctx, next){

    let params = {
        APPID : config.weatherApiKey,
    }
    params = Object.assign(params,ctx.request.query)

    await request({
        uri : 'https://api.openweathermap.org/data/2.5/weather',
        qs: params
    },(err,resp,body)=>{
        // console.log(err,resp,body);
        ctx.body = body;
    })
}

async function getForecast(ctx, next){
    let params = {
        APPID : config.weatherApiKey,
    }
    params = Object.assign(params,ctx.request.query)

    await request({
        uri : 'https://api.openweathermap.org/data/2.5/forecast',
        qs: params
    },(err,resp,body)=>{
        const jsonBody = JSON.parse(body)
        prepareWeekForecastData(jsonBody)
        ctx.body = body;
    })
}

async function prepareWeekForecastData(data){
    // let startDate = new Date(data['dt_txt']);
    let forecastData = {};

    try{
        await data.list.forEach( async (el)=>{
            let date = new Date(el['dt_txt'])
            let key = `${date.getDate()}/${date.getMonth()+1}`
    
            if(!forecastData[key])
                forecastData[key] = {
                    name : getWeekDayName(date.getDay()),
                    temps : [],
                    min : null,
                    max : null,
                    avg : null
                }
                
            forecastData[key].temps.push({
                temp : el.main.temp,
                date : date
            })
            
            await Object.keys(forecastData).forEach(async (key)=>{
                forecastData[key].avg = await getAverageTemp(forecastData[key].temps);
                forecastData[key].min = await getMinTemp(forecastData[key].temps);
                forecastData[key].max = await getMaxTemp(forecastData[key].temps);
            })

            console.log(forecastData)    
        })
    }catch(exception){
        console.error(exception);
        return {};
    }
    

}

module.exports = {
    searchCityName : searchCityName,
    getWeather : getWeather,
    getForecast : getForecast
}
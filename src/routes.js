var request = require('request-promise');

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
        console.log(err,resp,body);
        ctx.body = body;
    })
}

module.exports = {
    searchCityName : searchCityName,
    getWeather : getWeather
}
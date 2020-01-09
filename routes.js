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

module.exports = {
    searchCityName : searchCityName
}

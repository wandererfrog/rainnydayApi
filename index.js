const data = require('./data/city.list.json')
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var count = 0


while(count<1000){
    rl.question(count+"City?",function(str){
        const newData = data
        .filter( city => {
            var pattern = str.split("").map((x)=>{
                return `(?=.*${x})`
            }).join("");    var regex = new RegExp(`${pattern}`, "g")    
            return city.name.match(regex);
        }).slice(0,200).map((city)=>( { value : city.name , label : city.name }))
    
        console.log(newData);
        console.log(newData.length)
    })
    count++
}


// data
//     .filter( city => {
//         var pattern = str.split("").map((x)=>{
//             return `(?=.*${x})`
//         }).join("");    var regex = new RegExp(`${pattern}`, "g")    
//         return city.name.match(regex);
//     }).slice(0,40).map((city)=>( { value : city.name , label : city.name }))
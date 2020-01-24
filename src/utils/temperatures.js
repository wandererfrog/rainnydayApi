async function getAverageTemp(list){
    let count = 0;
    let total = 0;

    for (const temp in list) {
        total += list[temp].temp
        count ++;
    }
    return total/count;
}

async function getMaxTemp(list){
    try{
        return await Math.max(...list.map( temp => (temp.temp)))
    }catch(exception){
        console.error(exception);
        return null;
    }
}

async function getMinTemp(list){
    try{
        return Math.min(...list.map( temp => (temp.temp)))
    }catch(exception){
        console.error(exception);
        return null;
    }
}


module.exports = {
    getAverageTemp : getAverageTemp,
    getMaxTemp : getMaxTemp,
    getMinTemp :getMinTemp
}
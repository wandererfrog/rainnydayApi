const weekDays = ["Sunday","Saturday","Monday","Tuesday","Wednesday","Thursday","Friday"]

function getWeekDayName(weekDay){
    return weekDays[weekDay];
}

module.exports = {
    getWeekDayName : getWeekDayName
}
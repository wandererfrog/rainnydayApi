const weekDays = ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"]

function getWeekDayName(weekDay){
    return weekDays[weekDay];
}

module.exports = {
    getWeekDayName : getWeekDayName
}
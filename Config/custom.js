const timeConfig = {
    startHour :  '8:00',
    endHour : '17:00',
    duration : 30
}

const splitTime = (startTime, endTime, interval) =>{
    const result = [startTime.toString()];
    let time = startTime.add(interval,'m');
    while(time.isBetween(startTime,endTime,undefined,[])){
        result.push(time.toString());
        time = time.add(interval,'m');
    }
    return result;
}

module.exports = { timeConfig , splitTime  }
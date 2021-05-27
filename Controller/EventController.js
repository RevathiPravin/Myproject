const EventModel = require('../Model/Event.js')
const SlotModel = require('../Model/Slots.js')
const moment = require('moment');
const custom = require('../Config/custom.js')

async function createEvent(request, response) {

    const resData = {
        status : false,
        message : 'Oops! Unable to create event'
    }
    try {
        console.log("aaa")
        const dateTime = moment()
        const duration = 30
        const saveData  = {
            dateTime : new Date(dateTime),
            duration : duration
        }
        console.log("sa.....",saveData)
        const { status , message , error} = await EventModel.createEvent(saveData)
        resData.status = status
        resData.message = message
        response.send(resData)

    } catch(error) {

        console.log("Error while creating event")
        res.status = false
        res.message = message
        res.error = error
        return res
        
    }
   
}


module.exports = { createEvent  };
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
        const dateTime = moment()
        const duration = 30
        const saveData  = {
            gmtDateTime : new Date(dateTime),
            duration : duration
        }
        const { status , message , error} = await EventModel.createEvent(saveData)
        if(status) {
            let where = {
                reqDate : dateTime.format('YYYY-MM-DD'),
                reqDateTime : saveData.gmtDateTime
            }
            let updateSlot = await SlotModel.updateSlot(where)
        }
        resData.status = status
        resData.message = message
        response.send(resData)

    } catch(error) {

        console.log("Error while creating event")
        resData.status = false
        resData.message = message
        resData.error = error
        return res
        
    }
   
}


module.exports = { createEvent  };
const EventModel = require('../Model/Event.js')
const SlotModel = require('../Model/Slots.js')
const moment = require('moment');
const custom = require('../Config/custom.js')

async function createEvent() {

    const res = {
        status : false,
        message : 'Oops! Unable to create event'
    }
    try {
                
        const dateTime = moment()
        const duration = 30
        console.log("dateTime........",dateTime)
        let where = { dateTime : new Date('2021-05-17') }
        const isAvailable = await SlotModel.getAllSlots(where)
        console.log("isAvailable........",isAvailable)
        if(isAvailable.status && isAvailable.data.length > 0 ) {
            const saveData  = {
                dateTime : new Date(dateTime),
                duration : duration
            }
            const { status , message , error} = await EventModel.createEvent(saveData)
            res.status = status
            res.message = message
        }
        console.log("res.......",res)
        return res

    } catch(error) {

        console.log("Error while creating event")
        res.status = false
        res.message = message
        res.error = error
        return res
        
    }
   
}


module.exports = { createEvent  };
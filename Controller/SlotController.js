const SlotModel = require('../Model/Slots.js')
const moment = require('moment');
const custom = require('../Config/custom.js')
const EventModel = require('../Model/Event.js')

async function createSlot(req,res) {

    const resData = {}
    try {
        
        const interval = custom.timeConfig.duration;
        const startHr = custom.timeConfig.startHour
        const endHr = custom.timeConfig.endHour
        const startTime = new moment({hour: startHr.split(':')[0],minute:startHr.split(':')[1] });
        const endTime = new moment({hour: endHr.split(':')[0], minute: endHr.split(':')[1] });
        
        const timeSlices = custom.splitTime(startTime,endTime,interval);
        const timeSlot = []
        timeSlices.forEach(function (item, index) {            
            timeSlot.push({ 'gmtDateTime' : new Date(timeSlices[index]) , duration : interval , isAvailable : 'Available'})
        }) 
        
        const { status , message , error} = await SlotModel.createSlot(timeSlot)
        res.status = status
        res.message = 'Success'
        res.send(resData)
    } catch(error) {

        console.log("Error while creating event")
        res.status = false
        res.message = message
        res.error = error
        return res
        
    }
   
}

async function getAllSlotsBasedOnDate(req) {
    const res = {}
    try {

        let startDate = moment(req.startDate, 'MM/DD/YYYY')
        let endDate = moment(req.endDate, 'MM/DD/YYYY')
        let timeZone = req.timeZone
        let where = {}
        where.gmtDateTime = { '$gte' : new Date(startDate) , '$lte' : new Date(endDate) }
        where.isAvailable = 'Available'
        const { status , message , data } = await SlotModel.getAllSlots(where, timeZone)
        res.status = status
        res.data = data
        res.message = 'Success'
        if(data.length == 0) {
            res.message = 'No slots found'
        }
        return res        

    } catch(error) {

        console.log("Error while getting event",error)
        res.status = false
        res.message = 'Failure'
        res.error = error
        return res
        
    }
   
}

async function getFreeSlots(data) {

    const res = {}
    try {

        let where = { gmtDateTime : new Date(startDate) }
        const { status , message , data } = await SlotModel.getAllSlots(where)
        res.status = status
        res.message = message
        res.data = data
        return res        

    } catch(error) {

        console.log("Error while getting event")
        res.status = false
        res.message = message
        res.error = error
        return res
        
    }
   
}


async function renderSlotPage(req, res) {
    res.render('slots', {
        title : 'Slots'
    });
}



module.exports = { createSlot , getAllSlotsBasedOnDate , getFreeSlots , renderSlotPage};
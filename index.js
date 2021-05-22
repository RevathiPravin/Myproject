const express = require('express');
const app = express();
const SlotController = require('./Controller/SlotController')
const EventController = require('./Controller/EventController')

var bodyParser = require('body-parser');  

app.set('view engine', 'ejs')
app.use(bodyParser.json());                                  
app.use(bodyParser.urlencoded({ extended: true }));       

app.get('/', SlotController.renderSlotPage)
app.get('/create-slots', SlotController.createSlot)
app.post('/get-all-slots', (req, res) => {
    if(req.body != undefined && req.body != null) {
        const res =  SlotController.getAllSlotsBasedOnDate(req.body)
    }
})
app.get('/create-event', EventController.createEvent)


app.listen(8080);
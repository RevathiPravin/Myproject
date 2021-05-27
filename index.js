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
app.post('/get-all-slots', async (req, res) => {
    if(req.body != undefined && req.body != null) {
        const data =  await SlotController.getAllSlotsBasedOnDate(req.body)
        res.send(data)
    }
})
app.get('/create-event', EventController.createEvent)

const host = '0.0.0.0';
const port = process.env.PORT || 5000;

app.listen(port, host, function() {
    console.log("Server started.......");
  });
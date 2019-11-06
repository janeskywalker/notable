const mockData = require('./mockData').mockData;

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//--------routes-----------//

// get a list of all doctors
app.get('/doctors', (req, res) => {
    res.json(mockData.doctors)
});

// a list of all appts given a doc and a day
app.get('/:id/:month/:day', (req, res) => {
    console.log(req.params.id)
    console.log(req.params.month)
    console.log(req.params.day)
    
    let appointments = null

    appointments = mockData.appointments.filter((appointment) => {
        if(appointment.doctorId === parseInt(req.params.id) && appointment.date.month === req.params.month && appointment.date.day === req.params.day) {
            return appointment
        }
    })

    console.log("appointments", appointments)
    res.json({appointments})
});


// delete an appoinment for a doctor, given an appt id
app.delete('/:appointmentId', (req, res)=>{
    console.log(req.params.appointmentId)

    mockData.appointments = mockData.appointments.filter(appointment=>appointment.id !== parseInt(req.params.appointmentId))

    console.log(mockData.appointments)
    res.json(mockData.appointments)
})



function isValidTime(time) {
    return (
        time.endsWith('00') ||
        time.endsWith('15') ||
        time.endsWith('30') ||
        time.endsWith('45')
    )
}


// add an appointment
app.post('/appointments', (req, res)=>{
    console.log(req.body)

    if(isValidTime(req.body.date.time)) {
        const conflictingAppointments = mockData.appointments.filter((appointment) => {
            if(appointment.doctorId === parseInt(req.body.doctorId) && appointment.date.month === req.body.date.month && appointment.date.day === req.body.date.day) {
                return appointment
            }
        })
    
        if(conflictingAppointments.length < 3) {
            const newAppointment = {
                id: mockData.id,
                doctorId: parseInt(req.body.doctorId),
                patientFirstName: req.body.patientFirstName,
                patientLastName: req.body.patientLastName,
                date: req.body.date
            }
            mockData.appointments.push(newAppointment)
    
            console.log({newAppointment})
    
            mockData.id++
        
            res.json({newAppointment})
        }else {
            res.json({message: "too many appointment at this time"})
        }
        
    }else{
        res.json({message: "invalid tiime"})
    }

   


})





//---------run server--------//
app.listen(process.env.PORT || 3000, () => {
    console.log('Express server is up and running on http://localhost:3000/');
});
  
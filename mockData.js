




module.exports.mockData = {
    id: 3,
    doctors: [
        {
            id: 0,
            firstName: "John",
            lastName: "Watson",

        },
        {
            id: 1,
            firstName: "Gregory",
            lastName: "House",
        }
    ],

    appointments: [
        { 
            id: 0,
            doctorId: 0, 
            patientFirstName: "Sherlock",
            patientLastName:"Holmes",
            kind: 'follow-up',
            date: {
                month: "Jan",
                day: "20",
                time: "08:15"
            }
        },
        { 
            id: 1,
            doctorId: 0, 
            patientFirstName: "Mary",
            patientLastName:"Morstan",
            kind: 'follow-up',
            date: {
                month: "Jan",
                day: "20",
                time: "13:15"
            }
        },
        { 
            id: 2,
            doctorId: 1, 
            patientFirstName: "Dominica",
            patientLastName:"House",
            kind: 'follow-up'
        },
    ]
}
const rp = require('request-promise-native');
const deepEqual = require('deep-equal');
const server = require('./server');
const mockData = require('./mockData').mockData;

// Reset mock data.
mockData.users = [];


// Test root route
async function runTests() {

    // index, get all users
    // test 1
    await rp('http://localhost:3000/users', {
        json: true,
    }).then((res) => {
        console.log('Test 1: ', res);
        if (!deepEqual(res, [])) {
            throw new Error('Test 1 failed');
        }
    })

    // post, create users
    // test 2
    await rp('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        json: {
            name: 'Jane'
        }
    }).then((res) => {
        console.log('Test 2: ', res);
        if (res.message !== 'Hi Jane') {
            throw new Error('Test 2 failed');
        }
    })


    // index, get all users
    // test 3
    await rp('http://localhost:3000/users', {
        json: true,
    }).then((res) => {
        console.log('Test 3: ', res);
        if (!deepEqual(res, [{
            id: 0,
            name: 'Jane'
        }])) {
            throw new Error('Test 3 failed');
        }
    })

    // delete
    // test 4
    await rp('http://localhost:3000/users/0', {
        method: 'DELETE',
        json: true,
    }).then((res)=>{
        console.log('Test 4:', res)
        if (!deepEqual(res, [])) {
            throw new Error('Test 4 failed');
        } 
    })
}

runTests().then(() => {
    console.log('Tests complete!');
    process.exit(0);
}, (err) => {
    console.error(err);
    process.exit(1);
});
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b1d074537fc16b753c45472088b0066c/' + latitude + ',' + longitude

    request({url, json: true}, (error, {body}) => {
        if(error) {
                callback('Unable to connect to services!')
            } else if (body.error){
                callback('Incorrect Input!')
            } else {
                callback(undefined, body.currently.temperature)
        }
    })
}

module.exports = forecast


// ========================
// ==== Weather Stack ===== 
// ========================
// const urlWeatherStack = 'http://api.weatherstack.com/current?access_key=09d8adeab43d6b0012a0aa3a24c5fefe&query=37.8267,-122.4233&units=m'
// request({ url: urlWeatherStack, json: true }, (error,response) => {
//     if(error){
//         console.log('Unable to connect to Weather Service!')
//     } else if (response.body.error){
//         console.log(chalk.red('Unable to find the weather information!'))
//     }else{
//         // const dataBody = JSON.parse(response.body) //This is no need since we use parameter in request as json=true to prase all data in object form already
//         // console.log(dataBody.current) ////This is no need since we use parameter in request as json=true to prase all data in object form already
//         console.log(chalk.green(response.body.current.weather_descriptions)+ '. It is currently '+chalk.green(response.body.current.temperature)+' degrees out. '+'It\'feel like '+chalk.green(response.body.current.feelslike)+' degrees out.')
//     }
// })

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('postman-request')
const weather = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=09d8adeab43d6b0012a0aa3a24c5fefe&query=' + encodeURIComponent(lat) +','+encodeURIComponent(lon) + '&units=m'
    request({url, json: true}, (error, {body}={}) => {
        if(error) {
            callback('[WeatherStack] Cannot connect to the sevice provider!', undefined)
        } else {
            callback(undefined, {
                descriptions: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                // error: body.error
            })
        }
    })
}



module.exports = {
    weather: weather
}
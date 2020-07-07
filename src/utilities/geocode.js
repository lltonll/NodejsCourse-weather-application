//============================================================
//============= MapBox with no callback function ============= 
//============================================================
//Los%20Angeles
// const urlMapBox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/bangkok.json?access_token=pk.eyJ1IjoibGx0b25sbCIsImEiOiJjajVodGhpbGIxcWFkMzNzNjkyeDU3bmdjIn0.n_t0wRIgOZqw7DwcgbCSyA'
// request({url: urlMapBox,json: true},(error,response)=>{
//     if(error){
//         console.log(chalk.red('[Mapbox] Unable to connect to Mapbox service!'))
//     } else if (response.body.message === 'Not Found' || response.body.features.length === 0){
//             console.log('[Mapbox] Cannot locate your location!')
//     } else {
//         console.log('Getting coordinates!')
//         console.log(response.body.features[0].geometry.coordinates)
//         const lat = response.body.features[0].geometry.coordinates[1]
//         const lon = response.body.features[0].geometry.coordinates[0]
//         console.log(lat+' '+lon)
//     }

const request = require('postman-request')


const geoCode = (address, callback) => { //encodeURIComponent(variable) เพื่อเปลี่ยนพวก spacebar ให้เป็น %20 
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibGx0b25sbCIsImEiOiJjajVodGhpbGIxcWFkMzNzNjkyeDU3bmdjIn0.n_t0wRIgOZqw7DwcgbCSyA'
    request({url, json:true}, (error, {body}={}) => {
        if(error){
            callback('[Mapbox] Unable to connect to Mapbox service!', undefined)
        } else if (body.features) {
            if(body.features.length === 0){
                callback('[Mapbox] Your input location was wrong!', undefined)
            } else {
                const coordinates = body.features[0].geometry.coordinates
                const lat = body.features[0].geometry.coordinates[1]
                const lon = body.features[0].geometry.coordinates[0]
                callback(undefined, {
                    PlaceName: body.features[0].place_name,
                    coordinates: coordinates,
                    lat: lat,
                    lon: lon
                })
            }
        } else {
            callback('[Mapbox] Please input your location!')
        }
    })
}

module.exports = {
    geoCode: geoCode
}
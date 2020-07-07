const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoRequest = require('./utilities/geocode')
const weatherRequest = require('./utilities/weather')
const weather = require('./utilities/weather')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

const port = process.env.PORT || 3000 //heroku will provide port through this variable
//or if not we will use 3000


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) 
//it will find index.html to use as root no matter app.get('') is exist
//==== from Root, it will able to use root/about.html

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Tony Piyawat'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Tony Piyawat'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Tony Piyawat',
        helpText: 'This is help message!'
    })
})

//get('This is Path (if nothing is root path - www.ton.com)', (getRequest, what to send back {}) = {function})
// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!</h1>') //Send something back to requester
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        console.log('don\'t have address')
        return res.send({
            error: 'Please input the address to search the weather'
        })
    }
    geoRequest.geoCode(req.query.address, (error, {lat, lon, PlaceName} = {}) => {
        
        if(error){
            return res.send({error})
        }
        weatherRequest.weather(lat, lon, (error, {descriptions, temperature, feelslike}={})=>{
            if(error){
                return res.send({error})
            }
            // console.log(req.query.address)
            res.send({
            lat,
            lon,
            PlaceName,
            descriptions,
            temperature,
            feelslike,
            address: req.query.address
            })
        })
    })
})

app.get('/products' , (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    console.log(req.query.search) //GET method - recieve the data from user
    res.send({
        products: []
    })
    
    
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Tony Piyawat',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tony Piyawat',
        errorMessage: 'Page not found!'
    })
})

//Start the server up!
app.listen(port, () => { //port, callback function
    console.log('Server is up on port '+ port + '.')
}) 
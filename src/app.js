const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forcast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

//Define paths for express config
const app = express()
//Port is this or 3000 if it doesn't exist
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and view
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static dir to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Zied Jebali'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Zied Jebali'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'This is a test help message!',
        name: 'Zied Jebali'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'We require an address'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forcastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forcast: forcastData,
                location,
                address: req.query.address
            })
        })    
    })  

    
})

app.get('/products', (req, res) => {

    if(!req.query.search) {
         return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404error', {
        title: 'Help 404',
        errorMessage: 'Help article not found',
        name: 'Zied Jebali'
    })
})

//NEEDS TO BE AT THE END
app.get('*', (req, res) => {
    res.render('404error', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Zied Jebali'
    })
})


app.listen(port, () => {
    console.log('Server has started on port' + port)
})
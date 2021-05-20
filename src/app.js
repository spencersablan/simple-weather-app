const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine & views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Spencer Sablan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Spencer Sablan'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'You need help',
        name: 'Spencer Sablan'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                address: address,
                location,
                forecast: forecastData
            })
        })
    })

})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404 Error',
        message: 'Help article not found.',
        name: 'Spen'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: '404 Error',
        message: 'Page not found.',
        name: 'Spen'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
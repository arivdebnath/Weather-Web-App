const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');


const app = express();

//define paths for Express config
const pathDir = path.join(__dirname, '../public');
const pathViews = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views directory
app.set('view engine', 'hbs');
app.set('views', pathViews);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(pathDir));


app.get('/', (req, res) => {
    res.render('index', {
        title: 'WEATHER',
        api: 'Openweather',
        name: 'Ariv Debnath'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT',
        name: 'Ariv Debnath',
        date: '14/12/2021',
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP',
        name: 'Qwerty Ten',
    });
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Ariv Debnath',
        errorMessage: 'Sorry, the help article was not found.',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "Please provide an address"
        });
    }

    geoCode(req.query.address, (error, { latitude, longitude, placeName} = {}) => {
        if (error) {
            return res.send({
                error,
            })
        }
        forecast(latitude, longitude, (error2, { weather, feels_like, temp } = {}) => {
            if (error2) {
                return res.send({
                    error2,
                })
            }
            return res.send({
                weather,
                feels_like,
                temp,
                placeName,
                latitude, 
                longitude,
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Qwerty Ten',
        errorMessage: 'The requested page is not found!',
    });
})



app.listen(3000, () => {
    console.log('The server is up and running at port 3000');
})
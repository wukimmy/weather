const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

require('dotenv').config();
const apiKey = process.env.API_KEY;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/weather', function (req, res) {
   res.render('weather.ejs', {weather: null, error: null});
})
app.get('/', function (req, res) {
    res.render('index', { title: 'Page title' });
})

app.post('/weather', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  request(url, function (err, response, body) {
    if(err){
      res.render('weather.ejs', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('weather.ejs', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('weather.ejs', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

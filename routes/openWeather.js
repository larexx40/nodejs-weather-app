const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const request = require('request');
const { response } = require('../app');

var openWeather = express.Router();



openWeather.get('/', (req, res)=>{
    let city = 'lagos';
    let apikey = config.APIKey;
    //fetch data using city name
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`

    request(url, (err, response, result)=>{
        if(err){
            res.render('index', { title: 'open weather api', weather: null, error: 'Error pls try again' })
        }else{
            var weather = JSON.parse(result);
            console.log(weather);

            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            var date = new Date();
            var day = date.getDay().toString();
            var today = date.getDate();
            var month = date.getMonth();
            var year = date.getFullYear();
            console.log(days[day] + " " + today + " " + months[month] + "; ");
            
            res.render('index', { 
                title: 'open weather api', 
                weather: result , 
                error: null, 
                date: date.toDateString,
                day: days[day],
                month: months[month]
            });
        }
    })
})

openWeather.post('/find', (req, res)=>{
    let apikey = config.APIKey;
    var place = req.body.place
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${apikey}`

    request(url, (err, response, result)=>{
        if(err){
            console.log(err);
        }else{
            let  weather = JSON.parse(result);
            console.log(result);  

            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            const date = new Date();
            const today = date.getDate();
            const day = days[date.getDay()];
            const month = months[date.getMonth()];
            const year = date.getFullYear();

            res.render('response.ejs', {
                place: place,
                title: 'open weather api', 
                result: JSON.parse(result),
                weather: {weather}, 
                error: null, 
                date: date,
                day: day,
                month: month
            })
             
        }
    })
})

module.exports = openWeather;
const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const request = require('request');
const { response } = require('../app');

var openWeather = express.Router();
const apiKey = config.APIKey;


exports.getHome =  (req, res)=>{
    let city = 'lagos';
    let apikey = config.APIKey;
    //fetch data using city name
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`

    request(url, (err, response, result)=>{
        if(err){
            res.render('index', { title: 'open weather api', weather: null, error: 'Error pls try again' })
        }else{
            weather = JSON.parse(result);
            console.log(weather);

            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            var date = new Date();
            var day = date.getDay().toString();
            var today = date.getDate();
            var month = date.getMonth();
            var year = date.getFullYear();
            console.log(days[day] + " " + date + " " + months[month] + "; " + year );
            console.log(date.toDateString());
            console.log(today.toString());
            console.log(month.toString());
            console.log(year.toString());
            
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
}

exports.findLocation = (req, res)=>{
    var city = req.body.city
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`

    request(url, (err, response, result)=>{
        if(err){
            console.log(err);
        }else{
            let  weather = JSON.parse(result);
            console.log();  

            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            const date = new Date();
            const today = date.getDate();
            const day = days[date.getDay()];
            const month = months[date.getMonth()];
            const year = date.getFullYear();

            res.render('index', {
                title: 'open weather api', 
                weather: weather, 
                error: null, 
                date: date.toDateString,
                day: day,
                month: month
            })
             
        }
    })
}
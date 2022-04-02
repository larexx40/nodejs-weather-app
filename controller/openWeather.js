const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const request = require('request');
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

            const f =  weather.main.temp * 1.8 + 32;
            const fahrenheit = f.toFixed(2);
            const weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            var today = new Date();
            var day = today.getDay()
            var date = today.getDate();
            var month = today.getMonth();
            var year = today.getFullYear();
            console.log("The time and date function");
            console.log(today);
            console.log(days[day]);
            console.log(date);
            console.log(months[month]);
            console.log(year);
            
            res.render('index.ejs', { 
                title: 'open weather api',
                weather: weather , 
                error: null, 
                today: today,
                day: days[day],
                date: date,
                month: months[month],
                fahrenheit: fahrenheit,
                icon: weatherIcon,
            });
        }
    })
}

exports.findLocation = (req, res)=>{
    const {city} = req.body;
    const apikey = config.APIKey;
    console.log(city);
    //fetch data using city name
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`

    request(url, (err, response, result)=>{
        if(err){
            res.render('index', { title: 'open weather api', weather: null, error: 'Error pls try again' })
        }else{
            weather = JSON.parse(result);
            console.log(weather);


            //console.log(weather.name);  
            const f =  weather.main.temp * 1.8 + 32;
            const fahrenheit = f.toFixed(2);
            const weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
            console.log(weatherIcon);
                        
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            var today = new Date();
            var day = today.getDay()
            var date = today.getDate();
            var month = today.getMonth();
            var year = today.getFullYear();
            console.log("The time and date function");
            console.log(today);
            console.log(days[day]);
            console.log(date);
            console.log(months[month]);
            console.log(year);
            
            res.render('index.ejs', { 
                title: 'open weather api',
                weather: weather , 
                error: null, 
                today: today,
                day: days[day],
                date: date,
                month: months[month],
                fahrenheit: fahrenheit,
                icon: weatherIcon,
            });
             
        }
    })
}
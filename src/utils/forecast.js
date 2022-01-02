const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url =  'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&units=metric&appid='+API_KEY;

    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather services', undefined);
        }
        else if(body.cod){
            callback(body.message, undefined);
        }
        else{
            callback(undefined, body.current);
        }
    })
}

module.exports = forecast;

// forecast(35.690, 139.707, (error, data)=>{
//     if(error){
//         console.log(error);
//     }
//     else{
//         console.log(data.temp);
//         console.log('Feels like: '+data.feels_like);
//         console.log(data.weather[0].description);
//         console.log(data.weather[0].id);
//     }
// })

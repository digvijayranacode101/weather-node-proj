const request = require('request');
const forecast = (long, lat, loca, callback)=>{
    
    const url = `http://api.weatherstack.com/current?access_key=c74163705b1778ab7c2241422ceb6d0e&query=${lat},${long}`
    request({url:url, json:true}, (error, response)=>{
        if(error){
            callback('Something went wrong with internet')
        }else if(response.body.success==false){
            callback('Something went wrong with API request')
        }else{
            callback(undefined, {
                Location : loca,
                Temperature: response.body.current.temperature,
                Weather_Descrip: response.body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast
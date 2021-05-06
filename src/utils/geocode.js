const request = require('request');

const geocode = (address, callback)=>{
    const addressTOSearch = encodeURIComponent(address)
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${addressTOSearch}.json?access_token=pk.eyJ1IjoiZGVlamF5NjkzNiIsImEiOiJja282NTJsdTUwbW5tMm9uenIxYmJ6bncwIn0.8UuPBP2KMZkkn5vIDFekEg&limit=1`
    
    request({url: url, json:true}, (error,response)=>{
        if(error){
            callback('Unable to conect to services')
        }else if(response.body.features.length==0){
            callback('Unable to find location ,try another search')
        }else{
            const latitude = response.body.features[0].center[0]
            const longitude = response.body.features[0].center[1]
            const location = response.body.features[0].place_name
            callback(undefined, {
                Latitude:latitude, 
                Longitude: longitude,
                Location: location
            })
            // geocode(undefined, ({Latitude:latitude, Longitude:longitude}))
        }
    })
}



module.exports = geocode
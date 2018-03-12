const request = require('request');

var getWeather = (lat,lng,callback) => {
request({
  url:`https://api.darksky.net/forecast/3535f28c1b845e44d927f0647d020e10/${lat},${lng}`,
  json:true
},(error,response,body) => {
 if(!error && response.statusCode === 200){
     callback(undefined,{
         Temperature:body.currently.temperature,
         apparentTemperature:body.currently.apparentTemperature
     })
}else{
 callback('unable to fecth weather data');
  
}
 
  
})    
}

module.exports.getWeather = getWeather;



// Api Key:3535f28c1b845e44d927f0647d020e10
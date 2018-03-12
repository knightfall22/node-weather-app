const yargs   = require('yargs'),
      geocode = require('./geocode/geocode'),
      weather = require('./weather/weather');

const argv = yargs
  .option({
    a : {
      demand:true,
      alias:'address',
      describe:'Address to fetch weather for',
      string:true
    }
  })
  .help()
  .alias('help','h')
  .argv;

  

const Address = geocode.geocodeAddress(argv.address,(errorMessage,results) => {
    if(errorMessage){
      console.log(errorMessage);
      
    }else{
      weather.getWeather(results.latitude,results.longitude,(errorMessage,weatherResults)=>{
        if(errorMessage){
          console.log(errorMessage);
          
        }else{
          console.log(`Its' Currently ${weatherResults.Temperature} it feels like ${weatherResults.apparentTemperature}`)
          
        }
      });
      
    }
});



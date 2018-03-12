const yargs = require('yargs'),
      axios = require('axios');


const argv = yargs
    .option({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeURL).then((response) => {

var lat = response.data.results[0].geometry.location.lat;
var lng = response.data.results[0].geometry.location.lng;
var weatherURL = `https://api.darksky.net/forecast/3535f28c1b845e44d927f0647d020e10/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
      if (response.data.status === 'ZERO RESULTS') {
          throw new Error('Unable to connect to the address')
      }
      return axios(weatherURL)
    
}).then((response) => {
    var temperature = response.data.currently.temperature,
       apparentTemp = response.data.currently.apparentTemperature;
       console.log(`its currently ${temperature}, but it feels like ${apparentTemp}`);
       
}).catch((e) =>{
  
    if(e.code ==='ENOTFOUND' ){
        console.log('Cannot Connect to Api Server');
    }else{
        console.log(e.message);
        
    }
    console.log(e);
    
})
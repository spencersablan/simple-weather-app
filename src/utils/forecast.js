const request = require('request')

const forecast = (latitude, longitude, callback) => {
   const url = 'http://api.weatherstack.com/current?access_key=5acf4b408f09051b38405edef6e2e399&query=' + latitude +','+ longitude +'&units=f'

   request({url:url,json:true}, (error, { body }) => {
       if (error) {
           callback('Unable to process your request.', undefined)
       } else if (body.error) {
           callback('Unable to find location', undefined)
       } else {
           
           const {current} = body
           const {weather_descriptions,temperature,feelslike} = current

           callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out, but it feels like ${feelslike} degrees.  Have a great day`)
       }
   })
}

module.exports = forecast
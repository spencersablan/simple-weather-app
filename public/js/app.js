const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    
    const location = search.value
    const locationURL = 'http://localhost:3000/weather?address=' + location
    
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''

    getWeather(locationURL)
})

const getWeather = (location) => {
    fetch(location).then((response) => {
        response.json().then((data) => {
        if (data.error) {
            return messageOne.textContent = data.error
        }
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
        })
    })
}

let currentReport = {}

const yourLocation = () => {
  navigator.geolocation.getCurrentPosition(success, error, options)
}

const options = {
  enableHighAccuracy: false,
  timeout: 100000,
  maximumAge: 0
}

const success = pos => {
  let currentLat = pos.coords.latitude
  let currentLong = pos.coords.longitude

  let coordUrl =
    'https://api.openweathermap.org/data/2.5/weather?lat=' +
    currentLat +
    '&lon=' +
    currentLong +
    '&appid=27c656c95af0cc6ac0d65538f53aab04&units=imperial'

  callApi(coordUrl)
}

const error = err => {
  console.warn(`ERROR(${err.code}): ${err.message}'`)
}

const weatherReport = () => {
  const location = document.querySelector('.location-field').value
  const specifiedLocation = document.createElement('h2')
  specifiedLocation.textContent = 'In ' + location + ': '
  document.querySelector('body').appendChild(specifiedLocation)

  if (isNaN(location) == true) {
    const cityUrl =
      'https://api.openweathermap.org/data/2.5/weather?q=' +
      location +
      '&appid=27c656c95af0cc6ac0d65538f53aab04&units=imperial'

    callApi(cityUrl)
  } else {
    const zipUrl =
      'https://api.openweathermap.org/data/2.5/weather?zip=' +
      location +
      '&appid=27c656c95af0cc6ac0d65538f53aab04&units=imperial'

    callApi(zipUrl)
  }
}

const callApi = whatUrl => {
  fetch(whatUrl)
    .then(resp => {
      return resp.json()
    })
    .then(report => {
      currentReport = report
      printWeather()
    })
}

const printWeather = () => {
  const reportTemp = currentReport.main.temp
  const reportCondition = currentReport.weather[0].description

  const temperature = document.createElement('h3')
  temperature.textContent = reportTemp + ' \u00B0F'
  document.querySelector('body').appendChild(temperature)
  const conditions = document.createElement('h3')
  conditions.textContent = reportCondition
  document.querySelector('body').appendChild(conditions)
}

document
  .querySelector('.search-button')
  .addEventListener('click', weatherReport)

document.addEventListener('DOMContentLoaded', yourLocation)

let currentReport = {}

const weatherReport = () => {
  const location = document.querySelector('.location-field').value

  if (isNaN(location) == true) {
    const cityUrl =
      'https://api.openweathermap.org/data/2.5/weather?q=' +
      location +
      '&appid=27c656c95af0cc6ac0d65538f53aab04&units=imperial'
    fetch(cityUrl)
      .then(resp => {
        return resp.json()
      })
      .then(report => {
        currentReport = report
        console.log(currentReport)
        printWeather()
      })
  } else {
    const zipUrl =
      'https://api.openweathermap.org/data/2.5/weather?zip=' +
      location +
      '&appid=27c656c95af0cc6ac0d65538f53aab04&units=imperial'
    fetch(zipUrl)
      .then(resp => {
        return resp.json()
      })
      .then(report => {
        currentReport = report
        console.log(currentReport)
        printWeather()
      })
  }
}

const printWeather = () => {
  const reportTemp = currentReport.main.temp
  console.log(reportTemp)
  const reportCondition = currentReport.weather[0].description
  console.log(reportCondition)

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

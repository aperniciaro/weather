
// weather search function
//   input location
//   fetch weather api
//   then JSON
//   store json obj in variable

// output temperature
// output other weather info

// event listener for button click, send to location function
let currentReport = {}

const weather = () => {
  const location = document.querySelector('.location-field').value
  if(Number(location) == NaN){
    fetch('api.openweathermap.org/data/2.5/weather?q={'+location+'}&appid=27c656c95af0cc6ac0d65538f53aab04')
      .then(resp => {
        return resp.json()
      })
      then(report => {
        currentReport = report
      })
  }else{
    fetch('api.openweathermap.org/data/2.5/weather?zip={'+location+'}&appid=27c656c95af0cc6ac0d65538f53aab04')
    .then(resp => {
      return resp.json()
    })
    then(report => {
      currentReport = report
    })
  }

  const temp = document.createElement('h3')
  temp.textContent = currentReport.main.temp
  const conditions = document.createElement('h3')
  conditions.textContent = currentReport.weather.description
}

document.querySelector('.search-button).addEventListener('click', weather)
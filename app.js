


async function getCityWeather(city) {
  let url = `https://api.weatherapi.com/v1/forecast.json?key=e859a0448431435eaad121257231002&q=${city}&days=2`
  try {

    let response = await fetch(url)
    let data = await response.json()

    // console.log(data)
    return data


    
  } catch (error) {
    console.log('some error occured')
  }
}

function displayWeatherHourly(dataHourly) {
  let dataHourlyHtml = ``
  console.log(dataHourly)
  for (let i = 0; i < dataHourly.length; i++) {
    let currentHour = dataHourly[i]

    dataHourlyHtml += `
    <div class="hour">
      <p>${currentHour.time.split(" ")[1]}</p>
      <img src="${currentHour.condition.icon}" alt="">
      <p> ${currentHour.temp_c}C<sup>0</sup></p>
    </div>
    `
  }

  return dataHourlyHtml
}


function displayWeather(data) {

  let current = data.current
  let location = data.location
  let dataHourly = data.forecast.forecastday[0].hour

  const result = document.querySelector("#result")
  result.innerHTML = ``
  result.innerHTML = `
    <div class="result">

      <h1>${location.name} Weather Forecast</h1>
      
      <div class="result-wrapper">
        <div id="today">
          <h2>Today Weather</h2>
          <div class="today-wrapper">
            <div class="current">
              <div class="outlook">
                <div class="condition">
                  <img src="${current.condition.icon}" alt="">
                  <h2>${current.condition.text}</h2>
                </div>
                <div class="wind">
                  <p>Wind: ${current.wind_kph} kph</p>
                  <p>Humidity: ${current.humidity}</p>
                  <p>Pressure: ${current.pressure_mb} mb</p>
                  <h1> ${current.temp_c} C<sup>0</sup></h1>
                </div>

              </div>
              
              <div class="location">
                <h2>Information</h2>
                <table>
                  <tr>
                    <th>Country</th>
                    <td>${location.country}</td>
                  </tr>
                  <tr>
                    <th>Region</th>
                    <td>${location.region}</td>
                  </tr>
                  <tr>
                    <th>Lat/Lon</th>
                    <td>${location.lat} | ${location.lon}</td>
                  </tr>
                  <tr>
                    <th>Datetime</th>
                    <td>${location.localtime}</td>
                  </tr>
                  <tr>
                    <th>Timezone</th>
                    <td>${location.tz_id}</td>
                  </tr>
                </table>
  
              </div>
            </div>
            <h2>Weather Hourly</h2>
            <div class="hours-wrapper">
              ${displayWeatherHourly(dataHourly)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `

}




window.addEventListener("DOMContentLoaded", async () => {


  let data = await getCityWeather("phnom penh")

  displayWeather(data)


  const searchForm = document.querySelector("#searchForm")

  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const searchTerm = document.querySelector("#searchTerm")

    let city = searchTerm.value
    let data = await getCityWeather(city)
    displayWeather(data)

    searchTerm.value = ``

  })


})
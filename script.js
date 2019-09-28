let appID = "bf75d066eb4e7d53241c5a8525723723"
let units = "imperial";
let searchMethod = "Zip";

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm)+ '' === searchTerm)
    searchMethod = 'zip';
    else
    searchMethod = 'q';
}

function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  // fetch('http://api.openweathermap.org/data/2.5/weather?$'+searchMethod+'='+searchTerm+'&&APPID=$'+appID+'&units=$'+units+'')
  fetch('http://api.openweathermap.org/data/2.5/weather?q='+searchTerm+'&APPID='+appID)
  .then(result => {
    return result.json();
}).then(result=>{
  init(result);
}
)
}


function init(resultFromServer) {
  switch (resultFromServer.weather[0].main) {
    case 'Clear':
          document.body.style.backgroundImage = 'url("clear.jpg")';
      break;
    case 'Clouds':
          document.body.style.backgroundImage = 'url("Cloudy.jpg")';
      break;
      case 'Rain':
      case 'Drizzle':
      case 'Mist':
      break;
      document.body.style.backgroundImage = 'url("rain.jpg")';

      case 'Thunderstorm':
      break;
      document.body.style.backgroundImage = 'url("storm.jpg")';

      case 'Snow':
      break;
      document.body.style.backgroundImage = 'url("snow.jpg")';

      default:
      break;
  }
  let WeatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
  let TemperatureElement = document.getElementById('termperature');
  let HumidityElement = document.getElementById('humidity');
  let WindSpeedElement = document.getElementById('windSpeed');
  let CityHeader = document.getElementById('cityHeader');
  let WeatherIcon = document.getElementById('documentIconImg')

  console.log(resultFromServer.weather[0].main);
  WeatherIcon.src = resultFromServer.weather[0].main + '.jpeg';

  let resultDescreiption = resultFromServer.weather[0].description
  console.log(resultDescreiption);
  weatherDescriptionHeader.innerText = resultDescreiption.toUpperCase();

}

function setPositionForWeatherInfo (){
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHieght;
    let weatherWidth = weatherContainer.clientWidth;


    weatherContainer.style.left = "calc(50% - $(weatherDescriptionWidth/2))"
    weatherContainer.style.top = "calc(50% - $(weatherContainerHeight/1.3))"

}
document.getElementById('searchBtn').addEventListener('click', () => {
  let searchTerm = document.getElementById('searchInput').value;
  if(searchTerm){
    searchWeather(searchTerm);
  }
})

// https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=0b998ddc0a9496a270ccd9d7cfd8b7a0&units=matric
const apiKey = "0b998ddc0a9496a270ccd9d7cfd8b7a0";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

//City name come from two input field so add 2 var
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

//Update image according to weather condition
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json(); //This data will have all the info about the weather
  //Display this data on our webpage
  // console.log(data);

  //Show error when enter wrong city
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    //Display the all weather information on our app coming from the Open Weather Api
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    //Update the image according to weather condition
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    //Remove info about weather which we have set as default.
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

//Whenever webpage will be loaded it will call this function
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

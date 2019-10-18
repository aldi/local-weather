window.onload = function(){
  document.getElementById("access-location").onclick = function() {
    getLocation();
  };

    //Find a Forecast
    document.getElementById("search-city").onclick = function() {
      $("form").on("submit", function(event) {
        event.preventDefault();
        var city = $(".find-forecast").val(); //Get value from form input
        
        //AJAX Request
        $.getJSON("https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=6" + "&APPID=ec14d54dd7febfac36e3df98383f621c", function (data) {
          var rawJson = JSON.stringify(data);
          var json = JSON.parse(rawJson);
            updateWeather(json); //Update Weather parameters
          });
      });
    };
    //end of Find Forecast
  }

//Global variables
var longitude, latitude, timeHour, timeFull;


//Function to update weather information
function updateWeather (json) {

  longitude = json.city.coord.lon;
  latitude = json.city.coord.lat;

    //Update Weather parameters and location
    $(".location").html(json.city.name);
    for (var k=0; k<6; k++){
      var highTemp = [(json.list[k].temp.max - 273.15).toFixed(0)];
      var lowTemp = [(json.list[k].temp.min - 273.15).toFixed(0)];
      var weather = json.list[k].weather[0].icon;
      var day = timeConverter(json.list[k].dt);

  // insert values to the other days
  document.getElementsByClassName('dayname')[k].innerHTML = day;
  document.getElementsByClassName('weathericon')[k].innerHTML = "<img src='icons/" + weather + ".png'>";
  document.getElementsByClassName('maxtemp')[k].innerHTML = highTemp + " °C";
  document.getElementsByClassName('mintemp')[k].innerHTML = lowTemp + " °C"; }
}


// UNIX TO DAY
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp*1000);
  var days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  var day = a.getDay();
  var time = days[day];
  console.log("the day inside is: " + day);
  return time; 
}


//Check for Geoloaction support 
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCurrentLocation);

    //Return the user's longitude and latitude on page load using HTML5 geolocation API
    var currentPosition;
    
    function getCurrentLocation (position) {
      currentPosition = position;
      latitude = currentPosition.coords.latitude;
      longitude = currentPosition.coords.longitude;

        //AJAX request
        $.getJSON("https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + latitude + "&lon=" + longitude + "&cnt=6" + "&APPID=ec14d54dd7febfac36e3df98383f621c", function (data) {
          var rawJson = JSON.stringify(data);
          var json = JSON.parse(rawJson);
            updateWeather(json); //Update Weather parameters
          });
      }
    }
//If Geolocation is not supported by the browser, alert the user
else alert("Geolocation is not supported by your browser, download the latest Chrome or Firefox to use this web app");
}

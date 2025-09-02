
let timeInterval;

let getData = () => {
  getcity();
}

document.getElementById("city").addEventListener("keypress", (e) => {
  if (e.key === "Enter") getData();
});

async function getcity() {
  let city = document.getElementById("city").value;
  if (!city) return;
  
  document.querySelector(".card").style.display = "none";
  
  let url = `https://api.weatherapi.com/v1/current.json?key=ec7437aa43f74bc39a491739250109&q=${city}&aqi=no`;
  let response = await fetch(url);
  let data = await response.json();
  
  if (data.error) {
    document.getElementById("no-data").style.display = "block";
    return;
  }
  

  
  document.getElementById("countryname").innerHTML = data.location.country;
  document.getElementById("regionname").innerHTML = data.location.region;
  document.getElementById("cityname").innerHTML = data.location.name;
  document.getElementById("temperature").innerHTML = data.current.temp_c + "°C";
  document.getElementById("condition").innerHTML = data.current.condition.text;
  
  let icon = document.getElementById("weather-icon");
  icon.src = "https:" + data.current.condition.icon;
  icon.style.display = "block";

  if (timeInterval) clearInterval(timeInterval);
  
  let timezone = data.location.tz_id;
  let now = new Date().toLocaleString("en-US", {timeZone: timezone});
  document.getElementById("time").innerHTML = now;
  
  document.querySelector(".card").style.display = "block";  
  updateTime(timezone);
}           


function updateTime(timezone) {
  timeInterval = setInterval(() => {
    let now = new Date().toLocaleString("en-US", {timeZone: timezone});
    document.getElementById("time").innerHTML = now;
  }, 1000);
}

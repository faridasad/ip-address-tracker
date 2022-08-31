window.onload = function() {
    initialData()
}

const initialData = () => {
  let CLIENT_IP = "";
  const getIp = () => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => {
        return res.json();
      })
      .then(setIp);
  };

  const setIp = (res) => {
    document.querySelector("#ipText").textContent = res.ip;
    CLIENT_IP = res.ip;
  };
  getIp();

  let API_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=at_IRRuciinvf9zaCtyuCLLyi16XmSpM&ipAddress=${CLIENT_IP}`;

  const getData = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setData);
  };
  const setData = (res) => {
    document.querySelector(
      "#locationText"
    ).textContent = `${res.location.region}, ${res.location.country}`;
    document.querySelector(
      "#timeText"
    ).textContent = `UTC ${res.location.timezone}`;
    document.querySelector("#nameText").textContent = res.isp;
    displayMap(res.location.lat, res.location.lng);
  };
  getData();
};



const input = document.querySelector(".input");
const setQuery = () => {
  getResult(input.value);
  displayMap();
};
const setQueryK = (e) => {
  if (e.keyCode == "13") getResult(input.value);
};

const getResult = (ip) => {
  document.querySelector(".error-message").classList.remove("active");
  let query = `https://geo.ipify.org/api/v2/country,city?apiKey=at_IRRuciinvf9zaCtyuCLLyi16XmSpM&ipAddress=${ip}`;

  fetch(query)
    .then((res) => res.json())
    .then(displayResult);
};

const displayResult = (res) => {
  if (res.code == 422) {
    document.querySelector(".error-message").classList.add("active");
  } else {
    input.value = "";
    document.querySelector("#ipText").textContent = res.ip;
    document.querySelector(
      "#locationText"
    ).textContent = `${res.location.region}, ${res.location.country}`;
    document.querySelector(
      "#timeText"
    ).textContent = `UTC ${res.location.timezone}`;
    document.querySelector("#nameText").textContent = res.isp;
    const latitude = res.location.lat;
    const longitude = res.location.lng;
    map.remove()
    document.querySelector('.map-view-container').innerHTML = "<div id='map'></div>";
    displayMap(latitude, longitude);
  }
};

const displayMap = (lat, lng) => {
  var map = L.map("map").setView([lat, lng], 13);
  var customIcon = L.icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [31, 37],
  });
  var marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    minZoom: 4,
    attribution: "© OpenStreetMap",
  }).addTo(map);
};

const arrowButton = document.querySelector(".arrow-container");

arrowButton.addEventListener("click", setQuery);
input.addEventListener("keypress", setQueryK);

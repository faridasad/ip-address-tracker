window.onload = function () {
    let CLIENT_IP = ''
    const getIp = async () => {
        await fetch('https://api.ipify.org?format=json')
        .then(res => {
           return res.json()
        })
        .then(setIp)
    }
    
    const setIp = (res) => {
        document.querySelector("#ipText").textContent = res.ip
        CLIENT_IP = res.ip;
    }
    getIp()

    
    let API_URL = `https://geo.ipify.org/api/v2/country?apiKey=at_IRRuciinvf9zaCtyuCLLyi16XmSpM&ipAddress=${CLIENT_IP}`

    const getData = async () => {
        await fetch(API_URL)
        .then(res => res.json())
        .then(setData)
    }
    const setData = (res) => {
        document.querySelector("#locationText").textContent = `${res.location.region}, ${res.location.country}`
        document.querySelector("#timeText").textContent = `UTC ${res.location.timezone}`
        document.querySelector("#nameText").textContent = res.isp
    }
    getData()
}


const input = document.querySelector('.input')
const setQuery = () => {
    getResult(input.value)
}
const setQueryK = (e) => {
    if(e.keyCode == '13')
        getResult(input.value)
}

const getResult = (ip) => {
    let query = `https://geo.ipify.org/api/v2/country?apiKey=at_IRRuciinvf9zaCtyuCLLyi16XmSpM&ipAddress=${ip}`

    fetch(query)
    .then(res => res.json())
    .then(displayResult)
}

const displayResult = (res) => {
    if(res.code == 422){
        document.querySelector(".error-message").classList.add("active")
        setInterval(() => {
            document.querySelector(".error-message").classList.remove("active")
        }, 3000)
    }
    else{
        document.querySelector("#ipText").textContent = res.ip
        document.querySelector("#locationText").textContent = `${res.location.region}, ${res.location.country}`
        document.querySelector("#timeText").textContent = `UTC ${res.location.timezone}`
        document.querySelector("#nameText").textContent = res.isp
        input.value = ''
    }
    
}

const error = () => {
    console.error(error)
}

const success = position => {
    const { latitude, longitude } = position.coords
    var map = L.map('map').setView([latitude, longitude], 13);
    var customIcon = L.icon({
        iconUrl: './images/icon-location.svg',

        iconSize: [31, 37]
    })
    var marker = L.marker([latitude, longitude], {icon: customIcon}).addTo(map)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
}
navigator.geolocation.getCurrentPosition(success, error)

const arrowButton = document.querySelector(".arrow-container")

arrowButton.addEventListener('click', setQuery)
input.addEventListener('keypress', setQueryK)
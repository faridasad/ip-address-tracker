const API_KEY = 'at_IRRuciinvf9zaCtyuCLLyi16XmSpM'

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





const API_URL = `https://geo.ipify.org/api/v2/country?apiKey=at_IRRuciinvf9zaCtyuCLLyi16XmSpM&ipAddress=${CLIENT_IP}`

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



var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

export function initialData(){
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
  console.log(API_URL);

  const getData = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setData);
  };
  const setData = (res) => {
    console.log(res);
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
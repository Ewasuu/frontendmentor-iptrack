'use strict'
const APIFindIp = 'https://geo.ipify.org/api/v1?apiKey=at_pCjC9E3NTxb6899QYiaL8GUxD03FW&'
const ipAdress = document.getElementById('ip')
const form = document.querySelector('.header__form')
const reg = new RegExp(/([a-zA-Z]+)\.([a-zA-Z])+$/)
let mymap = L.map('mapid')
let ipFinded, param


let icon = L.icon({
        iconUrl : 'images/icon-location.svg',
    
        iconSize:     [40, 50], 
        iconAnchor:   [22, 94],   
        popupAnchor:  [-3, -76]
    })

const searcher = async (ipsearch = '')=>{
    reg.test(ipsearch)? param = 'domain=' : param = 'ipAddress='

    ipFinded = await fetch(`${APIFindIp}${param}${ipsearch}`).then(res => res.json())
    document.querySelector('.adress').textContent = ipFinded.ip
    document.querySelector('.location').textContent = ipFinded.location.city
    document.querySelector('.timezone').textContent = `UTC${ipFinded.location.timezone}`
    document.querySelector('.isp').textContent = ipFinded.isp
    
    mymap.setView([ipFinded.location.lat, ipFinded.location.lng], 13);
    
    
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZXdhc3UiLCJhIjoiY2t0N2ZoMGwwMHJvNjJvcGxkMDA4aXBoYyJ9.mDBsvVDCobzvsf8iBR3GTA'
    }).addTo(mymap);
    
    L.marker([ipFinded.location.lat, ipFinded.location.lng], {icon: icon}).addTo(mymap);
}

searcher()
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    searcher(ipAdress.value)
})


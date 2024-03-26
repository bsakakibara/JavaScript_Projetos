const key = "541701230dfe47eb3c970d5ff7d64680"
const inputCity = document.querySelector(".input-city")
const clickSearch = document.querySelector(".search")
const cityTxt = document.querySelector(".city")
const temperatureTxt = document.querySelector(".temperature")
const prevTxt = document.querySelector(".txt-prev")
const umddTxt = document.querySelector(".umdd")
const imgTemperature = document.querySelector(".img-temperature")



async function searchCity(inputCity){

    const dados = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${key}&lang=pt_br&units=metric`).then(response => response.json())
    
    dataScreen(dados)
}

function dataScreen(dados){

    cityTxt.innerHTML = `Cidade: ${dados.name}`
    temperatureTxt.innerHTML = `Temperatura: ${Math.floor (dados.main.temp)}°C`
    prevTxt.innerHTML = `${dados.weather[0].description}`
    umddTxt.innerHTML = `Umidade: ${dados.main.humidity}%`
    imgTemperature.src = `https://openweathermap.org//img/wn/${dados.weather[0].icon}.png`
}




clickSearch.addEventListener("click", () => 
    searchCity(inputCity)
    
)


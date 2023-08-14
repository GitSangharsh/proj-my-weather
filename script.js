const api = {
    key: "7bf5895be68c194a90e51e4d93fa930c",
    base: "https://api.openweathermap.org/data/2.5/",
}


const searchbox = document.querySelector(".searchbox")
searchbox.addEventListener("keypress", setQuery)

function setQuery(e){
    if(e.keyCode == 13){
        getResult(searchbox.value)
    }
}

function getResult(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json()
    }).then(displayResult)
}

function displayResult(weather){
    console.log(weather)
    let city = document.querySelector(".info .city")
    city.innerText = weather.name

    let now = new Date()
    let date = document.querySelector(".info .date")
    date.innerText = dateBuilder(now)

    let temp = document.querySelector(".current .degree")
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let fill = document.querySelector(".current .fill")
    fill.innerText = weather.weather[0].main

    let hilow = document.querySelector('.mix'); // Assuming the element has the class "mix"
    if (hilow) {
      hilow.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
    } else {
      console.error("Element with class 'mix' not found");
    }

}

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
}
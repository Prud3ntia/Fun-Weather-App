const api = {
    key: "8e6476101ccc9dd1d6b7fd6b2274c7a0",
    base: "https://api.openweathermap.org/data/2.5/",
};

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
btn.addEventListener("click", getInput);

function getInput(event) {
    event.preventDefault();
    if (event.type == "click") {
        getData(search.value);
        console.log(search.value);
    }
}

function getData() {
    fetch(`${api.base}weather?q=${search.value}&units=imperial&appid=${api.key}`)
        .then((response) => {
            return response.json();
        })
        .then(displayData);
}

function displayData(response) {
    //console.log(response);
    if (response.cod === "404") {
        const error = document.querySelector(".error");
        error.textContent = "Please enter a valid city";
        search.value = "";
    } else {
        const city = document.querySelector(".city");
        city.innerText = `${response.name}, ${response.sys.country}`;

        const today = new Date();
        const date = document.querySelector(".date");
        date.innerText = dateFunction(today);

        const temp = document.querySelector(".temp");
        temp.innerText = `Temperature: ${Math.round(response.main.temp)}°F`;

        const cloud = document.querySelector(".weather-type");
        cloud.innerText = `Sky: ${response.weather[0].main}`;

        const weatherIcon = document.querySelector(".weather-icon");
        const iconUrl = "http://openweathermap.org/img/w/";
        weatherIcon.src = iconUrl + response.weather[0].icon + ".png";

        search.value = "";
    }
}

function dateFunction(d) {
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let Days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let day = [d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${month}, ${day},  ${year}`;
}

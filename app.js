//DOM Elements
const time = document.getElementById("time"),
    greeting = document.getElementById("greeting"),
    names = document.getElementById("name"),
    focus = document.getElementById("focus");

// Show time

function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    //set AM or PM 
    //const amPm = hour >= 12 ? "PM" : "AM";
    //12hr Format
   // hour = hour % 12 || 12;
    //output time

    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

    setTimeout(showTime, 1000);
}
//Add zero
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}
//set background
function setBgGreet() {
    let today = new Date();
    
    hour = today.getHours();
    if (hour < 12) {
        // morning
        document.body.style.backgroundImage = "url('morning.jpg')";
        greeting.textContent = 'Good Morning';
    }
    else if (hour >= 12 && hour < 18) {

        //afternoon
        document.body.style.backgroundImage = "url('afternoon.jpg')";
        greeting.textContent = 'Good Afternoon';
    } else {
        //night
        document.body.style.backgroundImage = "url('night.jpg')";
        greeting.textContent = 'Good Evening';
        document.body.style.color = "white";
    }

}

//Get name 
function getName() {
    if (localStorage.getItem('names') === null) {
        names.textContent = '[Enter Name]';
    } else {
        names.textContent = localStorage.getItem('names');
    }

}
//set name
function setName(e) {
    if (e.type === 'keypress') {
        //Make sure enter is pressed
        if (e.which == 13 || e.ke) {
            localStorage.setItem("names", e.target.innerText);
            names.blur();
        }

    } else {

        localStorage.setItem("names", e.target.innerText);
    }


}
//Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Your Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }

}
//setFocus
function setFocus(e) {
    if (e.type === 'keypress') {
        //Make sure enter is pressed
        if (e.which == 13 || e.ke) {
            localStorage.setItem("focus", e.target.innerText);
            names.blur();
        }

    } else {

        localStorage.setItem("focus", e.target.innerText);
    }


}

// Weather
window.addEventListener("load", () => {
    let long;
    let lat;
   // let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let locationIcon = document.querySelector('.weather-icon');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = `http://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=b86fd8f7708187a762619d1377a88ec7`;
            //api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} //if you want it to be for 5 days just change after 2.5

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temp } = data.main;
                    //const { description } = data.weather[0];
                   const { icon } = data.weather[0];

                  
                    locationTimezone.textContent = data.name;
                   temperatureDegree.innerHTML = `${temp} <span>°C</span>`;
                   locationIcon.innerHTML = ` <img src="icons/${icon}.gif">`;

                });
        });

     

    }
    
    

});

names.addEventListener('keypress', setName);
names.addEventListener('blur', setName);

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

showTime();
setBgGreet();
getName();
getFocus();
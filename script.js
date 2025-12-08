(function setDays () {
    const today = new Date().getDay();
    const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const tomorrowName = document.querySelector('#tomorrow > h3');
    const dayAfterTomorrowName = document.querySelector('#after-tomorrow > h3');
    tomorrowName.textContent = dayNames[(today +1) % 7];
    dayAfterTomorrowName.textContent = dayNames[(today +2) % 7];
})();

function setCurrentConditions (data, units = '°C') {
    const { currentConditions: cond, days, address } = data;
    const currentIcon = document.querySelector('#current-img');
    const cityName = document.querySelector('#location');
    const sunrise = document.querySelector('#sunrise-time');
    const sunset = document.querySelector('#sunset-time');
    const temperature = document.querySelector('.temperature');
    const minTemp = document.querySelector('#min-temp');
    const maxTemp = document.querySelector('#max-temp');
    const humidity = document.querySelector('#humidity');
    const wind = document.querySelector('#wind-speed');
    const uv = document.querySelector('#uv');
    currentIcon.src = `./assets/${cond.icon}.svg`;
    currentIcon.alt = `Weather icon for ${cond.icon}`
    cityName.textContent = address.toUpperCase();
    sunrise.textContent = cond.sunrise;
    sunset.textContent = cond.sunset;
    temperature.textContent = `${cond.temp} ${units}`;
    minTemp.textContent = `MIN: ${days[0].tempmin} ${units}`;
    maxTemp.textContent = `MAX: ${days[0].tempmax} ${units}`;
    humidity.textContent = `HUMIDITY: ${cond.humidity} %`;
    wind.textContent = `WIND SPEED: ${cond.windspeed} KM/H`;
    uv.textContent = `UV INDEX: ${cond.uvindex}`;
}

function setNextDaysConditions (data, units = '°C') {
    const tomorrowImg = document.querySelector('#tomorrow-icon');
    const afterTomorrowImg = document.querySelector('#after-tomorrow-icon');
    const tomorrowTemps = document.querySelector('#tomorrow > p');
    const afterTomorrowTemps = document.querySelector('#after-tomorrow > p');
    tomorrowImg.src = `./assets/${data.days[1].icon}.svg`;
    tomorrowImg.alt = `Weather icon for ${data.days[1].icon}`
    afterTomorrowImg.src = `./assets/${data.days[2].icon}.svg`;
    afterTomorrowImg.alt = `Weather icon for ${data.days[2].icon}`
    tomorrowTemps.textContent = `${data.days[1].tempmax}/${data.days[1].tempmin} ${units}`;
    afterTomorrowTemps.textContent = `${data.days[2].tempmax}/${data.days[2].tempmin} ${units}`;
}

function setHourlyConditions (data, units = '°C') {
    const currentHour = new Date().getHours();
    const hourElements = [];
    const imgElements = [];
    const tempElements = [];
    const NUM_HOURS = 5;
    for (let i = 1; i <= NUM_HOURS; i++) {
        hourElements.push(document.querySelector(`#hour${i}`));
        imgElements.push(document.querySelector(`#img-hour${i}`));
        tempElements.push(document.querySelector(`#temp-hour${i}`));
    }
    for (let i = 0; i < NUM_HOURS; i++) {
        const offset = i + 1;
        let hourIndex = currentHour + offset;
        let dayIndex = 0;
        if (hourIndex >= 24) {
            dayIndex = 1;
            hourIndex -= 24;
        }
        const { datetime, icon, temp } = data.days[dayIndex].hours[hourIndex];
        hourElements[i].textContent = datetime.slice(0, 5);
        imgElements[i].src = `./assets/${icon}.svg`;
        imgElements[i].alt = `Weather icon for ${icon}`;
        tempElements[i].textContent = `${temp} ${units}`;
    }
}

async function getData(location = 'London') {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days%2Chours%2Ccurrent&key=3PA9H9QZZJQTPLF2FC4ZYDM6P&contentType=json`);
        if (!response.ok) {
            alert('Something went wrong. Please try again.');
            throw new Error(`Response status: ${response.status}`);
        }
        const allData = await response.json();
        setCurrentConditions(allData);
        setNextDaysConditions(allData);
        setHourlyConditions(allData);
    } catch (error) {
        console.log(error);
    }
}

getData();
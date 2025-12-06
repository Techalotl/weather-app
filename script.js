(function setDays () {
    const today = new Date().getDay();
    const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const tomorrowName = document.querySelector('#tomorrow > h3');
    const dayAfterTomorrowName = document.querySelector('#after-tomorrow > h3');
    tomorrowName.textContent = dayNames[(today +1) % 7];
    dayAfterTomorrowName.textContent = dayNames[(today +2) % 7];
})();

async function getData(location = 'London') {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days%2Chours%2Ccurrent&key=3PA9H9QZZJQTPLF2FC4ZYDM6P&contentType=json`);
        if (!response.ok) {
            alert('Something went wrong. Please try again.');
            throw new Error(`Response status: ${response.status}`);
        }
        const allData = await response.json();
    } catch (error) {
        console.log(error);
    }
}

getData();
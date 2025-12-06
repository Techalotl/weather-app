(function setDays () {
    const today = new Date().getDay();
    const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const tomorrowName = document.querySelector('#tomorrow > h3');
    const dayAfterTomorrowName = document.querySelector('#after-tomorrow > h3');
    tomorrowName.textContent = dayNames[(today +1) % 7];
    dayAfterTomorrowName.textContent = dayNames[(today +2) % 7];
})();
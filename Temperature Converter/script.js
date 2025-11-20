let temperature = document.getElementById('temp');
let dropdown = document.getElementById('drp');
let result = document.querySelector('#result');

function calculateTemp() {
    let unit = drp.value;
    let temp = temperature.value;
    let tempVal = 0;
    let tempUnit = '';
    if (unit == 'celcius') {
        tempVal = ((temp - 32) * 5 / 9).toFixed(2);
        tempUnit = '°C'
    } else if (unit == 'faranhit') {
        tempVal = ((temp * 1.8) + 32).toFixed(2);
        tempUnit = '°F'
    } else {
        result = ``;
    }
    result.textContent = `Coverted Temperature is : ${tempVal} ${tempUnit} `;
}
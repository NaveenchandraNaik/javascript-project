let weight = document.getElementById('weight');
let height = document.getElementById('height');
let result = document.getElementById('bmi');

let calculate = () => {
    let bmi = ((weight.value / (height.value * height.value))*100).toFixed(2);
    result.textContent = `Your BMI: ${bmi} kg/m2`;
    weight.value = '';
    height.value = '';
}
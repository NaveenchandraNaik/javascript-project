// ✅ Challenge 1: Click Counter with Reset
// Goal:
// Show a number that increments every time you click a button

// ✅ Challenge 2: Show/Hide Password Toggle

// Goal:
// Create a password input with a show/hide toggle icon or button

// Requirements:

// When toggle is clicked → password switches between "password" and "text" input types

let counter = document.querySelector('.counter');
let increment = document.querySelector('#increment');
let decrement = document.querySelector('#decrement');
let reset = document.querySelector('#reset');
let inputBox = document.querySelector('#pwd');
let count = 0;

counter.innerHTML = count;
increment.addEventListener('click', () => {
    count++;
    counter.innerHTML = count;
})
decrement.addEventListener('click', () => {
    count--;
    counter.innerHTML = count;
});
reset.addEventListener('click', () => {
    count = 0;
    counter.innerHTML = count;
})
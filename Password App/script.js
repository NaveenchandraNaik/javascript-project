let toggle = document.querySelector('#toggle');
let inputBox = document.querySelector('#pwd');
toggle.innerText = 'Show';

toggle.addEventListener('click', () => {
if(inputBox.type == 'password'){
    inputBox.type = 'text';
    toggle.innerText = 'Hide';
} else{
    inputBox.type = 'password'; 
    toggle.innerText = 'Show';
}
})
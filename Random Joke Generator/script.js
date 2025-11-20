let setup = document.createElement('p');
let punchline = document.createElement('b');
let jokeType = document.createElement('p')
let clickImg = document.querySelector('.click_img');
let jokediv = document.querySelector('.generate-joke');

const api_url = 'https://official-joke-api.appspot.com/random_joke';

async function randomJoke() {
    let response = await fetch(api_url);
    let data = await response.json();
    clickImg.style.display = 'none';
    jokeType.textContent = data.type;
    jokeType.classList.add('joke_type')
    setup.innerText = data.setup;
    setup.classList.add('setup');
    punchline.innerHTML = data.punchline;
    punchline.classList.add('punchline')
    jokediv.appendChild(jokeType);
    jokediv.appendChild(setup);
    jokediv.appendChild(punchline);
    console.log('Joke', data)
}
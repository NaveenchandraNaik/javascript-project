const apiKey = ' http://www.omdbapi.com/?i=tt3896198&apikey=3e321a69';
const apiKey_ID = 'http://www.omdbapi.com/?i';
const key = 'apikey=3e321a69';

const searchTerm = document.querySelector('#inputKey');
const movieCard = document.querySelector('.movie_card')
const movieCardContainer = document.querySelector('.movie_container');

const modal = document.querySelector('.modal');
const review = document.querySelector('.review');
movieCardContainer.style.display = 'flex';
movieCardContainer.innerHTML = 'Please enter a movie or TV show name';
movieCardContainer.classList.add('empty_input');
async function search() {
    movieCardContainer.innerHTML = ''
    const movieName = searchTerm.value;
    const loader = document.createElement('div');
    try {
        if (movieName === '') {
            movieCardContainer.style.display = 'flex';
            loader.classList.add('loader');
            movieCardContainer.append(loader);
            setTimeout(() => {
                loader.classList.remove('loader');
                const emptyInput = document.createElement('h3');
                emptyInput.classList.add('empty_input');
                emptyInput.textContent = 'Please enter a movie or TV show name';
                movieCardContainer.append(emptyInput);
                return
            }, 5000)

        }
        let response = await fetch(`${apiKey}&s=${movieName}`);
        let data = await response.json();
        let movie = data.Search;
        loader.classList.add('loader');
        movieCardContainer.append(loader);
        movieCardContainer.style.display = 'flex';
        setTimeout(() => {
            movie.forEach((movie) => {
                loader.classList.remove('loader');
                let cloneCard = movieCard.cloneNode(true);
                cloneCard.id = `${movie.imdbID}`
                cloneCard.querySelector('img').src = `${movie?.Poster}`;
                cloneCard.querySelector('.movie_name').textContent = `${movie?.Title} - ${movie?.Year}`;
                movieCardContainer.append(cloneCard);
                searchTerm.value = '';
                console.log('MV', movie)
            });
        }, 3000);
        console.log(data.Search)
    } catch (error) {
        console.log('Error fetching data:', error);
        loader.classList.remove('loader');
        const errorMessage = document.createElement('h3');
        errorMessage.classList.add('error_message');
        errorMessage.textContent = 'An error occurred while fetching data. Please try again later.';
        movieCardContainer.append(errorMessage);
    }
 
}

async function openModal(event) {
    let movieId = event.target.closest('.movie_card').id;
    console.log(movieId);
    modal.style.display = 'flex';
    review.innerHTML = '';
    let response = await fetch(`${apiKey_ID}=${movieId}&${key}`);
    let data = await response.json();
    console.log('Modal Data', data);
    document.querySelector('.title').textContent = data.Title;
    document.querySelector('.sub-info').textContent = `${data.Year} .${data.Rated} .${data.Runtime}`;
    document.querySelector('.genre').textContent = data.Genre;
    document.querySelector('.director').textContent = ` ${data.Director}`;
    document.querySelector('.writer').textContent = data.Writer;
    document.querySelector('.ratings').textContent = `⭐${data.imdbRating} / 10  🍅: ${data.Ratings[1]?.Value || ''}  Metacritic: ${data.Metascore || ''}  `;
    document.querySelector('.released').textContent = data.Released;

    document.querySelector('.plot').textContent = data.Plot;
    document.querySelector('.language').textContent = data.Language;
    document.querySelector('.modal-header img').src = `${data.Poster}`;
    document.querySelector('.modal-header').style.backgroundImage = `url(${data.Poster})`;
    document.querySelector('.award').textContent = data.Awards;
    document.querySelector('.box-office').textContent = data.BoxOffice;
    document.querySelector('.country').textContent = data.Country;
    document.querySelector('.language').textContent = data.Language;
    document.querySelector('.runtime').textContent = data.Runtime;
    document.querySelector('.rated').textContent = data.Rated;
    document.querySelector('.imdb-votes').textContent = `${data.imdbVotes} votes`;
    data.Ratings.forEach(rating => {

        let list = document.createElement('li');
        list.style.listStyleType = 'none'
        list.textContent = `${rating?.Source}:  ${rating?.Value}`;
        review.append(list);
    }
    );
}

function closeModal() {
    modal.style.display = 'none';
}
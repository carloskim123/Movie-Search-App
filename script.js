const searchBtn = document.getElementById('search');
const input = document.getElementById('movie');
const dataEl = document.getElementById('data');
const errEl = document.getElementById('err');
const form = document.getElementById('form');
const apiKey = "defb4d38";
let renderedMovies = [];
let canMakeRequest = true;

function fetchData() {
  input.focus();
  if (input.value && canMakeRequest) {
    canMakeRequest = false;
    const genre = document.getElementById('genre').value;
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${input.value}&type=movie&genre=${genre}`)
      .then(response => response.json())
      .then(data => {
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        if (!renderedMovies.includes(data.Title)) {
          renderedMovies.push(data.Title);
          dataEl.innerHTML += `
            <div id="movie-el">
              <img src="${data.Poster}"/>
              <div id="desc">
                <h3>Title: ${data.Title}</h3>
                <h3>Release date: ${data.Released}</h3>
                <h3>Actors: ${data.Actors}</h3>   
              </div>
            </div>
            <hr></hr>
          `;
        } else {
          const messageEl = document.createElement('p');
          messageEl.textContent = `${data.Title} has already been displayed!`;
          dataEl.appendChild(messageEl);
        }
        input.value = "";
      })
      .catch(error => {
        errEl.textContent = `We're sorry, the movie "${input.value}" was not found!`;
        errEl.style.display = "block";
        console.log(error);
      })
      .finally(() => {
        canMakeRequest = true;
      });
  }
}

// Call the function to execute the code
fetchData();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  errEl.textContent = ""; // Clear previous error message
  fetchData();
});

// Add genre filter element to the page
const genreEl = document.createElement('select');
genreEl.id = 'genre';
genreEl.innerHTML = `
  <option value="">All Genres</option>
  <option value="Action">Action</option>
  <option value="Comedy">Comedy</option>
  <option value="Drama">Drama</option>
  <option value="Horror">Horror</option>
  <option value="Romance">Romance</option>
`;
form.insertBefore(genreEl, input);

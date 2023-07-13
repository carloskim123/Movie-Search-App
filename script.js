const searchBtn = document.getElementById('search');
const input = document.getElementById('movie');
const dataEl = document.getElementById('data');
const errEl = document.getElementById('err');
const form = document.getElementById('form')
const apiKey = "defb4d38"
let renderedMovies = [];

function fetchData() {
  input.focus()
  if (input.value) {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${input.value}`)
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
        errEl.innerHTML = `<h3>We're sorry, the movie "${input.value}" was not found!</h3>`;
        console.log(error);
      });
  }
}

// Call the function to execute the code
fetchData()

form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchData()
})

export { fetchRequests, checkPosition };
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
const _ = require('lodash');
const DEBOUNCE_DELAY = 800;

const resetBtn = document.getElementById('resetBtn');
const [inputEL] = document.getElementsByClassName('search-form-input');
const genreFilter = document.getElementById('genreFilter');
const yearFilter = document.getElementById('yearFilter');
const sortFilter = document.getElementById('sortFilter');
const [searchBtn] = document.getElementsByClassName('search-btn');

const BASE_URL = 'https://api.themoviedb.org/3/search/movie?api_key=';
const API_KEY = 'adefa24b10a73766cd06123164c463e3';
let page = 1;
let genresArray = [];
//Creating and rendering markup in select YEAR
(function createSelectOptions() {
  let arrayYear = [];
  const date = new Date();
  for (let i = date.getFullYear(); i >= 1950; i -= 1) {
    arrayYear.push(
      `<option class = 'filter__form-years' value="${i}">${i}</option>`
    );
  }
  const elements = arrayYear.join('');
  yearFilter.insertAdjacentHTML('beforeend', elements);
})();

searchBtn.addEventListener('click', _.throttle(fetchRequests, DEBOUNCE_DELAY));

async function fetchRequests(e) {
  e.preventDefault();

  let feltchRequest = await axios.get(
    `${BASE_URL}${API_KEY}&page=${page}&query=${inputEL.value.trim()}`
  );
  console.log(feltchRequest);
  makeOneCard(feltchRequest.data.results[0]);
  // console.log(feltchRequest.data.results);
}

(async function getGenres() {
  genresArray = await axios.get(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=adefa24b10a73766cd06123164c463e3&language=en-US'
  );
});
console.log(genresArray);

// {
//   let genres = genresArray.data.genres;
//   // console.log(genresArray.data.genres);
//   let nameOfGenre = [];
//   genres.forEach(genre => {
//     console.log(`id:${genre.id}`);

//     if (genre.id === film) {
//       // genre = genre.name;
//       console.log(genre.name);
//       nameOfGenre.push(genre.name);
//     }
//   });
//   console.log(nameOfGenre);
//   return nameOfGenre;
// }

async function makeOneCard(oneFilm) {
  const { title, genre_ids, release_date: year, poster_path: poster } = oneFilm;
  let newGenderArray = [];
  if (genre_ids.length > 2) {
    let i = 0;
    while (i < 1) {
      newGenderArray.push(genre_ids[i]);
      console.log(genre_ids[i]);
      let test = await getGenres(genre_ids[i]);
      newGenderArray.push(test);

      i += 1;
    }
    newGenderArray[2] = 'Other';
  }

  let markup = `<li><img src="${poster}"><p>${title}</p><p><span></span></p></li>`;

  // console.log(newGenderArray);
}

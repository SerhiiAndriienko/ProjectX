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

  feltchRequest = await axios.get(
    `${BASE_URL}${API_KEY}&page=${page}&query=${inputEL.value.trim()}`
  );
  console.log(inputEL.value);
}

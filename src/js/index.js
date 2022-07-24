import fetchImages from './fetchImages';

const form = document.querySelector('.search-form');
const search = form.elements.searchQuery;

form.addEventListener('submit', searchImg);

function searchImg(e) {
  e.preventDefault();
  const value = search.value;
  fetchImages(value);
}

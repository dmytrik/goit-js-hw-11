import fetchImages from './fetchImages';

const form = document.querySelector('.search-form');
const search = form.elements.searchQuery;

form.addEventListener('submit', searchImg);

async function searchImg(e) {
  e.preventDefault();
  const value = search.value;
  const images = await fetchImages(value);
  console.log(images);
}

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './fetchImages';
import { defaultPage } from './fetchImages';
import { getTotalHits } from './fetchImages';

const form = document.querySelector('.search-form');
const search = form.elements.searchQuery;
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', searchImg);

window.addEventListener('scroll', () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    getImg();
  }
});

async function searchImg(e) {
  e.preventDefault();
  clearGallery();
  defaultPage();
  await getImg();
  const totalHits = getTotalHits();
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

async function getImg() {
  const images = await fetchImages(search.value);
  images.length === 0 ? searchError() : creatGallery(images);
  console.log(images);
}

function clearGallery() {
  gallery.innerHTML = '';
}

function searchError() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
function creatGallery(images) {
  const imagesHtml = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a href="${largeImageURL}">
        <div class = 'gallery-img-box'>
          <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
        </div>
        <div class="info">
            <div class="info-item">
              <p class='gallery-stats'>Likes</p>
              <p>${likes}</p>
            </div>
            <div class="info-item">
              <p class = 'gallery-stats'>Views</p>
              <p>${views}</p>
            </div>
            <div class="info-item">
              <p class = 'gallery-stats'>Comments</p>
              <p>${comments}</p>
            </div>
            <div class="info-item">
              <p class = 'gallery-stats'>Downloads</p>
              <p>${downloads}</p>
            </div>
          </div>
        </a>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', imagesHtml);
  new SimpleLightbox('.gallery a');
}

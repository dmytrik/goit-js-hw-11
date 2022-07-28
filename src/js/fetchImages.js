import { endImages } from './index';

const axios = require('axios').default;
const URL = 'https://pixabay.com/api/';
const KEY = '28811056-f3e78fd673175542d7021b7d4';

const options = {
  URL,
  KEY,
  page: 1,
  totalHits: null,
};

export function defaultPage() {
  options.page = 1;
}

export function getTotalHits() {
  return options.totalHits;
}

export function getCurrentPage() {
  return options.page;
}

export async function fetchImages(value) {
  const fetch = await axios({
    method: 'get',
    url: `${options.URL}?key=${options.KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${options.page}&per_page=40`,
  }).catch(() => {
    endImages();
    console.clear();
  });
  if (fetch !== undefined) {
    const data = await fetch.data;
    options.totalHits = data.totalHits;
    const images = await data.hits;
    options.page += 1;
    return images;
  }
}

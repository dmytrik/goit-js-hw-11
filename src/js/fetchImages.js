const axios = require('axios').default;
const URL = 'https://pixabay.com/api/';
const KEY = '28811056-f3e78fd673175542d7021b7d4';
export default async function fetchImages(value) {
  const fetch = await axios({
    method: 'get',
    url: `${URL}?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true`,
  });
  const data = await fetch.data;
  const images = await data.hits;
  return images;
}

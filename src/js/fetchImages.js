import axios from 'axios';
const URL = 'https://pixabay.com/api/';
const KEY = '28811056-f3e78fd673175542d7021b7d4';
export default async function fetchImages(value) {
  const images = await axios.get(
    `${URL}?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true`
  );
  console.log(images);
}

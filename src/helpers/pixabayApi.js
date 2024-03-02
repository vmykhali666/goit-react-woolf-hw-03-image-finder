import config from 'configs/pixabayConfig.json';
import axios from 'axios';

export class PixabayApi {
  pageCount = 1;
  #baseUrl;

  constructor() {
    this.#baseUrl = config.PIXABAY_URL;
  }

  fetchImages = async query => {
    const { PIXABAY_KEY, ImagesSettings } = config;
    const { image_type, orientation, per_page } = ImagesSettings;

    let parameters = {
      key: PIXABAY_KEY,
      q: query,
      image_type: image_type,
      orientation: orientation,
      safesearch: 'true',
      page: this.pageCount,
      per_page: per_page,
    };

    let requestUrl = this.#createRequestURL(parameters);
    return await axios.get(requestUrl).then(responce => {
      console.log(this.pageCount);
      return responce.data;
    });
  };

  increasePageCount = () => {
    this.pageCount += 1;
  };

  #createRequestURL(params) {
    return this.#baseUrl + '?' + new URLSearchParams(params);
  }

  resetPageCount = () => {
    this.pageCount = 1;
  };
}

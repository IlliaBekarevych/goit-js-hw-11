import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '27749026-40df02137ce148c7a01fdd112';

export class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
    this.totalPages = 0;
  }


  async onSearch() {
    const { data } = await axios.get(
      `${URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`
    );
    this.page += 1;

    return data;
  }

  totalPage() {
    this.totalPages = this.page * this.perPage;
    return this.totalPages;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

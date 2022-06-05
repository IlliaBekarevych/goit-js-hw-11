import './sass/main.scss';
import { Notify } from 'notiflix';
import { ImagesApiService } from './js/getimg';
import { markupCards } from './js/markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
export { gallery };

const formEl = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

const imagesApiService = new ImagesApiService();

const handleFormSubmit = async e => {
  try {
    e.preventDefault();
    clearGallery();
    btnLoadMore.classList.add('is-hidden');

    imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    imagesApiService.resetPage();

    if (imagesApiService.query === '') {
      Notify.warning('Please, enter a query!');
      btnLoadMore.classList.add('is-hidden');

      return;
    }

    const { hits, totalHits } = await imagesApiService.onSearch();

    if (hits.length === 0) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      formEl.reset();
    }

    if (hits.length > 1) {
      btnLoadMore.classList.remove('is-hidden');
      Notify.success(`Hooray!We found ${totalHits} images`);
      formEl.reset();
    }

    if (hits.length < 40) {
      btnLoadMore.classList.add('is-hidden');
    }

    markupCards(hits);

    let gallery = new SimpleLightbox('.gallery a');
    gallery.on('show.simplelightbox', () => {});
  } catch (error) {
    console.log(error);
  }
};

const handleLoadMoreClick = async () => {
  try {
    btnLoadMore.classList.add('is-hidden');
    const { hits, totalHits } = await imagesApiService.onSearch();

    markupCards(hits);

    if (hits.length > 1) {
      btnLoadMore.classList.remove('is-hidden');
      Notify.success(`Hooray!We found ${totalHits} images`);
    }

    if (imagesApiService.totalPage() > totalHits) {
      btnLoadMore.classList.add('is-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log(error);
  }
};

const clearGallery = () => {
  gallery.innerHTML = '';
};

formEl.addEventListener('submit', handleFormSubmit);
btnLoadMore.addEventListener('click', handleLoadMoreClick);

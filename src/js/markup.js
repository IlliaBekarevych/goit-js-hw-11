import { gallery } from '../index';

export const markupCards = hits => {
  const list = hits.map(
    ({ likes, views, comments, downloads, largeImageURL, webformatURL, tags }) => {
      return `<a class="link-wrap" href="${largeImageURL}">
<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}</p>
    <p class="info-item">
      <b>Views</b>${views}</p>
    <p class="info-item">
      <b>Comments</b>${comments}</p>
    <p class="info-item">
      <b>Downloads</b>${downloads}</p>
  </div>
</div>
</a>`;
    }
  );
  gallery.insertAdjacentHTML('beforeend', list.join(''));
};

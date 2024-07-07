import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function initializeLightbox() {
  lightbox = new SimpleLightbox('.gallery a');
}

export function refreshLightbox() {
  if (lightbox) {
    lightbox.refresh();
  }
}

export function renderImages(images, append = false) {
  const gallery = document.getElementById('gallery');

  const markup = images.map(image => {
    return `
      <a href="${image.largeImageURL}" class="gallery-item">
        <img src="${image.webformatURL}" alt="${image.tags}">
        <div class="info">
          <p>Likes: <span class="number">${image.likes}</span></p>
          <p>Views: <span class="number">${image.views}</span></p>
          <p>Comments: <span class="number">${image.comments}</span></p>
          <p>Downloads: <span class="number">${image.downloads}</span></p>
        </div>
      </a>
    `;
  }).join('');

  if (append) {
    gallery.insertAdjacentHTML('beforeend', markup);
  } else {
    gallery.innerHTML = markup;
  }
}



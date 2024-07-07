import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { searchImages } from './js/pixabay-api.js';
import { renderImages, initializeLightbox, refreshLightbox } from './js/render-functions.js';

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('search-input');
const loader = document.querySelector('.loader');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('loadMoreBtn');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

// Ініціализація SimpleLightbox
initializeLightbox();

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  currentQuery = searchInput.value.trim();

  if (!currentQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.'
    });
    return;
  }

  currentPage = 1;
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';

  try {
    showLoader();// Показати завантажувач перед запитом
    const images = await searchImages(currentQuery, currentPage);
    totalHits = images.totalHits;
    renderImages(images.hits); // Відобразити зображення в галереї

    if (images.hits.length > 0) {
      loadMoreBtn.style.display = 'block';
    }
// Очистити input після успішного пошука та рендерінга зображень
    searchInput.value = '';
    refreshLightbox(); // Оновити SimpleLightbox
    } catch (error) {
      console.error('Error searching images:', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images. Please try again later.'
      });
} finally {
      hideLoader(); // Приховати завантажувач після завершення запиту (незалежно від результату)
    }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;

  try {
    showLoader();
    const images = await searchImages(currentQuery, currentPage);
    renderImages(images.hits, true);

    if (currentPage * 15 >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results."
      });
    }

    refreshLightbox();
    smoothScroll();
  } catch (error) {
    console.error('Error loading more images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.'
    });
  } finally {
    hideLoader();
  }
});

function showLoader() {
  loader.style.display = 'block';
  gallery.innerHTML = ''; // Очистити галерею перед показом нових зображень
}

function hideLoader() {
  loader.style.display = 'none';
}
function smoothScroll() {
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
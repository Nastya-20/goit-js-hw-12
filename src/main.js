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

const PER_PAGE = 15; // Визначаємо константу для кількості елементів на сторінці

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

// Ініціалізація  SimpleLightbox
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
    showLoader(); // Показати завантажувач перед запитом
    const images = await searchImages(currentQuery, currentPage, PER_PAGE); //Передаємо PER_PAGE запиту API
    totalHits = images.totalHits;

    if (images.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!'
      });
      return;
    }

    renderImages(images.hits); // Рендеримо зображення в галереї

    if (images.hits.length > 0 && currentPage * PER_PAGE < totalHits) {
      loadMoreBtn.style.display = 'block';
    } else if (images.hits.length < PER_PAGE) {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results."
      });
    }

    // Очистити введені дані після успішного пошуку та відтворення зображень
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
    const images = await searchImages(currentQuery, currentPage, PER_PAGE); // Pass PER_PAGE to the API request
    renderImages(images.hits, true);

    if (currentPage * PER_PAGE >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results."
      });
    }

    refreshLightbox();
    smoothScroll(); // Функція виклику для плавної прокрутки
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
}

function hideLoader() {
  loader.style.display = 'none';
}

function smoothScroll() {
  const cardHeight = gallery.firstElementChild ? gallery.firstElementChild.getBoundingClientRect().height : 0;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

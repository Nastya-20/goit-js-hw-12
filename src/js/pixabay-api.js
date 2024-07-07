import axios from 'axios';

const apiKey = '44783480-725b805b80ef605c474d620ee';

export async function searchImages(query, page) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`;
  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

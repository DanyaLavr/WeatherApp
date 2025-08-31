import axios from 'axios';

export const fetchPictures = async () => {
  try {
    const res = await axios.get(
      `https://pixabay.com/api?key=${import.meta.env.VITE_PIXABAY_API_KEY}&q=nature`
    );
    return res.data.hits;
  } catch (error) {
    console.log(error);
  } finally {
  }
};

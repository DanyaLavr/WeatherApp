import { createBem } from '@/utils/createBem';
import styles from './news.module.scss';
import { useEffect, useState } from 'react';
const bem = createBem('news', styles);
import NewsItem from '@/components/NewsItem';
import Loader from '@/components/loader/Loader';

import { fetchNews } from '@/api/fetchNews';
import { useLoading } from '@/hooks/useLoading';

const News = () => {
  const [pageCards, setPageCards] = useState(1);
  const [news, setNews] = useState([]);
  const [isLoading, handleLoading, error, handleError, resetError] = useLoading();

  const handleIncrement = () => {
    setPageCards((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      resetError();
      handleLoading(true);
      try {
        const data = await fetchNews(pageCards);
        setNews([...news, ...data] || []);
      } catch (error) {
        console.error('Error fetching news:', error);
        handleError();
      } finally {
        handleLoading(false);
      }
    };

    fetchData();
  }, [pageCards]);

  return (
    <section className={bem('section')}>
      <div className="container">
        <h1 className={bem('title')}>Interacting with our pets</h1>
        {news.length !== 0 && (
          <>
            <ul className={bem('list')}>
              {news.map((item, index) => (
                <NewsItem title={item.title} image={item.urlToImage} url={item.url} key={index} />
              ))}
            </ul>
            <button type="button" className={bem('button')} onClick={handleIncrement}>
              See more
            </button>
          </>
        )}
        {isLoading && <Loader />}
        {error && error}
      </div>
    </section>
  );
};

export default News;

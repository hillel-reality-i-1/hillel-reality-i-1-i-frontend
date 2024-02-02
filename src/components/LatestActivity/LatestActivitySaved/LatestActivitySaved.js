import { useEffect, useState } from 'react';
import { useGetUserDataQuery } from '../../../store/services/userApi';
import Card from '../../Card/Card';
import styles from './LatestActivitySaved.module.scss';

const LatestActivitySaved = () => {
  const [postDetails, setPostDetails] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(5); // Установите начальное значение видимых постов
  const { data, error, isLoading, refetch } = useGetUserDataQuery();

  useEffect(() => {
    if (data && data.saved_posts) {
      // Ограничьте массив сохраненных постов видимыми постами
      setPostDetails(data.saved_posts.slice(0, visiblePosts));
    }
  }, [data, visiblePosts]);

  const handleNextPage = () => {
    // Увеличьте количество видимых постов на 5
    setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 5);
  };

  console.log(postDetails);

  return (
    <div className={styles.activity_saved_container}>
      {postDetails.length > 0 ? (
        postDetails.map((posts, index) => (
          <Card key={index} posts={posts} bgColor={{ backgroundColor: styles.backgroundCardColor }} />
        ))
      ) : null}
      <div className={styles.button_see_more_wrapper}>
        {postDetails.length === visiblePosts && (
          <button className={styles.button_see_more} onClick={handleNextPage}>
            Дивитися більше
          </button>
        )}
      </div>

    </div>
  );
};

export default LatestActivitySaved;

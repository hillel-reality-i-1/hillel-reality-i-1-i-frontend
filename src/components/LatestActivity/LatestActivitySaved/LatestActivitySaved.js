import { useEffect, useState } from 'react';
import { useGetUserDataQuery } from '../../../store/services/userApi';

import TubInfo from '../TubInfo/TubInfo';
import Card from '../../Card/Card';
import styles from './LatestActivitySaved.module.scss';

const LatestActivitySaved = () => {
  const [postDetails, setPostDetails] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(5); 
  const { data, error, isLoading, refetch } = useGetUserDataQuery();

  useEffect(() => {
    if (data && data.saved_posts) {
      setPostDetails(data.saved_posts.slice(0, visiblePosts));
    }
  }, [data, visiblePosts]);

  const handleNextPage = () => {
    setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 5);
  };

  return (
    <>
      {
        postDetails.length > 0 && (
          <div className={styles.activity_saved_container}>
            {postDetails.map((posts, index) => (
              <Card key={index} posts={posts} bgColor={{ backgroundColor: styles.backgroundCardColor }} />
            ))}
            <div className={styles.button_see_more_wrapper}>
              {postDetails.length === visiblePosts && (
                <button className={styles.button_see_more} onClick={handleNextPage}>
                  Дивитися більше
                </button>
              )}
            </div>
          </div>
        )
      }

      {
        postDetails.length === 0
          ? <TubInfo
            text={'У вас ще немає жодного збереженого допису. Будь ласка, взаємодійте з дописами на Головній сторінці.'}
          />
          : null
      }
    </>
  );
};

export default LatestActivitySaved;

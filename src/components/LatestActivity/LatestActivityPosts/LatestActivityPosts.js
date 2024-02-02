import { Button } from 'antd';
import Card from '../../Card/Card';
import styles from './LatestActivityPosts.module.scss';
import { useEffect, useState } from 'react';
import { useGetUserDataQuery } from '../../../store/services/userApi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BlueButton from '../../buttons/BlueButton/BlueButton';

const LatestActivityPosts = () => {
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [postDetails, setPostDetails] = useState([]);
  const [shownPosts, setShownPosts] = useState([]);
  const { data, error, isLoading, refetch } = useGetUserDataQuery();
  const navigate = useNavigate();

  const handlePostCreation = () => {
    navigate('/postCreationPage');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = data.last_posts.map((number) =>
          axios.get(`http://dmytromigirov.space/api/v1/content/post/${number}`, {
            headers: {
              'Authorization': `Token ${localStorage.getItem('authTokenUHelp')}`,
            },
          })
        );

        const responses = await Promise.all(requests);
        const sortedPostDetails = responses.map((response) => response.data).sort((a, b) => b.id - a.id);

        setPostDetails(sortedPostDetails);
        setShownPosts(sortedPostDetails.slice(0, visiblePosts));
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchData();
  }, [data.last_posts, visiblePosts]);

  const handleNextPage = () => {
    const nextVisiblePosts = visiblePosts + 5;
    setShownPosts(postDetails.slice(0, nextVisiblePosts));
    setVisiblePosts(nextVisiblePosts);
  };

  const handleVerify = () => {
    navigate('/verifyCodeForm')
  }; 

  console.log(shownPosts)

  return (
    <>
      {
        <div className={styles.post_block}>
          {
            data.phone_verified === true &&
            shownPosts.map((posts, index) => (
              <div key={index}>
                <Card posts={posts} bgColor={{ backgroundColor: styles.backgroundCardColor }} />
              </div>
            ))
          }
        </div>
      }

      {visiblePosts < postDetails.length && (
        <button className={styles.button_see_more} onClick={handleNextPage}>
          Дивитися більше
        </button>
      )}

      {data.phone_verified === false && (
        <div className={styles.activity_posts_container}>
          <p className={styles.posts_description}>
            Створювати дописи можуть тільки верифіковані користувачі. Будь ласка, верифікуйте свій профіль, щоб ділитися досвідом та знаннями.
          </p>
          <BlueButton text={'Верифікувати профіль'} onClick={handleVerify} additionalStyles={styles.posts_button} />
        </div>
      )}

      {data.phone_verified === true && postDetails.length === 0 && (
        <div className={styles.activity_posts_container}>
          <p className={styles.posts_description}>
            У вас ще немає жодного допису. Поділіться знаннями та досвідом з іншими користувачами.
          </p>
          <BlueButton text={'Створити допис'} onClick={handlePostCreation} additionalStyles={styles.posts_button} />
        </div>
      )}
    </>
  );
};

export default LatestActivityPosts;

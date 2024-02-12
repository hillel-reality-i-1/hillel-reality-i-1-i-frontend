import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import Card from '../../Card/Card';
import styles from './LatestActivityPosts.module.scss';
import axios from 'axios';
import { URL_GET_POST } from '../../../config/API_url';
import { useNavigate } from 'react-router-dom';
import BlueButton from '../../buttons/BlueButton/BlueButton';

const LatestActivityPosts = ({ data }) => {
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [postDetails, setPostDetails] = useState([]);
  const [shownPosts, setShownPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [data.last_posts, visiblePosts, navigate]);

  const handlePostCreation = async () => {
    navigate('/postCreationPage');
    
    await fetchData();
  };

  const fetchData = async () => {
    try {
      const requests = data?.last_posts.map((number) =>
        axios.get(`${URL_GET_POST}${number}`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('authTokenUHelp')}`,
          },
        })
      );

      if (!requests) return;

      const responses = await Promise.all(requests);
      const sortedPostDetails = responses.map((response) => response.data).sort((a, b) => b.id - a.id);

      setPostDetails(sortedPostDetails);
      setShownPosts(sortedPostDetails.slice(0, visiblePosts));
    } catch (error) {
      console.error('Error fetching post details:', error);
    
    }
  };

  

  const handleNextPage = () => {
    const nextVisiblePosts = visiblePosts + 5;
    setShownPosts(postDetails.slice(0, nextVisiblePosts));
    setVisiblePosts(nextVisiblePosts);
  };

  return (
    <>
      <div className={styles.post_block}>
        {shownPosts.map((posts, index) => (
          <div key={index}>
            <Card posts={posts} bgColor={{ backgroundColor: styles.backgroundCardColor }} />
          </div>
        ))}
      </div>

      {visiblePosts < postDetails.length && (
        <button className={styles.button_see_more} onClick={handleNextPage}>
          Дивитися більше
        </button>
      )}

      {data?.last_posts.length === 0 ? (
        <div className={styles.activity_posts_container}>
          <p className={styles.posts_description}>
            {`У вас ще немає жодного допису. Поділіться знаннями та досвідом з іншими користувачами.`}
          </p>
          <BlueButton text={'Створити допис'} onClick={handlePostCreation} additionalStyles={styles.posts_button} />
        </div>
      ) : null}
    </>
  );
};

export default LatestActivityPosts;

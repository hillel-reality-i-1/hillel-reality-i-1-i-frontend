import Footer from '../../components/Footer/Footer';
import styles from './PostDetailsPage.module.scss';
import arrow_back from '../../assets/img/icons/icons-SignUp/arrow_back.svg';
import ButtonBack from '../../components/ButtonBack/ButtonBack';
import Post from '../../components/Content/Post/Post';
import Comments from '../../components/Content/Comments/Comments';
import Contributions from '../../components/Content/Contributions/Contributions';

const PostDetailsPage = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			<div className={styles.container}>
				<ButtonBack customClassButton={styles.customClassButton}>
					<span className={styles.btn_inner}>
						<img
							src={arrow_back}
							alt='Arrow left'
							className={styles.icon_back}
						/>
						Повернутися на Головну
					</span>
				</ButtonBack>
				<div className={styles.post_details_wrapper}>
					<div className={styles.main_content}>
						<Post />
						{/* <Comments /> */}
					</div>
					<Contributions />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default PostDetailsPage;

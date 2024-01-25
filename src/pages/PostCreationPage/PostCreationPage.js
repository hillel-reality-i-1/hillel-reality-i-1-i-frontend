// import PostCreationAside from '../../components/Content/PostCreationAside/PostCreationAside';
import PostCreationForm from '../../components/Content/PostCreationForm/PostCreationForm';
import styles from './PostCreationPage.module.scss';

const PostCreationPage = () => {
	return (
		<div className={styles.container}>
			<p className={styles.name_page}>Новий допис</p>
			<PostCreationForm />
		</div>
	);
};

export default PostCreationPage;

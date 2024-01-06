import Card from '../Card/Card';
import styles from './ContentSection.module.scss';

const ContentSection = () => {
	return (
		<div className={styles.container}>
			<Card />
			<Card />
			<Card />
			<button className={styles.btn_see_more}>See more</button>
		</div>
	);
};

export default ContentSection;

import SortingPanel from '../SortingPanel/SortingPanel';
import styles from './Contributions.module.scss';

const Contributions = () => {
	return (
		<aside className={styles.container}>
			<h4 className={styles.title_contributions}>Внески</h4>
			<p className={styles.description_contributions}>
				Внески — це коментарі, що отримали найбільше позначок «Корисно», щоб користувачі швидше
				побачили важливу інформацію в U-Help.
			</p>
			<SortingPanel />
			<div className={styles.contributions_wrapper}>
				<p className={styles.contributions_wrapper_empty}>На жаль, поки немає внесків.</p>
			</div>
		</aside>
	);
};

export default Contributions;

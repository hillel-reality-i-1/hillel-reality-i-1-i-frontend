import styles from './SortingPanel.module.scss';

const SortingPanel = ({ nameResult, count }) => {
	return (
		<div className={styles.sorting_panel}>
			<p className={styles.left_col}>
				{count} {nameResult}
			</p>
		</div>
	);
};

export default SortingPanel;

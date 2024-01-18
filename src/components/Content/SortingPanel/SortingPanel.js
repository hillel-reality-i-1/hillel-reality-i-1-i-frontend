import icon_arrow_down from '../../../assets/img/icons/post/icon_arrow_down.svg';

import styles from './SortingPanel.module.scss';

const SortingPanel = () => {
	return (
		<div className={styles.sorting_panel}>
			<p className={styles.left_col}>0 внесків</p>
			<p className={styles.right_col}>
				Сортувати за
				<div className={styles.select_sort}>
					<span className={styles.blue_text}>Спершу нові</span>
					<img
						src={icon_arrow_down}
						alt='Arrow'
					/>
				</div>
			</p>
		</div>
	);
};

export default SortingPanel;

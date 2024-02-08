import icon_arrow_down from '../../../assets/img/icons/post/icon_arrow_down.svg';

import styles from './SortingPanel.module.scss';

const SortingPanel = ({ nameResult, count }) => {
	return (
		<div className={styles.sorting_panel}>
			<p className={styles.left_col}>
				{count} {nameResult}
			</p>
			{/* <div className={styles.right_col}>
				Сортувати за
				<div className={styles.select_sort}>
					<span className={styles.blue_text}>Спершу нові</span>
					<img
						src={icon_arrow_down}
						alt='Arrow'
					/>
				</div>
			</div> */}
		</div>
	);
};

export default SortingPanel;

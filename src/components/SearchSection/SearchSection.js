import { useTranslation } from 'react-i18next';

import styles from './search.module.scss';

const SearchSection = ({ onSearch }) => {
	const { t } = useTranslation();

	// console.log('onSearch', onSearch);
	onSearch('search');

	return (
		<section className={styles.search}>
			<div className={styles.search__wrapper}>
				<div>
					<h1 className={styles.search__title}> {t('heading')} </h1>
				</div>
			</div>
		</section>
	);
};

export default SearchSection;

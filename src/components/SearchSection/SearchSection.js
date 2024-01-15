import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button, ConfigProvider, Input, Select } from 'antd';
import { ReactComponent as IconSearch } from '../../assets/img/icons/icon-search-bar/icon_search.svg';
import styles from './SearchSection.module.scss';

const SearchSection = ({ onSearch }) => {
	const { t } = useTranslation();

	// console.log('onSearch', onSearch);
	onSearch('search');

	const options = [];
	for (let i = 0; i < 100000; i++) {
		const value = `${i.toString(36)}${i}`;
		options.push({
			label: value,
			value,
			disabled: i === 10,
		});
	}
	const handleChange = (value) => {
		// console.log(`selected ${value}`);
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		// validate: validateSignInForm,
		// onSubmit: handleSignIn,
	});

	return (
		<section className={styles.search}>
			<div className={styles.search_container_content}>
				<h1 className={styles.search_title}> {t('heading')} </h1>
				<div className={styles.search_bar}>
					<form
						className={styles.form}
						onSubmit={formik.handleSubmit}>
						<div className={styles.select_wrapper}>
							<ConfigProvider
								theme={{
									components: {
										// Select: { optionPadding: 20px 30px },
									},
									token: {
										borderRadius: '48px 0 0 48px',
									},
								}}>
								{' '}
								<Select
									mode='multiple'
									bordered={false}
									style={{
										width: '200px',
										height: '100%',
									}}
									className={styles.select_country}
									placeholder='Select country'
									// defaultValue={['a10', 'c12']}
									onChange={handleChange}
									options={options}
								/>
							</ConfigProvider>
						</div>
						<ConfigProvider
							theme={{
								components: {
									// Select: { optionPadding: 20px 30px },
								},
								token: {
									borderRadius: 0,
								},
							}}>
							<Input
								bordered={false}
								placeholder='Search by word, author’s name, username…'
							/>
						</ConfigProvider>
						<div className={styles.search_wrapper_right}>
							<div className={styles.select_wrapper}>
								<ConfigProvider
									theme={{
										components: {
											// Select: { optionPadding: 20px 30px },
										},
										token: {
											borderRadius: 0,
										},
									}}>
									<Select
										mode='multiple'
										bordered={false}
										style={{
											width: '200px',
											height: '100%',
										}}
										className={styles.select_category}
										placeholder='Select category'
										// defaultValue={['a10', 'c12']}
										onChange={handleChange}
										options={options}
									/>
								</ConfigProvider>
							</div>
							<Button
								className={styles.btn_search}
								type='primary'
								shape='circle'
								icon={<IconSearch />}
							/>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default SearchSection;

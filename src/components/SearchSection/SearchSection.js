import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button, ConfigProvider, Input, Select } from 'antd';
import { ReactComponent as IconSearch } from '../../assets/img/icons/icon-search-bar/icon_search.svg';
import styles from './SearchSection.module.scss';
import axios from '../../config/axios/axios';
import { URL_PROF_CATEGORIES } from '../../config/API_url';
import { useEffect, useState } from 'react';

// const tagRender = (props) => {
// 	const { countryId, label, value, closable, onClose } = props;
// 	const onPreventMouseDown = (event) => {
// 		event.preventDefault();
// 		event.stopPropagation();
// 	};
// 	console.log('countryId', countryId);
// 	// const countryiesLength = countryId?.length;

// 	// const isLimitLength = !(countryiesLength > 1);
// 	// console.log(countryiesLength, isLimitLength);
// 	console.log(label, value);

// 	return (
// 		<Tag
// 			// color={value}
// 			onMouseDown={onPreventMouseDown}
// 			// closable={closable}
// 			// onClose={onClose}
// 			// style={{
// 			// 	marginRight: 3,
// 			// }}
// 		>
// 			{label}
// 			{console.log(label)}
// 			{/* {isLimitLength ? { label } : `${countryId.length} countries`} */}
// 		</Tag>
// 	);
// };

const SearchSection = ({ onSearch }) => {
	const { t } = useTranslation();
	const [profCategories, setProfCategories] = useState(null);
	const [countryId, setCountryId] = useState(null);
	const [profCategoriesId, setProfCategoriesId] = useState(null);

	// const tagRender = (props) => {
	// 	const { countryId, label, value } = props;
	// const onPreventMouseDown = (event) => {
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// };
	// console.log('countryId', countryId);
	// const countryiesLength = countryId?.length;

	// const isLimitLength = !(countryiesLength > 1);
	// console.log(countryiesLength, isLimitLength);
	// console.log(label, value);
	// console.log('countryiesLength', countryiesLength);

	// return <Tag style={{ opacity: 1 }}>'Errrrr'</Tag>;
	// isLimitLength ? (
	// 	<Tag
	// 		// color={value}
	// 		onMouseDown={onPreventMouseDown}
	// 		// closable={closable}
	// 		// onClose={onClose}
	// 		// style={{
	// 		// 	marginRight: 3,
	// 		// }}
	// 	>
	// 		{label}

	// 		{/* {isLimitLength ? { label } : `${countryId.length} countries`} */}
	// 	</Tag>
	// ) : (
	// <Tag>countryiesLength 'countries'</Tag>

	// );
	// };
	const optionsCountry =
		// : SelectProps['options']
		[
			{
				label: 'Чехія',
				value: 1,
			},
			{
				label: 'Німеччина',
				value: 2,
			},
			{
				label: 'Польща',
				value: 4,
			},
			// {
			// 	label: 'Україна',
			// 	value: 5,
			// },
			{
				label: 'Велика Британія',
				value: 3,
			},
		];

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const data = await axios.get(URL_PROF_CATEGORIES);
				// changing object keys for use in selects
				const categoryChangedKeys = data.map(({ id, name }) => ({ value: id, label: name }));

				setProfCategories(categoryChangedKeys);
			} catch (error) {
				return error.message;
			}
		};

		fetchCategories();
	}, []);

	const handleChangeCountry = (value) => {
		// console.log(`selected ${value}`);
		setCountryId(value);
		// onSearch(countryId, profCategoriesId);
		// optionsCountry.push({
		// 	label: value,
		// 	value,
		// });
	};

	// console.log(countryId);

	const handleChangeCategory = (value) => {
		// console.log(`selectedCategory ${value}`);
		setProfCategoriesId(value);
		// onSearch(countryId, profCategoriesId);
	};

	const onSubmit = () => {
		onSearch({
			countryId: countryId || null,
			profCategoriesId: profCategoriesId || null,
			query: formik.values.query || null,
		});
	};

	const formik = useFormik({
		initialValues: {
			country: null,
			query: '',
			cotegory: null,
		},

		onSubmit,
	});

	return (
		<section className={styles.search}>
			<div className={styles.search_container_content}>
				<h1 className={styles.search_title}> {t('heading')} </h1>
				<div className={styles.search_bar}>
					<form
						className={styles.form}
						onSubmit={formik.handleSubmit}>
						{/* select country============================================/ */}

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
								<Select
									mode='multiple'
									name='country'
									// mode='tags'
									// tagRender={'tagRender'}
									maxTagCount={1}
									filterOption={false}
									bordered={false}
									style={{
										width: '200px',
										height: '100%',
									}}
									className={styles.select_country}
									placeholder='Select country'
									onChange={handleChangeCountry}
									options={optionsCountry}
									// value={countryId}
								/>
							</ConfigProvider>
						</div>

						{/* input search============================================/ */}

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
								type='text'
								name='query'
								bordered={false}
								placeholder='Search by word, author’s name, username…'
								maxLength='100'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.query}
							/>
						</ConfigProvider>
						<div className={styles.search_wrapper_right}>
							{/* select category============================================/ */}

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
										name='category'
										mode='multiple'
										maxTagCount={1}
										bordered={false}
										style={{
											width: '200px',
											height: '100%',
										}}
										className={styles.select_category}
										placeholder='Select category'
										// defaultValue={['a10', 'c12']}
										onChange={handleChangeCategory}
										options={profCategories}
										// fieldNames={{ label: profCategories?.name, value: profCategories?.id }}
										// onChange={formik.handleChangeCategory}
										// onBlur={formik.handleBlur}
										// value={profCategoriesId}
									/>
								</ConfigProvider>
							</div>
							<Button
								htmlType='submit'
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

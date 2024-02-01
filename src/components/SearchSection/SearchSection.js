import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button, Checkbox, ConfigProvider, Input, Select } from 'antd';
import { ReactComponent as IconSearch } from '../../assets/img/icons/icon-search-bar/icon_search.svg';
import styles from './SearchSection.module.scss';
import axios from '../../config/axios/axios';
import { URL_PROF_CATEGORIES } from '../../config/API_url';
import { useEffect, useState } from 'react';

const SearchSection = ({ onSearch }) => {
	const { t } = useTranslation();
	const [profCategories, setProfCategories] = useState(null);
	const [countryId, setCountryId] = useState(null);
	const [profCategoriesId, setProfCategoriesId] = useState(null);
	const [selectedLabels, setSelectedLabels] = useState(null);
	const [categorySelectedLabels, setCategorySelectedLabels] = useState(null);

	const selectAllOption = {
		label: 'Обрати всі',
		value: 'all',
	};

	const optionsCountry = [
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
				setProfCategories([selectAllOption, ...categoryChangedKeys]);
			} catch (error) {
				return error.message;
			}
		};

		fetchCategories();
	}, []);

	const handleChangeCountry = (value, option) => {
		setCountryId(value);

		setSelectedLabels(option);

		// console.log(option);
	};

	const handleChangeCategory = (value, option) => {
		console.log(value, option);
		setProfCategoriesId(value);
		setCategorySelectedLabels(option);
		// if (value.includes('all')) {
		// 	setProfCategoriesId(profCategories.map((category) => category.value));
		// 	setCategorySelectedLabels(profCategories);
		// } else {
		// 	setProfCategoriesId(value.filter((v) => v !== 'all'));
		// 	setCategorySelectedLabels(option);
		// }
	};

	const optionRenderCategory = (option) => {
		// if (option.value === 'all') {
		// 	return (
		// 		<Checkbox
		// 			onChange={(e) =>
		// 				handleChangeCategory(
		// 					e.target.checked ? profCategories.map((category) => category.value) : []
		// 				)
		// 			}>
		// 			{option.label}
		// 		</Checkbox>
		// 	);
		// }
		// return (
		// 	<Checkbox
		// 		value={option.value}
		// 		onChange={() => handleChangeCategory([option.value])}>
		// 		{option.label}
		// 	</Checkbox>
		// );

		const onCheckAllChange = (value) => {
			console.log(value);
		};

		return (
			<Checkbox
			// value={selectAllOption.value}
			// onChange={onCheckAllChange}
			// checked={selectAllOption.label}
			>
				Обрати всі
			</Checkbox>
		);
	};

	const countryTagRender = () => {
		console.log(selectedLabels);

		if (selectedLabels.length === 1) {
			return <div className={styles.selected_value}>{selectedLabels[0].label}</div>;
		} else {
			return <div className={styles.selected_value}>{selectedLabels.length} країни</div>;
		}
	};

	const categoryTagRender = () => {
		console.log(selectedLabels);
		if (categorySelectedLabels?.length === 1) {
			return <div className={styles.selected_value}>{categorySelectedLabels[0].label}</div>;
		} else {
			return <div className={styles.selected_value}>{categorySelectedLabels.length} категорій</div>;
		}
	};

	const onSubmit = () => {
		if (countryId || profCategoriesId || formik.values.query) {
			onSearch({
				countryId: countryId || null,
				profCategoriesId: profCategoriesId || null,
				query: formik.values.query || null,
			});
		}
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
									tagRender={countryTagRender}
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
										tagRender={categoryTagRender}
										optionRender={optionRenderCategory}
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

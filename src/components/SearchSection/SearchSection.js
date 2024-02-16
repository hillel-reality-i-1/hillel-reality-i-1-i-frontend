import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button, ConfigProvider, Input, Select } from 'antd';
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
	const [selectedLabels, setSelectedLabels] = useState([]);
	const [categorySelectedLabels, setCategorySelectedLabels] = useState([]);
	const [selectAllChecked, setSelectAllChecked] = useState(false);

	// const selectAllOption = {
	// 	label: 'Обрати всі',
	// 	value: 'all',
	// };

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
				// setProfCategories([selectAllOption, ...categoryChangedKeys]);
				setProfCategories(categoryChangedKeys);
			} catch (error) {
				return error.message;
			}
		};

		fetchCategories();
	}, []);

	const handleChangeCountry = (value, option) => {
		setCountryId(value);
		setSelectedLabels(option);
	};

	const handleChangeCategory = (value, option) => {
		if (value.includes('all')) {
			setSelectAllChecked(!selectAllChecked);

			if (selectAllChecked) {
				setProfCategoriesId([]);
				setCategorySelectedLabels([]);
			} else {
				setProfCategoriesId(profCategories.map((category) => category.value));
				setCategorySelectedLabels(profCategories.slice(1)); // Exclude "Select All" option
			}
		} else {
			setProfCategoriesId(value);
			setCategorySelectedLabels(option.filter((opt) => opt.value !== 'all'));
		}
	};

	const optionRenderCategory = (option) => {
		return option.value === 'all' ? (
			<div
				onClick={() => handleChangeCategory([option.value], [option])}
				checked={selectAllChecked}>
				{option.label}
			</div>
		) : (
			<div
				className={styles.list_item}
				onClick={() => handleChangeCategory([option.value], [option])}>
				{option.label}
			</div>
		);
	};

	const countryTagRender = () => {
		if (selectedLabels.length === 1) {
			return <div className={styles.selected_value}>{selectedLabels[0].label}</div>;
		} else {
			return <div className={styles.selected_value}>{selectedLabels.length} країни</div>;
		}
	};

	const categoryTagRender = () => {
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

				<form
					className={styles.form}
					onSubmit={formik.handleSubmit}>
					<div className={styles.select_container_mobile}>
						{/* mobile select country============================= */}
						<div className={styles.select_wrapper_mobile}>
							<ConfigProvider
								theme={{
									components: {
										// Select: { optionPadding: 20px 30px },
									},
									token: {
										// borderRadius: '48px 0 0 48px',
										colorTextPlaceholder: '#47474F',
										colorText: '#47474F',
										fontSize: 16,
										lineHeight: '160%',
									},
								}}>
								<Select
									mode='multiple'
									name='country'
									maxTagCount={1}
									filterOption={false}
									bordered={false}
									style={{
										width: '100%',
										// height: '100%',
									}}
									className={styles.select_country}
									placeholder='Обрати країну'
									onChange={handleChangeCountry}
									options={optionsCountry}
									tagRender={countryTagRender}
								/>
							</ConfigProvider>
						</div>
						{/* ============================= */}
						{/* select mobile category ========================= */}
						<div className={styles.select_wrapper_mobile}>
							<ConfigProvider
								theme={{
									components: {
										// Select: { optionPadding: 20px 30px },
										// Tooltip: { color: 'red' },
									},
									token: {
										// borderRadius: '48px 0 0 48px',
										colorTextPlaceholder: '#47474F',
										colorText: '#47474F',
										fontSize: 16,
										lineHeight: '160%',
									},
								}}>
								<Select
									name='category'
									mode='multiple'
									maxTagCount={1}
									bordered={false}
									filterOption={false}
									placement='bottomRight'
									style={{
										width: '100%',
										// height: '100%',
									}}
									className={styles.select_category}
									placeholder='Обрати категорію'
									onChange={handleChangeCategory}
									options={profCategories}
									tagRender={categoryTagRender}
									optionRender={optionRenderCategory}
								/>
							</ConfigProvider>
						</div>
						{/* =============================================== */}
					</div>

					<div className={styles.search_bar}>
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
									maxTagCount={1}
									filterOption={false}
									bordered={false}
									style={{
										width: '250px',
										height: '100%',
									}}
									className={styles.select_country}
									placeholder='Обрати країну'
									onChange={handleChangeCountry}
									options={optionsCountry}
									tagRender={countryTagRender}
								/>
							</ConfigProvider>
						</div>

						{/* input search============================================/ */}

						<ConfigProvider
							theme={{
								components: {
									Tooltip: {},
								},
								token: {
									borderRadius: 0,
									colorTextPlaceholder: '#47474F',
									colorText: '#47474F',
									fontSize: 16,
									lineHeight: '160%',
								},
							}}>
							<Input
								type='text'
								name='query'
								bordered={false}
								placeholder='Шукати за словом, іменем чи нікнеймом…'
								maxLength='100'
								arrow='false'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.query}
								className={styles.input_search}
							/>
						</ConfigProvider>

						<div className={styles.search_wrapper_right}>
							{/* select category============================================/ */}

							<div className={styles.select_wrapper}>
								<ConfigProvider
									theme={{
										components: {
											// Select: { optionPadding: 20px 30px },
											// Tooltip: { color: 'red' },
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
										filterOption={false}
										placement='bottomRight'
										style={{
											width: '200px',
											height: '100%',
										}}
										className={styles.select_category}
										placeholder='Обрати категорію'
										onChange={handleChangeCategory}
										options={profCategories}
										tagRender={categoryTagRender}
										optionRender={optionRenderCategory}
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
					</div>
				</form>
			</div>
		</section>
	);
};

export default SearchSection;

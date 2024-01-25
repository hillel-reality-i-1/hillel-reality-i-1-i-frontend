import { ConfigProvider, Input } from 'antd';
import axios from '../../../config/axios/axios';

import { useFormik } from 'formik';
import CustomButton from '../../CustomButton/CustomButton';
import { useEffect, useRef, useState } from 'react';
import { URL_POST_CREATE, URL_PROF_CATEGORIES } from '../../../config/API_url';
import { ReactComponent as TagDel } from '../../../assets/img/icons/icon-create-post/icon_tag_del.svg';

import styles from './PostCreationForm.module.scss';
import './PostCreationForm.scss';
import 'draft-js/dist/Draft.css';

import TextEditorN from '../../TextEditor/TextEditorN/TextEditorN';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../../ImageUploader/ImageUploader';

const PostCreationForm = () => {
	const { TextArea } = Input;
	const navigate = useNavigate();

	const [selectedCategory, setSelectedCategory] = useState([]);
	const [profCategories, setProfCategories] = useState(null);
	const [newPost, setNewPost] = useState(null);

	const [changeHTMLText, setChangeHTMLText] = useState('');

	const [selectedCountries, setSelectedCountries] = useState([]);
	const [availableCountries, setAvailableCountries] = useState([
		{ id: 1, name: 'Чехія' },
		{ id: 2, name: 'Німеччина' },
		{ id: 3, name: 'Велика Британія' },
		{ id: 4, name: 'Польща' },
	]);

	const [isCountryVisible, setCountryVisible] = useState(false);
	const [isCategoryVisible, setCategoryVisible] = useState(false);
	const selectCountryRef = useRef(null);
	const selectCategoryRef = useRef(null);

	const isLimitCategories = selectedCategory.length < 3;

	// console.log('profCategories', profCategories);
	// console.log('selectedCategory', selectedCategory);
	// console.log('newPost', newPost && newPost);

	const onChangeHTMLText = async (text) => {
		// console.log(text, 'text');
		setChangeHTMLText(text);
	};
	// console.log('changHTML', changeHTMLText);
	// console.log('newPost', newPost);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const data = await axios.get(URL_PROF_CATEGORIES);
				setProfCategories(data);
			} catch (error) {
				return error.message;
			}
		};

		fetchCategories();
	}, []);

	const handleCountryClick = (country, event) => {
		event.stopPropagation();
		setSelectedCountries((prevSelectedCountries) => {
			if (prevSelectedCountries.includes(country)) {
				// Remove from selectedCountries
				const updatedSelectedCountries = prevSelectedCountries.filter((c) => c !== country);
				// Add back to availableCountries
				setAvailableCountries([...availableCountries, country]);
				// Update formik values
				formik.setFieldValue(
					'country',
					updatedSelectedCountries.map((c) => c.id)
				);
				return updatedSelectedCountries;
			} else {
				// Remove from availableCountries
				const updatedAvailableCountries = availableCountries.filter((c) => c !== country);
				// Add to selectedCountries
				setAvailableCountries(updatedAvailableCountries);
				// Update formik values
				formik.setFieldValue(
					'country',
					[...prevSelectedCountries, country].map((c) => c.id)
				);
				return [...prevSelectedCountries, country];
			}
		});
	};

	const handleCategoryClick = (category, event) => {
		event.stopPropagation();
		setSelectedCategory((prevSelectedCategory) => {
			if (prevSelectedCategory.includes(category)) {
				// Remove from selectedCategory
				const updatedSelectedCategory = prevSelectedCategory.filter((c) => c !== category);
				// Add back to availableCategories
				setProfCategories([...profCategories, category]);
				// Update formik values
				formik.setFieldValue(
					'category',
					updatedSelectedCategory.map((c) => c.id)
				);
				return updatedSelectedCategory;
			} else {
				// Remove from availableCategories
				const updatedAvailableCategories = profCategories.filter((c) => c !== category);
				// Add to selectedCategory
				setProfCategories(updatedAvailableCategories);
				// Update formik values
				formik.setFieldValue(
					'category',
					[...prevSelectedCategory, category].map((c) => c.id)
				);
				return [...prevSelectedCategory, category];
			}
		});
	};

	useEffect(() => {
		const handleDocumentClick = (event) => {
			const countrySelect = selectCountryRef.current;
			const categorySelect = selectCategoryRef.current;

			if (countrySelect && !countrySelect.contains(event.target)) {
				// Click was outside country select
				setCountryVisible(false);
			}

			if (categorySelect && !categorySelect.contains(event.target)) {
				// Click was outside category select
				setCategoryVisible(false);
			}
		};

		document.addEventListener('click', handleDocumentClick);

		return () => {
			document.removeEventListener('click', handleDocumentClick);
		};
	}, [selectCountryRef, selectCategoryRef]);

	const toggleCountryVisibility = () => {
		setCountryVisible(!isCountryVisible);
		// Hide the category select when showing the country select
		setCategoryVisible(false);
	};

	const toggleCategoryVisibility = () => {
		setCategoryVisible(!isCategoryVisible);
		// Hide the country select when showing the category select
		setCountryVisible(false);
	};

	// const handleFileChange = (e) => {
	// 	const API_ENDPOINT = 'http://dmytromigirov.space/api/v1/users/upload_portfolio/';
	// 	const authTokenUHelp = localStorage.getItem('authTokenUHelp');

	// 	const config = {
	// 		headers: {
	// 			Authorization: `Token ${authTokenUHelp}`,
	// 			'Content-Type': 'multipart/form-data',
	// 		},
	// 	};

	// 	const formData = new FormData();
	// 	formData.append('file', e.target.files[0]);

	// 	axios.post(API_ENDPOINT, formData, config).then((response) => {
	// 		if (response.status === 201) {
	// 			console.log('true');

	// 			console.log(response.data);

	// 			// setImagesArray((prevImages) => [...prevImages, response.data.file]);
	// 		}
	// 	});
	// };

	const fetchCreationPost = async () => {
		try {
			// console.log('ffff', newPost);
			// console.log('Sumit !!!!!!!eHTMLText', changeHTMLText);
			newPost &&
				(await axios.post(URL_POST_CREATE, {
					title: newPost?.title,
					category: newPost?.category,
					country: newPost?.country,
					content: changeHTMLText && changeHTMLText,
				}));
			// navigate(-1);
		} catch (error) {
			return error.message;
		}
	};

	const handleSubmit = async (values) => {
		try {
			await setNewPost(values);
			if (newPost) {
				await fetchCreationPost();
			}
		} catch (error) {
			return error.message;
		}

		// fetchCreationPost();
	};

	const formik = useFormik({
		initialValues: {
			title: '',
			category: null,
			country: null,
			content: '',
			// images: null,
		},

		onSubmit: handleSubmit,
	});
	// console.log('formik values:', formik.values);
	return (
		<div className={styles.form_container}>
			<form
				className={styles.form}
				onSubmit={formik.handleSubmit}>
				<div className={styles.input_wrapper}>
					<div className={styles.input_left_col}>
						<div className={styles.input_title}>
							<ConfigProvider
								theme={{
									token: {
										fontFamily: 'NotoSans-SemiBold',
										colorTextQuaternary: '#126FE1',
										borderRadius: 0,
										colorBorder: '#DBDBDD',
										colorText: '#03091C',
										colorTextPlaceholder: 'rgba(71, 71, 79, 0.40)',
										fontSize: 32,
										lineHeight: '130%',
									},
									components: {
										Input: {
											activeShadow: 'none',
											hoverBorderColor: 'none',
											activeBorderColor: 'none',
											paddingBlock: 10,
											paddingInline: 10,
										},
									},
								}}>
								<TextArea
									name='title'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.title}
									minLength='10'
									placeholder='Заголовок'
									autoSize={{
										minRows: 1,
									}}
									count={{
										show: true,
										min: 2,
										max: 100,
									}}
									style={{
										height: 62,
										resize: 'none',
										borderTop: 'none',
										borderLeft: 'none',
										borderRight: 'none',
										fontWeight: 600,
									}}
								/>
							</ConfigProvider>
						</div>
						<div className={styles.input_text}>
							{/* ================================editor */}
							{/* <Editor
								editorState={editorState}
								onChange={setEditorState}
							/> */}
							{/* <TextEditor
								onChangeHTMLText={onChangeHTMLText}
								name='content'
								// onChange={formik.handleChangeContent}
								onBlur={formik.handleBlur}
								value={changeHTMLText}
							/> */}
							<TextEditorN
								onChangeHTMLText={onChangeHTMLText}
								name='content'
								placeholder='Почніть писати текст... '
								// onChange={formik.handleChangeContent}
								onBlur={formik.handleBlur}
								value={changeHTMLText}
							/>
							{/* ========================content */}
						</div>
					</div>
					<div className={styles.input_right_col}>
						<div
							className={styles.select_country}
							ref={selectCountryRef}>
							<span className={styles.select_title}>Країна</span>
							<div
								className={`${styles.select_country_selected} ${
									isCountryVisible && styles.select_country_selected_active
								}`}
								onClick={toggleCountryVisibility}>
								{selectedCountries.map((country) => (
									<div
										className={styles.tag}
										key={country.id}
										onClick={(event) => handleCountryClick(country, event)}>
										{country.name}
										<TagDel />
									</div>
								))}
							</div>
							{isCountryVisible && (
								<div className={styles.select_country_available}>
									{availableCountries.map((country) => (
										<div
											className={styles.tag}
											key={country.id}
											onClick={(event) => handleCountryClick(country, event)}>
											{country.name}
										</div>
									))}
								</div>
							)}
						</div>

						{/* ===category==================================== */}

						<div
							className={styles.select_category}
							ref={selectCategoryRef}>
							<span className={styles.select_title}>Категорія</span>
							<span className={styles.select_category_info}>Ви можете обрати до 3-х категорій</span>
							<div
								className={`${styles.select_category_selected} ${
									isCategoryVisible && styles.select_category_selected_active
								}`}
								onClick={toggleCategoryVisibility}>
								{selectedCategory.map((category) => (
									<div
										className={styles.tag}
										key={category.id}
										onClick={(event) => handleCategoryClick(category, event)}>
										{category.name}
										<TagDel />
									</div>
								))}
							</div>
							{isCategoryVisible && (
								<div className={styles.select_category_available}>
									{profCategories.map((category) => (
										<div
											className={`${styles.tag} ${!isLimitCategories && styles.tag_disabled}`}
											key={category.id}
											onClick={(event) => {
												isLimitCategories && handleCategoryClick(category, event);
											}}>
											{category.name}
										</div>
									))}
								</div>
							)}
						</div>
						<div className={styles.image_wrapper}>
							<ImageUploader
								additionalStyles='container_image'
								// handleFileChange={handleFileChange}
							/>
						</div>
					</div>
				</div>
				<div className={styles.button_wrapper}>
					<CustomButton
						htmlType='submit'
						type='primary'>
						{/* {console.log(!isValid)} */}
						<span className={styles.btn_submit_text}>Опублікувати</span>
					</CustomButton>
				</div>
			</form>
		</div>
	);
};

export default PostCreationForm;
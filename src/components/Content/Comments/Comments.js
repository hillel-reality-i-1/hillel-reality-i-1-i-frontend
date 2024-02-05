import { useEffect, useState } from 'react';
import axios from '../../../config/axios/axios';
import Avatar from '../../../assets/img/icons/user-profile/Avatar.svg';

import styles from './Comments.module.scss';
import CustomButton from '../../CustomButton/CustomButton';
import TextArea from 'antd/es/input/TextArea';
import SortingPanel from '../SortingPanel/SortingPanel';
import { useFormik } from 'formik';
import CommentCard from '../CommentCard/CommentCard';
import { useGetUserDataQuery } from '../../../store/services/userApi';
import { ConfigProvider } from 'antd';
// http://dmytromigirov.space/api/v1/content/post/{id}/comment/create

// const postId = 304;

const Comments = ({ postId }) => {
	const { data, error, isLoading } = useGetUserDataQuery();
	// const [comment, setComment] = useState([]);
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const fetchGetPosts = async () => {
			try {
				const response = postId && (await axios.get(`/api/v1/content/post/${postId}/comments`));
				setComments(response);
			} catch (error) {
				return error.message;
			}
		};

		fetchGetPosts();
	}, [postId]);

	const fetchCreateComments = async (values) => {
		try {
			const response =
				values &&
				(await axios.post(`/api/v1/content/post/${postId}/comment/create`, {
					text: values.comment,
				}));
			setComments([response, ...comments]);

			// console.log(response);
		} catch (error) {
			return error.message;
		}
	};

	const handleSubmit = async (values) => {
		// console.log(values);

		values?.comment && fetchCreateComments(values);
		formik.resetForm();
	};

	// console.log('comments', comments);

	const formik = useFormik({
		initialValues: {
			comment: '',
		},

		onSubmit: handleSubmit,
	});

	return (
		<div className={styles.comments}>
			<SortingPanel
				nameResult='коментарів'
				count={comments?.length}
			/>
			<form
				className={styles.form}
				onSubmit={formik.handleSubmit}
				// encType='multipart/form-data'
			>
				<div className={styles.creation_comment}>
					<div className={styles.creation_comment_input_wrapper}>
						{data?.profile_picture?.image ? (
							<img
								src={`${process.env.REACT_APP_API_BASE_URL}${data.profile_picture.image}`}
								alt='Avatar'
								style={{ width: '56px', height: '56px', borderRadius: '56px', marginRight: '16px' }}
							/>
						) : (
							<img
								src={Avatar}
								alt='Avatar'
								style={{ width: '56px', height: '56px', marginRight: '16px' }}
							/>
						)}
						<ConfigProvider
							theme={{
								token: {
									fontFamily: 'NotoSans Regular',
									colorTextQuaternary: '#A7A7B2',
									borderRadius: 12,
									colorBorder: '#DBDBDD',
									colorText: '#0D101D',
									colorTextPlaceholder: '#47474F',
									fontSize: 16,
									lineHeight: '160%',
								},
								components: {
									Input: {
										activeShadow: 'none',
										hoverBorderColor: 'none',
										activeBorderColor: 'none',
										paddingBlock: 14,
										paddingInline: 14,
									},
								},
							}}>
							<TextArea
								name='comment'
								rows={4}
								placeholder='Розскажіть свою думку тут.'
								// maxLength={6}
								// onChange={(e) => {
								// 	formik.handleChange(e);
								// 	formik.setFieldValue('title', e.target.value);
								// }}
								onChange={formik.handleChange}
								value={formik.values.comment}
								onBlur={formik.handleBlur}
								// minLength='10'
							/>
						</ConfigProvider>
					</div>
				</div>
				<div className={styles.creation_comment_btn_wrapper}>
					<CustomButton
						htmlType='submit'
						type='primary'
						// isDisable={true}
					>
						Залишити коментар
					</CustomButton>
				</div>
			</form>
			<div className={styles.comments_wrapper}>
				{comments &&
					comments?.map((comment) => (
						<CommentCard
							key={comment.id}
							comment={comment}
						/>
					))}
			</div>
		</div>
	);
};

export default Comments;

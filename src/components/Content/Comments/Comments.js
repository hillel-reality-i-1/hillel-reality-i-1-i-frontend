import { useEffect, useState } from 'react';
import axios from '../../../config/axios/axios';
import { useFormik } from 'formik';
import { ConfigProvider } from 'antd';
import Avatar from '../../../assets/img/icons/user-profile/Avatar.svg';
import { useGetUserDataQuery } from '../../../store/services/userApi';
import CustomButton from '../../CustomButton/CustomButton';
import TextArea from 'antd/es/input/TextArea';
import SortingPanel from '../SortingPanel/SortingPanel';
import CommentCard from '../CommentCard/CommentCard';

import styles from './Comments.module.scss';

const Comments = ({ postId }) => {
	const { data } = useGetUserDataQuery();
	const [comments, setComments] = useState([]);
	const [page, setPage] = useState(1);
	const [countComments, setCountComments] = useState(0);
	const [textAreaValue, setTextAreaValue] = useState('');
	const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

	const userId = data && data.user;

	useEffect(() => {
		const fetchGetPosts = async () => {
			try {
				const response =
					postId &&
					(await axios.get(`/api/v1/content/post/${postId}/comments`, {
						params: { page: page, page_size: 5 },
					}));

				response?.results && setComments((prevComments) => [...prevComments, ...response?.results]);
				response.count && setCountComments(response.count);
			} catch (error) {
				return error.message;
			}
		};

		fetchGetPosts();
	}, [page, postId]);

	const fetchCreateComments = async (values) => {
		try {
			const response =
				values &&
				(await axios.post(`/api/v1/content/post/${postId}/comment/create`, {
					text: values.comment,
				}));

			setComments([response, ...comments]);
		} catch (error) {
			return error.message;
		}
	};

	const handlerDelete = async (commentId) => {
		try {
			await axios.delete(`/api/v1/content/comment/${commentId}/delete`);
			setComments(comments.filter((comment) => comment.id !== commentId));
		} catch (error) {
			return error.message;
		}
	};

	const handleNextPage = () => {
		setPage((prevPage) => prevPage + 1);
	};

	const handleTextAreaChange = (e) => {
		const value = e.target.value;
		setTextAreaValue(value);

		if (value.length < 2 || value.length > 2000) {
			setIsSubmitDisabled(true);
		} else {
			setIsSubmitDisabled(false);
		}
	};

	const handleSubmit = async () => {
		const values = { comment: textAreaValue };

		values?.comment && fetchCreateComments(values);
		setTextAreaValue('');
		setIsSubmitDisabled(true);
	};

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
				count={countComments}
			/>
			<form
				className={styles.form}
				onSubmit={formik.handleSubmit}>
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
								placeholder='Розкажіть свою думку тут.'
								maxLength={2000}
								onChange={handleTextAreaChange}
								value={textAreaValue}
								onBlur={formik.handleBlur}
							/>
						</ConfigProvider>
					</div>
				</div>
				<div className={styles.creation_comment_btn_wrapper}>
					<CustomButton
						htmlType='submit'
						type='primary'
						isDisable={isSubmitDisabled}>
						Залишити коментар
					</CustomButton>
				</div>
			</form>
			<div className={styles.comments_wrapper}>
				{comments &&
					comments.map((comment) => (
						<CommentCard
							key={comment.id}
							onDelete={handlerDelete}
							comment={comment}
							userId={userId}
						/>
					))}

				{countComments > comments?.length && (
					<button
						className={styles.btn_see_more}
						onClick={handleNextPage}>
						Дивитися більше
					</button>
				)}
			</div>
		</div>
	);
};

export default Comments;

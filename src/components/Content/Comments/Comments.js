import { useEffect, useState } from 'react';
import axios from '../../../config/axios/axios';
import Avatar from '../../../assets/img/icons/user-profile/Avatar.svg';

import styles from './Comments.module.scss';
import CustomButton from '../../CustomButton/CustomButton';
import TextArea from 'antd/es/input/TextArea';
import SortingPanel from '../SortingPanel/SortingPanel';
import { useFormik } from 'formik';
import CommentCard from '../CommentCard/CommentCard';
// http://dmytromigirov.space/api/v1/content/post/{id}/comment/create

// const postId = 304;

const Comments = ({ postId }) => {
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
			{' '}
			<SortingPanel nameResult='коментарів' />
			<form
				className={styles.form}
				onSubmit={formik.handleSubmit}
				// encType='multipart/form-data'
			>
				<div className={styles.creation_comment}>
					<div className={styles.creation_comment_input_wrapper}>
						<img
							src={Avatar}
							alt='Avatar'
							style={{ width: '56px', height: '56px', marginRight: '16px' }}
						/>
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

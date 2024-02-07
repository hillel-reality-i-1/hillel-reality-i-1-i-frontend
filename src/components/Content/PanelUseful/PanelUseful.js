import { useEffect, useState } from 'react';
import axios from '../../../config/axios/axios';
import styles from './PanelUseful.module.scss';
import { useDispatch } from 'react-redux';
// import { changeNotUseful, changeUseful } from '../../../store/slices/commentsSlice';

const PanelUseful = ({ comment, userId }) => {
	// const dispatch = useDispatch();

	// const useful = comment && comment.vote_helpful_state;
	// const notUseful = comment && comment.vote_not_helpful_state;

	const [isUsefulActive, setUsefulActive] = useState(false);
	const [isNotUsefulActive, setNotUsefulActive] = useState(false);
	const [commentInfo, setCommentInfo] = useState(null);
	// const [counter, setCounter] = useState(0);
	const commentId = comment && comment.id;
	// console.log('commentId', commentId);
	// console.log('isUsefulActive', useful);
	// console.log('isNotUsefulActive', isNotUsefulActive);
	// console.log('!!!!count', counter);
	const [counterUseful, setCounterUseful] = useState(0);

	const helpful_count = commentInfo?.helpful_count && commentInfo?.helpful_count;
	const not_helpful_count = commentInfo?.not_helpful_count && commentInfo?.not_helpful_count;

	// console.log('test', helpful_count);
	// console.log('NotTest', not_helpful_count);

	useEffect(() => {
		const counter = helpful_count - not_helpful_count;
		setCounterUseful(counter);
	}, [helpful_count, not_helpful_count]);
	// console.log('counter', counterUseful);

	useEffect(() => {
		const fetchVote = async () => {
			try {
				const response =
					commentId &&
					(await axios.get(`/api/v1/content/user-comment-vote/${userId}/${commentId}/`));

				// console.log('RESPON', response?.helpful);

				if (response?.helpful === true) {
					setUsefulActive(true);
					setNotUsefulActive(false);
				} else {
					setNotUsefulActive(true);
					setUsefulActive(false);
				}
				// if (isNotUsefulActive) {
				// 	setNotUsefulActive(false);
				// }
				// setUsefulActive((prevState) => !prevState);

				// dispatch(changeUseful(isUsefulActive));
				// dispatch(changeNotUseful(isNotUsefulActive));
			} catch (error) {
				if (error.response.data.message === 'error.response.data.message') {
					setUsefulActive(false);
					setNotUsefulActive(false);
					// dispatch(changeUseful(isUsefulActive));
					// dispatch(changeNotUseful(isNotUsefulActive));
				}
				// console.log(error.response.data.message);
				return error.message;
			}
		};

		fetchVote();
	}, [commentId, userId]);

	useEffect(() => {
		const fetchComment = async () => {
			try {
				const response = await axios.get(`/api/v1/content/comment/${commentId}/`);
				setCommentInfo(response);
				// console.log('responseONE', response);
			} catch (error) {
				return error.message;
			}
		};

		fetchComment();
	}, [commentId, isNotUsefulActive, isUsefulActive]);

	const handlerUseful = async () => {
		try {
			comment && (await axios.post(`/api/v1/content/comment/${comment.id}/vote_helpful/`));

			if (isNotUsefulActive) {
				setNotUsefulActive(false);
			}
			setUsefulActive((prevState) => !prevState);

			// dispatch(changeUseful(isUsefulActive));
			// dispatch(changeNotUseful(isNotUsefulActive));
			// onhandleReactionChange();
		} catch (error) {
			return error.message;
		}
	};

	const handlerNotUseful = async () => {
		try {
			comment && (await axios.post(`/api/v1/content/comment/${comment.id}/vote_not_helpful/`));
			if (isUsefulActive) {
				setUsefulActive(false);
			}
			setNotUsefulActive((prevState) => !prevState);

			// dispatch(changeUseful(isUsefulActive));
			// dispatch(changeNotUseful(isNotUsefulActive));
			// onhandleReactionChange();
		} catch (error) {
			return error.message;
		}
	};

	// useEffect(() => {
	// 	setCounter(counterUseful);
	// }, [counterUseful]);

	// console.log('counterUseful', counterUseful);

	return (
		<div className={styles.block_useful}>
			<button
				className={`${styles.btn_useful} ${isUsefulActive && styles.btn_useful_active}`}
				onClick={handlerUseful}>
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<g id='Icon'>
						<path
							id='like'
							d='M13.498 9V9.5H13.998H17.8979C19.2927 9.5 19.96 9.95803 20.2591 10.4919C20.5786 11.0622 20.5766 11.886 20.2729 12.7909L20.2726 12.7919L18.273 18.7907C18.2729 18.7909 18.2729 18.7911 18.2728 18.7913C18.0673 19.4027 17.8908 19.7945 17.5921 20.0568C17.3091 20.3053 16.8386 20.5 15.897 20.5H8.49805V11.0795L10.7698 4.19579C10.935 3.75801 11.3474 3.5 11.778 3.5C11.9794 3.5 12.1929 3.56088 12.3806 3.68604L12.3806 3.68606L12.3841 3.68833C13.081 4.14465 13.498 4.92628 13.498 5.76001V9ZM4.5 11.5H6V20.5H4.5C3.94814 20.5 3.5 20.0519 3.5 19.5V12.5C3.5 11.9481 3.94814 11.5 4.5 11.5Z'
							stroke='#47474F'
						/>
					</g>
				</svg>
			</button>
			<span className={styles.text_useful}>Корисно {counterUseful}</span>
			<button
				className={`${styles.btn_useful} ${isNotUsefulActive && styles.btn_useful_active}`}
				onClick={handlerNotUseful}>
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<g id='Icon'>
						<path
							id='dislike'
							d='M13.7023 19.97L15.9873 13.046C15.9973 13.016 16.0022 12.984 16.0022 12.952V3.29999M13.7023 19.97L13.2332 19.7968C13.2323 19.7993 13.2314 19.8017 13.2304 19.8042M13.7023 19.97L13.2275 19.8133L13.2304 19.8042M13.7023 19.97C13.4623 20.62 12.8523 21 12.2223 21C11.9223 21 11.6123 20.91 11.3423 20.73C10.5023 20.18 10.0022 19.24 10.0022 18.24V15.5V15H9.50219H6.10229C3.09229 15 2.60219 12.99 3.25219 11.05L5.25219 5.04999C5.66219 3.82999 6.09229 3 8.10229 3H15.7013C15.8663 3 16.0012 3.13399 16.0022 3.29999M13.2304 19.8042L15.5022 12.9205M13.2304 19.8042C13.0653 20.242 12.6528 20.5 12.2223 20.5C12.0209 20.5 11.8074 20.4391 11.6196 20.3139L11.6162 20.3117C10.9192 19.8553 10.5022 19.0737 10.5022 18.24V15V14.5H10.0022H6.10229C4.70757 14.5 4.04015 14.042 3.74091 13.508C3.42124 12.9376 3.42307 12.1138 3.72629 11.2088L3.72653 11.2081L5.72614 5.20927L5.25222 5.05L5.72653 5.2081L5.72633 5.20872C5.93182 4.59734 6.10836 4.20554 6.40713 3.94323C6.69014 3.69474 7.16066 3.5 8.10229 3.5H15.5022M15.5022 12.9205V12.952C15.5022 12.9341 15.5048 12.913 15.5125 12.8893L15.5022 12.9205ZM15.5022 12.9205V3.5M15.5022 3.5H15.7013C15.5905 3.5 15.5029 3.41111 15.5022 3.303L15.7013 3.3018L16.0022 3.29999M15.5022 3.5V3.29999H15.7013H16.0022M20.5002 4.5V11.5C20.5002 12.0521 20.0529 12.5 19.5002 12.5H18.0002V3.5H19.5002C20.0529 3.5 20.5002 3.94793 20.5002 4.5Z'
							stroke='#47474F'
						/>
					</g>
				</svg>
			</button>
		</div>
	);
};

export default PanelUseful;

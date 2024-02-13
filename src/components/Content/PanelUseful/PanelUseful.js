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
					<path
						d='M10.502 15V14.5L10.002 14.5H6.10205C4.70731 14.5 4.03997 14.042 3.74089 13.5081C3.42137 12.9378 3.4234 12.114 3.72708 11.2091L3.72739 11.2081L5.727 5.20927C5.72707 5.20907 5.72713 5.20888 5.7272 5.20869C5.93269 4.5973 6.1092 4.20552 6.40794 3.94321C6.69092 3.69475 7.1614 3.5 8.10303 3.5H15.502L15.502 12.9205L13.2302 19.8042C13.065 20.242 12.6526 20.5 12.222 20.5C12.0206 20.5 11.8071 20.4391 11.6194 20.314L11.6194 20.3139L11.6159 20.3117C10.919 19.8553 10.502 19.0737 10.502 18.24V15ZM19.5 12.5H18L18 3.5H19.5C20.0519 3.5 20.5 3.94814 20.5 4.5L20.5 11.5C20.5 12.0519 20.0519 12.5 19.5 12.5Z'
						stroke='#47474F'
					/>
				</svg>
			</button>
		</div>
	);
};

export default PanelUseful;

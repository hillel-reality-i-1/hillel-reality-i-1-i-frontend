import { useEffect, useState } from 'react';
import axios from '../../../config/axios/axios';
import { Tooltip } from 'antd';
import styles from './ButtonPostSave.module.scss';
import './ButtonPostSave.scss';
import { useGetUserDataQuery } from '../../../store/services/userApi';

const ButtonPostSave = ({ postId }) => {
	const [isSaved, setIsSaved] = useState(false);
	const { data, error, isLoading, refetch } = useGetUserDataQuery();
	const savedPosts = data && data.saved_posts;

	useEffect(() => {
		if (savedPosts) {
			setIsSaved(savedPosts.some((item) => item.id === postId));
		}
	}, [postId, savedPosts]);

	// useEffect(() => {
	// 	data && console.log(data?.saved_posts);
	// }, [data, data?.saved_posts]);

	const text = isSaved ? 'Збережено' : 'Зберегти';

	const handleSaveClick = async () => {
		try {
			const response = postId && (await axios.post(`/api/v1/content/post/${postId}/save-remove/`));

			refetch();

			if (response) {
				if (response.message === 'Допис успішно додано в обране.') {
					return setIsSaved(true);
				} else if (response.detail === 'Допіс успишно видалено з обраного') {
					return setIsSaved(false);
				} else {
					return;
				}
			}
		} catch (error) {
			return error.message;
		}
	};

	return (
		<button
			className={`${styles.btn_save} ${isSaved && styles.btn_save_active}`}
			onClick={handleSaveClick}>
			<Tooltip
				placement='topLeft'
				color={'rgba(3, 9, 28, 0.75'}
				title={text}
				overlayClassName='tooltip'
				// open={true}
				// arrow={true}
			>
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<g id='Icon'>
						<path
							id='Vector'
							d='M12.3354 17.3292C12.1243 17.2236 11.8757 17.2236 11.6646 17.3292L6.75 19.7865V5C6.75 4.66848 6.8817 4.35054 7.11612 4.11612C7.35054 3.8817 7.66848 3.75 8 3.75H16C16.3315 3.75 16.6495 3.8817 16.8839 4.11612C17.1183 4.35054 17.25 4.66848 17.25 5V19.7865L12.3354 17.3292Z'
							stroke='#03091C'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</g>
				</svg>
			</Tooltip>
		</button>
	);
};

export default ButtonPostSave;

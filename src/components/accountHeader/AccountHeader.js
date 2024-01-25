import { useEffect, useState } from 'react';
import { Dropdown, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useGetUserDataQuery } from '../../store/services/userApi';
import { clearAuthToken } from '../../store/slices/signInSlice';
import { ReactComponent as AvatarIcon } from '../../assets/img/icons/icons-header/avatar-account-wrapper-icon.svg';
import { ReactComponent as Bell } from '../../assets/img/icons/icons-header/bell-grey.svg';
import { ReactComponent as DropDown } from '../../assets/img/icons/drop-down/drop-down-icon.svg';
import BlueButton from '../buttons/BlueButton/BlueButton';
import dropDown from '../../assets/img/icons/drop-down/dropDown.png';
import questionMark from '../../assets/img/icons/drop-down/question-mark.svg';
import settingsIcon from '../../assets/img/icons/drop-down/settings-icon.svg';
import userIcon from '../../assets/img/icons/drop-down/user-icon.svg';
import signOut from '../../assets/img/icons/drop-down/sign-out-icon.svg';
import CustomModal from '../modals/CustomModal/CustomModal';
import SignOutModalContent from './SignOutContent/SignOutModalContent';

import styles from './accountHeader.module.scss';

export default function AccountHeader() {
	const { data, error, isLoading } = useGetUserDataQuery();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const delAuthToken = () => {
		dispatch(clearAuthToken());
		navigate('/');
	};

	const handlePostCreation = () => {
		navigate('/postCreationPage');
	};

	if (isLoading ) {
		return (
			<div className={styles.container}>
				<div>Loading...</div>
			</div>
		);
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className={styles.account}>
			<CustomModal
				isOpen={isModalOpen}
				additionalStyles={styles.modal}>
				<SignOutModalContent
					delAuthToken={delAuthToken}
					toggleModal={toggleModal}
				/>
			</CustomModal>

			<BlueButton
				text={'Створити допис'}
				onClick={handlePostCreation}
			/>

			<div className={styles.account__user}>
				<div className={styles.account__user__avatar}>
					{data.profile_picture && data.profile_picture.image !== null ? (
						<img src={`${process.env.REACT_APP_API_BASE_URL}${data.profile_picture.image}`} />
					) : (
						<AvatarIcon />
					)}
				</div>

				<Dropdown
					className={styles.dropdown}
					menu={{
						items: [
							...items,
							{
								label: (
									<a
										className={styles.dropdown__item__red}
										onClick={toggleModal}>
										<img src={signOut} />
										Вийти
									</a>
								),
								key: '4',
							},
						],
					}}
					placement='bottomRight'
					trigger={['click']}>
					<a
						onClick={(e) => e.preventDefault()}
						className={styles.flex}>
						{/* <Space className={styles.flex}> */}
						<a className={styles.account__user__name}> {data.full_name} </a><DropDown />
						{/* </Space> */}
					</a>
				</Dropdown>
			</div>
		</div>
	);
}

const items = [
	{
		label: (
			<Link
				to='user'
				className={styles.dropdown__item}>

				<img src={userIcon} /> Мій профіль
			</Link>
		),
		key: '0',
	},
	{
		label: (
			<Link
				to='settings'
				className={styles.dropdown__item}
			>
				<img src={settingsIcon} />
				Налаштування
			</Link>
		),
		key: '1',
	},
	// {
	//   label: <a className={styles.dropdown__item}><img src={questionMark} />  Help </a>,
	//   key: '3',
	// },
	{
		type: 'divider',
	},
];

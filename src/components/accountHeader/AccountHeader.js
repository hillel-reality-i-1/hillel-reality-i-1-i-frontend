import { useEffect, useState } from 'react';
import { Dropdown, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

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
import ModalInfo from '../ModalInfo/ModalInfo';

export default function AccountHeader() {
	const { data, error, isLoading } = useGetUserDataQuery();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const { pathname } = useLocation();
	const [isOpen, setModalOpen] = useState(false);
	const [targetLink, setTargetLink] = useState(null);

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

	if (isLoading) {
		return (
			<div className={styles.container}>
				<div>Loading...</div>
			</div>
		);
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	const handleLinkClick = (e) => {
		if (pathname === '/postCreationPage') {
			setTargetLink(e.currentTarget.pathname);
			setModalOpen(true);
			e.preventDefault();
		}
	};
	const handleContinueClick = () => {
		setModalOpen(false);
		if (targetLink) {
			navigate(targetLink);
		}
	};
	const closeModal = () => {
		setModalOpen(false);
	};

	const items = [
		{
			label: (
				<Link
					to='user'
					className={styles.dropdown__item}
					onClick={handleLinkClick}>
					<img src={userIcon} /> Мій профіль
				</Link>
			),
			key: '0',
		},
		{
			label: (
				<NavLink
					to='settings'
					
					className={styles.dropdown__item}
					onClick={handleLinkClick}>
					<img src={settingsIcon} />
					Налаштування
				</NavLink>
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
					{data?.profile_picture && data?.profile_picture.image !== null ? (
						<Link to='user'><img src={`${process.env.REACT_APP_API_BASE_URL}${data.profile_picture.image}`} /></Link>	
					) : (
						<AvatarIcon />
					)}
				</div>

				<Dropdown
					className={styles.dropdown}
					overlayStyle={{ paddingTop: '14px' }}
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
						<p className={styles.account__user__name}> {data.full_name} </p>
						<DropDown />
						{/* </Space> */}
					</a>
				</Dropdown>
			</div>
			{isOpen && (
				<ModalInfo
					onClose={closeModal}
					onContinue={handleContinueClick}
				/>
			)}
		</div>
	);
}

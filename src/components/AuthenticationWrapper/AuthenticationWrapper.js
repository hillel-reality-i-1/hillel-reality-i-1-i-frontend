import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAuthToken, clearAuthToken } from '../../store/slices/signInSlice';
import SignIn from '../SignIn/SignIn';
import AccountHeader from '../accountHeader/AccountHeader';
import CustomModal from '../modals/CustomModal';
import SignUp from '../Registration/SignUp/SignUp';
import SignUpForm from '../Registration/SignUpForm/SignUpForm';

import style from './AuthenticationWrapper.module.scss';

export default function AuthenticationWrapper() {
	const authToken = useSelector((state) => state.signIn.authTokenUHelp);
	const googleAuth = useSelector((state) => state.signIn.googleAuthTokenUHelp);

	const [signInModalOpen, setSignInModalOpen] = useState(false);
	const [signUpModalOpen, setSignUpModalOpen] = useState(false);
	const [signUpFormModalOpen, setSignUpFormModalOpen] = useState(false);

	const toggleSignInModal = () => {
		setSignInModalOpen(!signInModalOpen);
	};

	const toggleSignUpModal = () => {
		setSignUpModalOpen(!signUpModalOpen);
	};

	const toggleSignUpFormModal = () => {
		setSignUpFormModalOpen(!signUpFormModalOpen);
	};

	return (
		<div style={{ display: 'flex' }}>
			{authToken || googleAuth ? (
				<AccountHeader />
			) : (
				<div className={style.button_authorization_wrapper}>
					<SignIn
						signInModalOpen={signInModalOpen}
						toggleSignInModal={toggleSignInModal}
						toggleSignUpModal={toggleSignUpModal}
					/>
					<SignUp
						signUpModalOpen={signUpModalOpen}
						toggleSignUpModal={toggleSignUpModal}
						toggleSignInModal={toggleSignInModal}
					/>
				</div>
			)}
			<SignUpForm
				signUpFormModalOpen={signUpFormModalOpen}
				toggleSignUpFormModal={toggleSignUpFormModal}
				toggleSignInModal={toggleSignInModal}
			/>
		</div>
	);
}

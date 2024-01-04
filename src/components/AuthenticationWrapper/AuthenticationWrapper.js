import {useState } from 'react';
import { useSelector } from 'react-redux';

import SignIn from '../SignIn/SignIn';
import AccountHeader from '../accountHeader/AccountHeader';
import SignUp from '../Registration/SignUp/SignUp';
import SignUpForm from '../Registration/SignUpForm/SignUpForm';

import style from './AuthenticationWrapper.module.scss';

export default function AuthenticationWrapper({ currentPage }) {
	const authToken = useSelector((state) => state.signIn.authTokenUHelp);
	const googleAuth = useSelector((state) => state.signIn.googleAuthTokenUHelp);

	const [signInModalOpen, setSignInModalOpen] = useState(false);
	const [signUpModalOpen, setSignUpModalOpen] = useState(false);
	const [signUpFormModalOpen, setSignUpFormModalOpen] = useState(false);

	const toggleSignInModal = (event) => {
		event.preventDefault();
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
						currentPage={currentPage}
						signInModalOpen={signInModalOpen}
						toggleSignInModal={toggleSignInModal}
						toggleSignUpModal={toggleSignUpModal}
					/>
					<SignUp
						signUpModalOpen={signUpModalOpen}
						toggleSignUpModal={toggleSignUpModal}
						toggleSignInModal={toggleSignInModal}
						toggleSignUpFormModal={toggleSignUpFormModal}
						currentPage={currentPage}
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

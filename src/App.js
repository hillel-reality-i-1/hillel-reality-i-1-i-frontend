import React from 'react';
import HomePage from './pages/HomePage';
import './translations/i18n';
import SignIn from './components/SignIn/SignIn';
import CreateNewPassword from './components/ForgotPassword/CreateNewPassword/CreateNewPassword.js';
import PasswordUpdated from './components/ForgotPassword/PasswordUpdated/PasswordUpdated.js';
import RecievingLetter from './components/ForgotPassword/RecievingLetter/RecievingLetter.js';
import RecoveryPassword from './components/ForgotPassword/RecoveryPassword/RecoveryPassword.js'

function App() {
	return (
		<>
			<HomePage />
		</>
	);
}

export default App;
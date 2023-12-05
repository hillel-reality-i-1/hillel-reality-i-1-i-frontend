import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import './translations/i18n';

import HomePage from './pages/HomePage';
import VerifyCodeForm from './components/Registration/VerifyCodeForm/VerifyCodeForm';
import VerifyInfo from './components/Registration/VerifyInfo/VerifyInfo';
import ForgotYourPasswordForm from './components/RecoveryPassword/ForgotYourPassword/ForgotYourPassword';
import EmailOnTheWay from './components/RecoveryPassword/EmailOnTheWay/EmailOnTheWay';
import CreateNewPassword from './components/RecoveryPassword/CreateNewPassword/CreateNewPassword';
import PasswordUpdated from './components/RecoveryPassword/PasswordUpdated/PasswordUpdated';

import StepLayout from './components/Registration/StepLayout/StepLayout';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/verifyInfo',
		element: <VerifyInfo />,
	},
	{
		path: '/verifyCodeForm',
		element: <VerifyCodeForm />,
	},
	{
		path: '/createUnAccount/:token',
		element: <StepLayout />,
	},
	{
		path: '/forgotYourPasswordForm',
		element: <ForgotYourPasswordForm />,
	},
	{
		path: '/emailOnTheWay',
		element: <EmailOnTheWay />,
	},
	{
		path: '/createNewPasswordForm',
		element: <CreateNewPassword />,
	},
	{
		path: '/PasswordUpdated',
		element: <PasswordUpdated />,
	},
]);

export default router;

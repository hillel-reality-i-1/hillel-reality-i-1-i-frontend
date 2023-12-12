import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import './translations/i18n';

import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import UserPage from './pages/userPage/UserPage';
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
		element: <Layout/>,
		children: [
			{
				index: true,
				element: <HomePage/>
			},
			{
				path: '/user',
				element: <UserPage/>
			}
		]
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
		path: '/createNewPasswordForm/:id',
		element: <CreateNewPassword />,
		children: [
			{
				path: ':token',
				element: <CreateNewPassword />,
			},
		],
	},
	{
		path: '/PasswordUpdated',
		element: <PasswordUpdated />,
	},
]);

export default router;

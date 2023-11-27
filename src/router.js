import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import './translations/i18n';

import HomePage from './pages/HomePage';
import Step1Form from './components/Registration/Step1Form/Step1Form';
import Step2Form from './components/Registration/Step2Form/Step2Form';
import Step3Form from './components/Registration/Step3Form/Step3Form';
import VerifyCodeForm from './components/Registration/VerifyCodeForm/VerifyCodeForm';
import VerifyInfo from './components/Registration/VerifyInfo/VerifyInfo';
import ForgotYourPasswordForm from './components/RecoveryPassword/ForgotYourPassword/ForgotYourPassword';
import EmailOnTheWay from './components/RecoveryPassword/EmailOnTheWay/EmailOnTheWay';
import CreateNewPassword from './components/RecoveryPassword/CreateNewPassword/CreateNewPassword';
import PasswordUpdated from './components/RecoveryPassword/PasswordUpdated/PasswordUpdated'


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
		path: '/step1Form',
		element: <Step1Form />,
	},
	{
		path: '/step2Form',
		element: <Step2Form />,
	},
	{
		path: '/step3Form',
		element: <Step3Form />,
	},
	{
		path: '/verifyCodeForm',
		element: <VerifyCodeForm />,
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

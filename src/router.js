import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import './translations/i18n';

import HomePage from './pages/HomePage';
import VerifyCodeForm from './components/Registration/VerifyCodeForm/VerifyCodeForm';
import VerifyInfo from './components/Registration/VerifyInfo/VerifyInfo';
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
		path: '/stepLayout',
		element: <StepLayout />,
	},
]);

export default router;

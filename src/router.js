import React from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import './translations/i18n';

import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage/UserPage';
import VerifyCodeForm from './components/Registration/VerifyCodeForm/VerifyCodeForm';
import VerifyInfo from './components/Registration/VerifyInfo/VerifyInfo';
import ForgotYourPasswordForm from './components/RecoveryPassword/ForgotYourPassword/ForgotYourPassword';
import EmailOnTheWay from './components/RecoveryPassword/EmailOnTheWay/EmailOnTheWay';
import CreateNewPassword from './components/RecoveryPassword/CreateNewPassword/CreateNewPassword';
import PasswordUpdated from './components/RecoveryPassword/PasswordUpdated/PasswordUpdated';
import StatusInformation from './components/RecoveryPassword/StatusInformation/StatusInformation';
import StepLayout from './components/Registration/StepLayout/StepLayout';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import NicknamePage from './pages/NicknamePage/NicknamePage';
import FullName from './pages/FullNamePage/FullName';
import LocationPage from './pages/LocationPage/LocationPage';
import PostDetailsPage from './pages/PostDetailsPage/PostDetailsPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import PostCreationPage from './pages/PostCreationPage/PostCreationPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{ path: '/postDetailsPage/:id', element: <PostDetailsPage /> },
			{ path: '/postCreationPage', element: <PostCreationPage /> },
			{
				path: 'user',
				element: (
					<ProtectedRoute>
						<UserPage />
					</ProtectedRoute>
				),
			},
			{
				path: 'settings',
				element: (
					<ProtectedRoute>
						{' '}
						<Outlet />
					</ProtectedRoute>
				),
				children: [
					{
						index: true,
						element: <SettingsPage />,
					},
					{
						path: 'nickname',
						element: <NicknamePage />,
					},
					{
						path: 'fullName',
						element: <FullName />,
					},
					{
						path: 'location',
						element: <LocationPage />,
					},
				],
			},
			{
				path: 'settings/nickname',
				element: <NicknamePage />,
			},
			{
				path: 'settings/fullName',
				element: <FullName />,
			},
			{
				path: 'settings/location',
				element: <LocationPage />,
			},
			{ path: '/privacyPolicy', element: <PrivacyPolicy /> },
		],
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
		path: '/createUnAccount',
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
	{
		path: '/test',
		element: <StatusInformation />,
	},
	{
		path: '/*',
		element: <NotFoundPage />,
	},
]);

export default router;

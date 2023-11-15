import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';

import { Modal, Button, Checkbox, Form, Input } from 'antd';

import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';

// import google from '../../../assets/img/icons/icons-SignUp/google.svg';

import styles from './SignUpForm.module.scss';

const onFinish = (values) => {
	console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
	console.log('Failed:', errorInfo);
};

// const { Option } = Select;
// const residences = [
// 	{
// 		value: 'zhejiang',
// 		label: 'Zhejiang',
// 		children: [
// 			{
// 				value: 'hangzhou',
// 				label: 'Hangzhou',
// 				children: [
// 					{
// 						value: 'xihu',
// 						label: 'West Lake',
// 					},
// 				],
// 			},
// 		],
// 	},
// 	{
// 		value: 'jiangsu',
// 		label: 'Jiangsu',
// 		children: [
// 			{
// 				value: 'nanjing',
// 				label: 'Nanjing',
// 				children: [
// 					{
// 						value: 'zhonghuamen',
// 						label: 'Zhong Hua Men',
// 					},
// 				],
// 			},
// 		],
// 	},
// ];
// const formItemLayout = {
// 	labelCol: {
// 		xs: {
// 			span: 24,
// 		},
// 		sm: {
// 			span: 8,
// 		},
// 	},
// 	wrapperCol: {
// 		xs: {
// 			span: 24,
// 		},
// 		sm: {
// 			span: 16,
// 		},
// 	},
// };
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			// offset: 0,
		},
		// sm: {
		// span: 16,
		// offset: 8,
		// },
	},
};

const SignUpForm = () => {
	const { t } = useTranslation();

	// const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const showModal = () => {
		setOpen(true);
	};
	// const handleOk = () => {};

	const handleCancel = () => {
		setOpen(false);
	};
	return (
		<>
			{' '}
			<Button
				type='primary'
				onClick={showModal}>
				{t('textSignUp.signUp') + '????two'}
			</Button>
			<Modal
				open={open}
				closeIcon={
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M13.8179 12L20.623 5.19488C21.1257 4.69347 21.1257 3.87843 20.623 3.37702C20.1203 2.87433 19.3077 2.87433 18.805 3.37702L12 10.182L5.19496 3.37702C4.69226 2.87433 3.87972 2.87433 3.37702 3.37702C2.87433 3.87843 2.87433 4.69347 3.37702 5.19488L10.1821 12L3.37702 18.805C2.87433 19.3064 2.87433 20.1215 3.37702 20.6229C3.62773 20.8736 3.95686 20.9996 4.28599 20.9996C4.61512 20.9996 4.94425 20.8736 5.19496 20.6229L12 13.8179L18.805 20.6229C19.0557 20.8736 19.3849 20.9996 19.714 20.9996C20.0431 20.9996 20.3723 20.8736 20.623 20.6229C21.1257 20.1215 21.1257 19.3064 20.623 18.805L13.8179 12Z'
							fill='#03091C'
						/>
					</svg>
				}
				centered
				width={580}
				className={styles.modal}
				title={t('textSignUp.signUpWithEmail')}
				// onOk={handleOk}
				onCancel={handleCancel}
				footer={null}>
				<p className={styles.description}>{t('textSignUp.signUpDescription')}</p>

				<Form
					className={styles.form}
					name='signUp'
					labelCol={{
						span: 24,
					}}
					wrapperCol={{
						span: 24,
					}}
					style={{
						maxWidth: 420,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					layout='vertical'
					autoComplete='off'>
					<Form.Item
						name='email'
						label={t('textSignUp.email')}
						rules={[
							{
								type: 'email',
								message: 'The input is not valid Email!',
							},
							{
								// required: true,
								message: 'Please input your E-mail!',
							},
						]}>
						<Input />
					</Form.Item>
					<Form.Item
						label={t('textSignUp.password')}
						name='password'
						rules={[
							{
								// required: true,
								message: 'Please input your password!',
							},
						]}>
						<Input.Password />
					</Form.Item>
					<Form.Item
						name='confirm'
						label={t('textSignUp.confirmPassword')}
						dependencies={['password']}
						// hasFeedback
						rules={[
							{
								// required: true,
								message: 'Please confirm your password!',
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error('The new password that you entered do not match!')
									);
								},
							}),
						]}>
						<Input.Password />
					</Form.Item>
					<Form.Item
						name='agreement'
						valuePropName='checked'
						className={styles.itemCheckbox}
						rules={[
							{
								validator: (_, value) =>
									value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
							},
						]}
						{...tailFormItemLayout}>
						<Checkbox
							className={styles.checkbox}
							style={{ dispay: 'flex' }}>
							{t('textSignUp.agree')} &nbsp; <a href='/'>{t('textSignUp.conditions')}</a>
						</Checkbox>
					</Form.Item>
					<Form.Item>
						<ButtonPrimary>{t('textSignUp.signUp')}</ButtonPrimary>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default SignUpForm;

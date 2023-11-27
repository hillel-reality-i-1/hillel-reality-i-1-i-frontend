import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { Modal, Button, Checkbox, Input, Form } from 'antd';
import { Formik } from 'formik';

import styles from './SignUpForm.module.scss';

const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
		},
	},
};

const SignUpForm = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const showModal = () => {
		setOpen(true);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	const signUpHandler = () => {
		setOpen(false);
		navigate('/verifyInfo');
	};

	return (
		<>
			{' '}
			<Button
				type='primary'
				onClick={showModal}
				className={styles.btn_open_modal}>
				{t('textSignUp.signUpWithEmail')}
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
				onCancel={handleCancel}
				footer={null}>
				<p className={styles.description}>{t('textSignUp.signUpDescription')}</p>

				<Formik
					initialValues={{ email: '', password: '', passwordConfirm: '' }}
					validate={(values) => {
						const errors = {};
						if (!values.email) {
							errors.email = 'Required';
						} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
							errors.email = 'Invalid email address';
						}
						return errors;
					}}
					onSubmit={(values) => {
						console.log(values);
					}}>
					{({ errors, touched }) => (
						<Form
							className={styles.form}
							layout='vertical'>
							<Form.Item
								className={styles.Form_item}
								name='email'
								label={t('textSignUp.email')}>
								<Input
									className={`${styles.input} `}
									name='email'
									// validate={validateEmail}
								/>
								{errors.email && touched.email && <div className={styles.error}></div>}
							</Form.Item>

							<Form.Item
								label={t('textSignUp.password')}
								name='password'>
								<Input.Password className={styles.input} />
							</Form.Item>
							<Form.Item
								label={t('textSignUp.password')}
								name='passwordConfirm'>
								<Input.Password className={styles.input} />
							</Form.Item>
							<Form.Item
								name='agreement'
								valuePropName='checked'
								className={styles.itemCheckbox}
								rules={[
									{
										validator: (_, value) =>
											value
												? Promise.resolve()
												: Promise.reject(new Error('Should accept agreement')),
									},
								]}
								{...tailFormItemLayout}>
								<Checkbox
									className={styles.checkbox}
									style={{ dispay: 'flex' }}>
									{t('textSignUp.agree')} &nbsp; <a href='/'>The Terms and Conditions</a>
								</Checkbox>
							</Form.Item>
							<Form.Item>
								<button
									type='submit'
									className={styles.btn_signup_form}
									onClick={signUpHandler}>
									{t('textSignUp.signUp')}
								</button>
							</Form.Item>
						</Form>
					)}
				</Formik>
			</Modal>
		</>
	);
};

export default SignUpForm;

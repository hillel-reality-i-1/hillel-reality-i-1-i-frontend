import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { Form, Input, Space } from 'antd';
import { Link } from 'react-router-dom';

import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import phone from '../../../assets/img/icons/icons-SignUp/phone.svg';
import arrowLeft from '../../../assets/img/icons/icons-SignUp/arrowLeft.svg';

import styles from './VerifyCodeForm.module.scss';

const VerifyCodeForm = () => {
	const { t } = useTranslation();

	const [value, setValue] = useState('');

	const NumericInput = (props) => {
		const { value, onChange } = props;

		const handleChange = (e) => {
			const { value: inputValue } = e.target;
			const reg = /^-?\d*(\.\d*)?$/;
			if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
				onChange(inputValue);
			}
		};

		const handleBlur = () => {
			let valueTemp = value;
			if (value.charAt(value.length - 1) === '.' || value === '-') {
				valueTemp = value.slice(0, -1);
			}
			onChange(valueTemp.replace(/0*(\d+)/, '$1'));
		};

		return (
			<Input
				{...props}
				onChange={handleChange}
				onBlur={handleBlur}
				maxLength={1}
			/>
		);
	};

	return (
		<>
			<div className={styles.verify_code}>
				<div className={styles.container_novigation}>
					<div className={styles.back}>
						{' '}
						<a
							href='/'
							className={styles.back_link}>
							<img
								src={arrowLeft}
								alt='Arrow left'
							/>

							<span className={styles.link_text}>{t('textSignUp.back')}</span>
						</a>
					</div>
				</div>
				<div className={`${styles.container} ${styles.verify_code_inner}`}>
					<img
						className={styles.img_phone}
						src={phone}
						alt='Phone'
					/>
					<h2 className={styles.title}>{t('textSignUp.textVerifyCode.titleH2')}</h2>
					<div className={styles.description}>
						<span className={styles.text}>{t('textSignUp.textVerifyCode.weSentCode')}</span>
						<div className={styles.description_bottom}>
							<a href='/'>
								<span className={styles.text_link}>{'+380 000000'}</span>
							</a>
							<span className={styles.text}>{t('textSignUp.textVerifyCode.enterCode')}</span>
						</div>
					</div>

					<Form
						name='step1'
						layout='vertical'
						className={styles.form}>
						<Form.Item
							name='numberPhone'
							className={styles.form_input_wrapper}>
							<Space size={24}>
								<NumericInput
									style={{
										width: 60,
										height: 102,
										textAlign: 'center',
									}}
									value={value}
									onChange={setValue}
								/>
								<NumericInput
									style={{
										width: 60,
										height: 102,
										textAlign: 'center',
									}}
									value={value}
									onChange={setValue}
								/>
								<NumericInput
									style={{
										width: 60,
										height: 102,
										textAlign: 'center',
									}}
									value={value}
									onChange={setValue}
								/>
								<NumericInput
									style={{
										width: 60,
										height: 102,
										textAlign: 'center',
									}}
									value={value}
									onChange={setValue}
								/>
							</Space>
						</Form.Item>

						<Link to='/'>
							<ButtonPrimary>
								<span className={styles.button_text}>
									{t('textSignUp.textVerifyCode.confirmNumber')}
								</span>
							</ButtonPrimary>
						</Link>
						<div className={styles.form_text_bottom_wrapper}>
							<span className={`${styles.text} ${styles.margin_right}`}>
								{t('textSignUp.textVerifyCode.didntReceiveCode')}
							</span>
							<a
								href='/'
								className={styles.text_link}>
								{t('textSignUp.textVerifyCode.sendAgain')}
							</a>
						</div>
					</Form>
				</div>
			</div>
		</>
	);
};

export default VerifyCodeForm;

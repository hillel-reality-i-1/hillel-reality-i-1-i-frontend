import React from 'react';

import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { Form, Button, Select } from 'antd';
import { Link } from 'react-router-dom';

import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import location from '../../../assets/img/icons/icons-SignUp/location.svg';

import styles from './Step2Form.module.scss';

const Step2Form = () => {
	const { t } = useTranslation();

	const onFinish = (value) => {
		console.log(value);
	};

	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};

	return (
		<>
			<div className={styles.step2}>
				<div className={styles.container}>
					<h2 className={styles.title}>{t('textSignUp.textStep2.titleH2')}</h2>
					<p className={styles.text}>{t('textSignUp.textStep2.description')}</p>
					<Button
						key='email'
						shape='round'
						size='large'
						className={styles.button_location}>
						<span className={styles.btn_text}>
							{' '}
							{
								<img
									src={location}
									alt='Location'
								/>
							}
							{t('textSignUp.textStep2.shareTheLocation')}
						</span>
					</Button>
					<div className={styles.spanOr}>{t('textSignUp.or')}</div>
					<Form
						name='step1'
						layout='vertical'
						onFinish={onFinish}>
						<Form.Item
							name='country'
							label={t('textSignUp.textStep2.country')}>
							<Select
								className={styles.input}
								placeholder={t('textSignUp.textStep2.selectСountry')}
								style={{
									height: 56,
								}}
								onChange={handleChange}
								options={[
									{
										options: [
											{
												label: 'Польша',
												value: 'Польша',
											},
											{
												label: 'Франція',
												value: 'Франція',
											},
										],
									},
								]}
							/>
						</Form.Item>
						<Form.Item
							name='city'
							className={styles.margin_bottom}
							label={t('textSignUp.textStep2.city')}>
							<Select
								className={styles.input}
								placeholder={t('textSignUp.textStep2.selectСity')}
								style={{
									height: 56,
								}}
								onChange={handleChange}
								options={[
									{
										options: [
											{
												label: 'Варшава',
												value: 'Варшава',
											},
											{
												label: 'Париж',
												value: 'Париж',
											},
										],
									},
								]}
							/>
						</Form.Item>
						<Link to='/step3Form'>
							<ButtonPrimary>{t('textSignUp.continue')}</ButtonPrimary>
						</Link>
						<div className={styles.skip_link}>
							<a href='/'>{t('textSignUp.skipNow')}</a>
						</div>
					</Form>
				</div>
			</div>
		</>
	);
};

export default Step2Form;

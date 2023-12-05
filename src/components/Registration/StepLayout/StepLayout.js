import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Steps, ConfigProvider } from 'antd';
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';

import step_logo from '../../../assets/img/icons/logo/step_logo.svg';
import img_aside_step1 from '../../../assets/img/img-sign-up/img_aside_step1.png';
import img_aside_step2 from '../../../assets/img/img-sign-up/img_aside_step2.png';
import img_aside_step3 from '../../../assets/img/img-sign-up/img_aside_step3.png';
import arrowLeft from '../../../assets/img/icons/icons-SignUp/arrowLeft.svg';
import StepForm1 from '../Step1Form/Step1Form';
import StepForm2 from '../Step2Form/Step2Form';
import StepForm3 from '../Step3Form/Step3Form';

import styles from './StepLayout.module.scss';

const StepLayout = () => {
	const { t } = useTranslation();

	const steps = [
		{
			title: t('textSignUp.name'),
			content: <StepForm1 onNext={() => next()} />,
			asideImage: img_aside_step1,
		},
		{
			title: t('textSignUp.country'),
			content: <StepForm2 onNext={() => next()} />,
			asideImage: img_aside_step2,
		},
		{
			title: t('textSignUp.phone'),
			content: <StepForm3 onNext={() => next()} />,
			asideImage: img_aside_step3,
		},
	];

	const [current, setCurrent] = useState(0);

	const next = () => {
		setCurrent(current + 1);
	};
	const prev = () => {
		setCurrent(current - 1);
	};

	const items = steps.map((item) => ({
		key: item.title,
		title: item.title,
	}));

	return (
		<>
			<div className={styles.step_layout}>
				<div className={`${styles.step_layout_main} ${styles.container_main}`}>
					<div className={styles.step_header}>
						<Link
							to='/'
							className={styles.step_logo}>
							<img
								src={step_logo}
								alt='Logo'
							/>
						</Link>
						{current > 0 && (
							<div className={styles.container_novigation}>
								<div className={styles.back}>
									{' '}
									<Link
										onClick={() => prev()}
										className={styles.back_link}>
										<img
											src={arrowLeft}
											alt='Arrow left'
										/>

										<span className={styles.link_text}>{t('textSignUp.back')}</span>
									</Link>
								</div>
							</div>
						)}

						<ConfigProvider
							theme={{
								token: { colorSplit: '#DBDBDD' },
							}}>
							<Steps
								className={styles.step}
								current={current}
								items={items}
								labelPlacement='vertical'
							/>
						</ConfigProvider>
						<div className={styles.step1_wrapper}>{steps[current].content}</div>
					</div>
				</div>
				<aside className={styles.aside}>
					<div className={styles.aside_bg}>
						<img
							src={steps[current].asideImage}
							alt='background'
						/>
					</div>
				</aside>
			</div>
		</>
	);
};

export default StepLayout;

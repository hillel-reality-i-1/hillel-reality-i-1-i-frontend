import styles from './LatestActivityReactions.module.scss';

import TubInfo from '../TubInfo/TubInfo';

const LatestActivityReactions = () => {
	return (
		<>
			<TubInfo
				text={'Ви не залишили ще жодної реакції. Взаємодійте з дописами на Головній сторінці.'}
			/>
		</>
	);
};

export default LatestActivityReactions;

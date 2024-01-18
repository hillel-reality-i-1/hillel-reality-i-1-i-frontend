import { useNavigate } from 'react-router-dom';
import styles from './ButtonBack.module.scss';

const ButtonBack = ({ children, customClassButton }) => {
	const navigate = useNavigate();
	return (
		<button
			className={`${styles.btn_back} ${customClassButton}`}
			onClick={() => navigate(-1)}>
			{children}
		</button>
	);
};

export default ButtonBack;

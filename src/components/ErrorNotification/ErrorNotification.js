import errorIcon from '../../assets/img/icons/icons-forgotPassword/error.svg'

import styles from './ErrorNotification.module.scss'

const ErrorNotification = ({text}) => {
    return (
        <div className={styles.errorNotification_block}>
            <img alt='error icon' className={styles.errorNotification_img} src={errorIcon} />
            <p className={styles.errorNotification_text}>
                {
                    text
                }
            </p>
        </div>
    )
}

export default ErrorNotification
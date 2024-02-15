import { Link } from 'react-router-dom';

import { ReactComponent as UserSettings } from '../../../assets/img/icons/settings-icons/arrow-left.svg';

import styles from './backLinkButton.module.scss';

export default function BackLinkButton({link, text, styleCustom}) {
  return (
    <>
      <Link
        to={link ? link : '/settings'}
        className={styles.back}
        style={{
          ...(styleCustom ? styleCustom : {})
        }}
      >
        <UserSettings /> { text ? text : 'Повернутися до Налаштувань' }
      </Link>
    </>
  )
}

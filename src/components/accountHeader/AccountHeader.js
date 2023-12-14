import BlueButton from "../buttons/blueButton/BlueButton"

import styles from './accountHeader.module.scss'

export default function AccountHeader() {
  return (
    <div className={styles.account}> 
        <BlueButton />
        <div className={styles.account__notification}>
           bell
        </div>
        <div className={styles.account__user} >
          name
        </div>
    </div>
  )
}
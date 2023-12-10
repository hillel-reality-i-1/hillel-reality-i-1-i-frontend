import styles from './blueButton.module.scss'

export default function BlueButton({text}) {

  return (
    <>
      <button className={styles.button}>
        {text}
      </button> 
    </>
  )
}

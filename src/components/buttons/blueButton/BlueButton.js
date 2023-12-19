import styles from './blueButton.module.scss'

export default function BlueButton({text, additionalStyles, onClick }) {

  return (
    <>
      <button className={`${styles.button} ${additionalStyles}`} onClick={onClick}>
        {text}
      </button>
    </>
  )
}

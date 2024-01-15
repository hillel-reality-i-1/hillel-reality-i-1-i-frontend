import styles from './blueButton.module.scss'

export default function BlueButton({text, additionalStyles, onClick, children }) {

  return (
    <>
      <button className={`${styles.button} ${additionalStyles}`} onClick={onClick}>
        {children}
        {text}
      </button>
    </>
  )
}

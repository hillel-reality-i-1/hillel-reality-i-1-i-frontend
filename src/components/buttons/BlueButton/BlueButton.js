import styles from './blueButton.module.scss'

export default function BlueButton({text, additionalStyles, onClick, children, disabled = false }) {

  return (
    <>
      <button disabled={disabled} className={`${styles.button} ${additionalStyles}`} onClick={onClick}>
        {children}
        {text}
      </button>
    </>
  )
}

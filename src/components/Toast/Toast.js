import { useEffect, useState } from "react";

import { ReactComponent as Success } from '../../assets/img/icons/toast/green-mark-success.svg';
import { ReactComponent as Error } from '../../assets/img/icons/toast/red-mark-toast.svg';

import styles from "./toast.module.scss";

export default function Toast({ message, duration, error }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
    
      return () => clearTimeout(timer);
    }, [duration]);
    if(duration === '0') {
      return
  }
  if (error==='error') {
    return (
      <div className={`${styles.toastRed} ${isVisible ? styles.show : styles.hide}`}>
        <Error />  {message}
      </div>
    )

  }
    return (
        <div className={`${styles.toast} ${isVisible ? styles.show : styles.hide}`}>
          <Success />  {message}
        </div>
    );
}

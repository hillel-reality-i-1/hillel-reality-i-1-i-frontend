import { useState } from "react";
import { ReactComponent as Plus } from '../../assets/img/icons/user-profile/Plus.svg';
import { ReactComponent as Pen } from '../../assets/img/icons/user-profile/Pen.svg';
import { ReactComponent as Avatar } from '../../assets/img/icons/user-profile/Avatar.svg'
import styles from "./userHead.module.scss";

export default function UserHead() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.user__head__avatar}>
        <Avatar />
      </div>
      <div className={styles.user__head__info}>
        <p className={styles.name}>userName</p>
        <p className={styles.location}>
          <Plus />
          Add location
        </p>
      </div>
      <div className={styles.user__head__edit}>
        <p><Pen /> edit</p>
      </div>
    </>
  );
}

import styles from "../../styles/helper/Modal.module.scss";
import { ReactComponent as DeleteIcon } from "../../assets/img/icons/delete-icon.svg";
import { ReactComponent as CloseIcon } from "../../assets/img/icons/close-search-icon.svg";
import React from "react";

interface ModalProps {
   setModal: React.Dispatch<React.SetStateAction<boolean>>;
   setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
   message: string;
}

function Modal({ message, setModal, setConfirmDelete }: ModalProps) {
   function handleOutsideClick(e: React.MouseEvent<HTMLDivElement>) {
      if (e.target === e.currentTarget) setModal(false);
   }

   return (
      <div className={styles.modal} onClick={handleOutsideClick}>
         <div className={styles.modalContent}>
            <CloseIcon
               onClick={() => setModal(false)}
               className={styles.closeIcon}
            />
            <DeleteIcon className={styles.deleteIcon} />
            <p>{message}</p>
            <div className={styles.modalButtons}>
               <button
                  onClick={() => setConfirmDelete(true)}
                  className={styles.confirmButton}
               >
                  Yes, I'm sure
               </button>
               <button
                  onClick={() => setModal(false)}
                  className={styles.cancelButton}
               >
                  No, cancel
               </button>
            </div>
         </div>
      </div>
   );
}

export default Modal;

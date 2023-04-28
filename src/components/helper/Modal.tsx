import styles from "../../styles/helper/Modal.module.scss";

interface ModalProps {
   title: string;
   msg: string;
   confirmMsg: string;
   cancelMsg: string;
}

function Modal({ title, msg, confirmMsg, cancelMsg }: ModalProps) {
   return (
      <div className={styles.modal}>
         <div className={styles.modalContent}>
            <h2>{title}</h2>
            <p>{msg}</p>
            <div className={styles.buttons}>
               <button>{confirmMsg}</button>
               <button>{cancelMsg}</button>
            </div>
         </div>
      </div>
   );
}

export default Modal;

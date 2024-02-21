import styles from "../styles/Footer.module.scss";

function Footer() {
   return (
      <footer className={styles.footer}>
         <p>
            &copy; 2023 ShelfSpace - Developed by{" "}
            <a
               href="https://github.com/laiongabriel"
               target="_blank"
               rel="noreferrer"
            >
               Laion Gabriel
            </a>
         </p>
      </footer>
   );
}

export default Footer;

import styles from "../styles/Footer.module.scss";

function Footer() {
   return (
      <footer className={styles.footer}>
         <p>
            &copy; 2023 ShelfSpace - Developed by{" "}
            <a
               href="https://laiongabriel.github.io/portfolio/en.html"
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

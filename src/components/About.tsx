import Head from "./helper/Head";
import styles from "../styles/About.module.scss";

function About() {
   return (
      <section className={`${styles.about} animeLeft`}>
         <Head title="About" />
         <p>Under development.</p>
      </section>
   );
}

export default About;

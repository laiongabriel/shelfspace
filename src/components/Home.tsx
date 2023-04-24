import Head from "./helper/Head";
import styles from "../styles/Home.module.scss";
import { Link } from "react-router-dom";
import Image from "./helper/Image";

function Home() {
   const mustReadList = [
      "-vEgM9Ly3swC",
      "RyGVAgAAQBAJ",
      "pTL0oqK0zDQC",
      "U5NhxE67JjMC",
      "kotPYEqx7kMC",
      "oaAA9jRq9kkC",
   ];

   return (
      <section className={styles.home}>
         <Head title="Home" />
         <div className={styles.homeIntro}>
            <h1>Wellcome to ShelfSpace!</h1>
            <p>A virtual bookshelf for book lovers.</p>
         </div>

         <div className={styles.mustReadListContainer}>
            <h1>Must-read classics that you might like...</h1>
            <ul className={styles.mustReadList}>
               {mustReadList.map((id) => (
                  <li key={id}>
                     <Link to={`/book/${id}`}>
                        <Image
                           alt=""
                           src={`https://books.google.com/books/publisher/content/images/frontcover/${id}?fife=w512-h512`}
                           width="150px"
                           height="228px"
                        />
                     </Link>
                  </li>
               ))}
            </ul>
         </div>
      </section>
   );
}

export default Home;

import Head from "./helper/Head";
import styles from "../styles/Home.module.scss";
import { Link } from "react-router-dom";
import Image from "./helper/Image";

function Home() {
   return (
      <section className={styles.home}>
         <Head title="Home" />
         <div className={styles.homeIntro}>
            <h1>Wellcome to ShelfSpace!</h1>
            <p>A virtual bookshelf for book lovers.</p>
         </div>

         <div className={styles.classicsListContainer}>
            <h1>Must-read classics that you might like...</h1>
            <ul className={styles.classicsList}>
               <li>
                  <Link to="/book/-vEgM9Ly3swC">
                     <Image
                        alt="Dracula"
                        src="https://books.google.com/books/publisher/content/images/frontcover/-vEgM9Ly3swC?fife=w240-h345"
                        width="150px"
                        height="227.63px"
                     />
                  </Link>
               </li>
               <li>
                  <Link to="/book/RyGVAgAAQBAJ">
                     <Image
                        alt="One Hundred Years of Solitude"
                        src="https://books.google.com/books/publisher/content/images/frontcover/RyGVAgAAQBAJ?fife=w240-h345"
                        width="150px"
                        height="227.63px"
                     />
                  </Link>
               </li>
               <li>
                  <Link to="/book/pTL0oqK0zDQC">
                     <Image
                        alt="Anna Karenina"
                        src="https://books.google.com/books/publisher/content/images/frontcover/pTL0oqK0zDQC?fife=w240-h345"
                        width="150px"
                        height="227.63px"
                     />
                  </Link>
               </li>
               <li>
                  <Link to="/book/U5NhxE67JjMC">
                     <Image
                        alt="Crime and Punishment"
                        src="https://books.google.com/books/publisher/content/images/frontcover/U5NhxE67JjMC?fife=w240-h345"
                        width="150px"
                        height="227.63px"
                     />
                  </Link>
               </li>
               <li>
                  <Link to="/book/VO8nDwAAQBAJ">
                     <Image
                        alt="1984"
                        src="https://books.google.com/books/publisher/content/images/frontcover/VO8nDwAAQBAJ?fife=w240-h345"
                        width="150px"
                        height="227.63px"
                     />
                  </Link>
               </li>
               <li>
                  <Link to="/book/oaAA9jRq9kkC">
                     <Image
                        alt="Pride and Prejudice"
                        src="https://books.google.com/books/publisher/content/images/frontcover/oaAA9jRq9kkC?fife=w240-h345"
                        width="150px"
                        height="227.63px"
                     />
                  </Link>
               </li>
            </ul>
         </div>
      </section>
   );
}

export default Home;

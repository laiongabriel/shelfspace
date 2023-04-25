import Head from "./helper/Head";
import styles from "../styles/Home.module.scss";
import { Link } from "react-router-dom";
import Image from "./helper/Image";
import SiteLogo from "../assets/img/site-logo.svg";

function Home() {
   const classicsList = [
      {
         id: "-vEgM9Ly3swC",
         title: "Dracula",
         firstPublished: 1897,
         author: "Bram Stoker",
      },
      {
         id: "RyGVAgAAQBAJ",
         title: "One Hundred Years of Solitude",
         firstPublished: 1967,
         author: "Gabriel Garcia Marquez",
      },
      {
         id: "oaAA9jRq9kkC",
         title: "Pride and Prejudice",
         firstPublished: 1813,
         author: "Jane Austen",
      },
      {
         id: "U5NhxE67JjMC",
         title: "Crime and Punishment",
         firstPublished: 1866,
         author: "Fyodor Dostoevsky",
      },
      {
         id: "kotPYEqx7kMC",
         title: "1984",
         firstPublished: 1949,
         author: "George Orwell",
      },
   ];

   return (
      <section className={styles.home}>
         <Head
            title="Home"
            description="Your personal virtual bookshelf. Discover, organize and access your favorite books."
            ogImage={SiteLogo}
         />
         <div className={styles.homeIntro}>
            <h1>Wellcome to ShelfSpace!</h1>
            <p>
               Your personal virtual bookshelf. Discover, organize and access
               your favorite books.
            </p>
         </div>

         <div className={styles.classicsListContainer}>
            <h1>World literature classics that you might enjoy...</h1>
            <ul className={styles.classicsList}>
               {classicsList.map((book) => (
                  <li key={book.id} className={styles.classicItem}>
                     <Link to={`/book/${book.id}`}>
                        <Image
                           alt={book.title}
                           src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w512-h512`}
                           width="180px"
                           height="276px"
                        />
                     </Link>
                     <div className={styles.classicInfo}>
                        <p className={styles.classicTitle}>
                           {book.title}{" "}
                           <span className={styles.classicDate}>
                              ({book.firstPublished})
                           </span>
                        </p>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </section>
   );
}

export default Home;

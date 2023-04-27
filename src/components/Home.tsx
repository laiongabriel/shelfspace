import Head from "./helper/Head";
import styles from "../styles/Home.module.scss";
import { Link } from "react-router-dom";
import { classicsList, authorsList } from "../homeLists";
import Image from "./helper/Image";

function Home() {
   return (
      <section>
         <Head title="Home" />
         <div className={styles.homeIntro}>
            <h1>Welcome to ShelfSpace!</h1>
            <p>
               Your personal virtual bookshelf. Discover, organize and access
               your favorite books.
            </p>
         </div>

         <section className={styles.classicsListContainer}>
            <div className={styles.classicsDesc}>
               <h1>World literature classics that you might enjoy...</h1>
               <p>
                  These books have influenced generations of readers and have
                  left a lasting impact on the literary world.
               </p>
            </div>

            <ul className={styles.classicsList}>
               {classicsList.map((book) => (
                  <li key={book.id} className={styles.classicItem}>
                     <Link to={`/book/${book.id}`}>
                        <Image
                           alt={book.title}
                           src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w512-h512`}
                           width="180px"
                           height="276px"
                           hover={true}
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
         </section>

         <section>
            <div className={styles.authorsDesc}>
               <h1>Some of the greatest authors of all time</h1>
               <p>
                  Explore works by the greatest authors of all time and discover
                  why they're beloved worldwide.
               </p>
            </div>

            <ul className={styles.authorsList}>
               {authorsList.map((author) => (
                  <li key={author.name} className={styles.authorContent}>
                     <Image
                        width="255px"
                        src={author.image}
                        alt={author.name}
                     />
                     <div className={styles.authorDesc}>
                        <h2>{author.name}</h2>
                        <p>{author.description}</p>
                        <Link to={`/author/${author.name}`}>Read more</Link>
                     </div>
                  </li>
               ))}
            </ul>
         </section>
      </section>
   );
}

export default Home;

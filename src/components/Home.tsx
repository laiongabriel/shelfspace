import Head from "./helper/Head";
import styles from "../styles/Home.module.scss";
import { Link } from "react-router-dom";
import { classicsList, authorsList } from "../homeLists";
import Image from "./helper/Image";
import HomeImg from "../assets/img/home-img-test.svg";
import React from "react";

function Home() {
   const classicsDiv = React.useRef<HTMLDivElement>(null);

   function handleExploreClick(e: React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault();
      classicsDiv.current?.scrollIntoView({
         behavior: "smooth",
         block: "start",
      });
   }

   return (
      <section className="animeLeft" style={{ animationDuration: "0.7s" }}>
         <Head title="Home" />
         <div className={styles.homeIntro}>
            <div className={`${styles.homeIntroDesc}`}>
               <h1>Welcome to ShelfSpace!</h1>
               <p>
                  Discover, organize, and access your favorite books with ease
                  on your personal virtual bookshelf. Begin your reading journey
                  today and take your literary experience to new heights!
               </p>
               <button className="button" onClick={handleExploreClick}>
                  Explore now!
               </button>
            </div>

            <img
               src={HomeImg}
               alt="Young girl reading a book"
               className={styles.homeImg}
            />
         </div>

         <section
            className={`${styles.classicsListContainer}`}
            ref={classicsDiv}
         >
            <div className={styles.classicsDesc}>
               <h1>World literature classics that you might enjoy.</h1>
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
                        <div className={styles.classicInfo}>
                           <p className={styles.classicTitle}>{book.title}</p>
                           <p className={styles.classicAuthor}>{book.author}</p>
                        </div>
                     </Link>
                  </li>
               ))}
            </ul>
         </section>

         <section>
            <div className={styles.authorsDesc}>
               <h1>Some of the greatest authors of all time.</h1>
               <p>
                  Explore works by the greatest authors of all time and discover
                  why they're beloved worldwide.
               </p>
            </div>

            <ul className={styles.authorsList}>
               {authorsList.map((author) => (
                  <li key={author.name} className={styles.authorContent}>
                     <Image
                        width="250px"
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

         <section className={styles.readingContainer}>
            <div className={styles.readingDesc}>
               <h1>The importance of reading</h1>
               <p>The benefits of losing yourself in a good book!</p>
            </div>

            <div className={styles.readingList}>
               <div>
                  <h2>📚 Expanding knowledge</h2>
                  <p>
                     Reading allows us to gain knowledge on a wide range of
                     topics, whether it's through reading non-fiction or
                     immersing ourselves in a fictional world. By reading, we
                     can learn about new ideas, perspectives, and cultures,
                     ultimately broadening our understanding of the world around
                     us.
                  </p>
               </div>

               <div>
                  <h2>🧠 Improved mental health</h2>
                  <p>
                     Reading has been shown to have positive effects on mental
                     health, such as reducing stress levels, improving memory
                     retention, and boosting creativity. Additionally, reading
                     can serve as a form of escapism and relaxation, providing a
                     much-needed break from the stresses of everyday life.
                  </p>
               </div>

               <div>
                  <h2>🤝 Increased empathy</h2>
                  <p>
                     Reading allows us to experience different perspectives and
                     walk in the shoes of others, leading to increased empathy
                     and understanding. Through reading, we can learn about
                     diverse experiences and cultures, ultimately becoming more
                     accepting and compassionate individuals.
                  </p>
               </div>

               <div>
                  <h2>💪 Personal growth</h2>
                  <p>
                     Reading can also serve as a tool for personal growth,
                     helping us to develop new skills and achieve our goals.
                     Whether it's reading self-help books or learning about
                     different industries, reading can inspire us to take action
                     and make positive changes in our lives.
                  </p>
               </div>

               <div>
                  <h2>🌟 Increased creativity</h2>
                  <p>
                     Reading can spark our imagination and creativity,
                     transporting us to new worlds and ideas. By exposing
                     ourselves to different writing styles and genres, we can
                     expand our own writing abilities and develop new ways of
                     expressing ourselves. Additionally, reading can inspire us
                     to explore new hobbies and interests, leading to a more
                     fulfilling and creative life.
                  </p>
               </div>

               <div>
                  <h2>👥 Social connection</h2>
                  <p>
                     Reading can also serve as a way to connect with others,
                     whether it's through joining a book club or discussing a
                     book with a friend. By sharing our thoughts and
                     perspectives on what we've read, we can build deeper
                     connections and relationships with others. Reading can
                     introduce us to new ideas and perspectives, allowing us to
                     engage in meaningful conversations and broaden our social
                     horizons.
                  </p>
               </div>
            </div>
         </section>
      </section>
   );
}

export default Home;

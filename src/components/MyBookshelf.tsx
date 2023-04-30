import React from "react";
import { UserBookList } from "../types";
import Image from "./helper/Image";
import styles from "../styles/MyBookshelf.module.scss";
import { Link } from "react-router-dom";
import Head from "./helper/Head";

function MyBookshelf() {
   const [bookList, setBookList] = React.useState<UserBookList[] | null>(null);
   const userName = localStorage.getItem("userName");
   const localList = localStorage.getItem("userBookList");

   React.useEffect(() => {
      if (localList) setBookList(JSON.parse(localList));
   }, [localList]);

   function removeFromList(id: string, title: string) {
      if (bookList) {
         const bookItem = document.getElementById(id);
         if (
            window.confirm(
               `Are you sure you want to remove ${title} from your books?`
            )
         ) {
            bookItem!.style.opacity = "0";
            setTimeout(() => {
               const updatedList = bookList.filter((book) => book.id !== id);
               localStorage.setItem(
                  "userBookList",
                  JSON.stringify(updatedList)
               );
               setBookList(updatedList);
            }, 400);
         }
      }
   }

   return (
      <section className={`${styles.myBookshelf} animeUpDown`}>
         <Head title="My Bookshelf" />
         <h1>
            My Bookshelf{" "}
            {bookList && bookList?.length !== 0 && (
               <span className={styles.size}>({bookList?.length})</span>
            )}
         </h1>
         {!userName ? (
            <p>
               <Link to="/create-profile" className={styles.createProfileLink}>
                  Create a profile
               </Link>{" "}
               to start adding books!
            </p>
         ) : bookList?.length ? (
            <ul className={styles.bookList}>
               {bookList.map((book) => (
                  <li key={book.id} className={styles.bookItem} id={book.id}>
                     <Link to={`/book/${book.id}`}>
                        <Image
                           alt={book.title}
                           src={book.image}
                           width="128px"
                           height="199px"
                           heightAuto={true}
                           hover={true}
                        />
                     </Link>
                     <button
                        onClick={() => removeFromList(book.id, book.title)}
                     >
                        Remove
                     </button>
                  </li>
               ))}
            </ul>
         ) : (
            <p>You don't have any books yet!</p>
         )}
      </section>
   );
}

export default MyBookshelf;

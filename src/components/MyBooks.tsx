import React from "react";
import { UserBookList } from "../types/book";
import Image from "./helper/Image";
import styles from "../styles/MyBooks.module.scss";
import { Link } from "react-router-dom";
import Head from "./helper/Head";

function MyBooks() {
   const [bookList, setBookList] = React.useState<UserBookList[] | null>(null);
   const userName = localStorage.getItem("userName");
   const localList = localStorage.getItem("userBookList");

   React.useEffect(() => {
      if (localList) setBookList(JSON.parse(localList));
   }, [localList]);

   function removeFromList(id: string, title: string) {
      if (bookList) {
         if (
            window.confirm(
               `Are you sure you want to remove ${title} from your books?`
            )
         ) {
            const updatedList = bookList.filter((book) => book.id !== id);
            localStorage.setItem("userBookList", JSON.stringify(updatedList));
            setBookList(updatedList);
         }
      }
   }

   return (
      <section className="animeUpDown">
         <Head title="My Books" />
         <h1>You books</h1>
         {!userName ? (
            <p>
               <Link to="/createprofile" className={styles.createProfileLink}>
                  Create a profile
               </Link>{" "}
               to start adding books!
            </p>
         ) : bookList?.length ? (
            <ul className={styles.bookList}>
               {bookList.map((book) => (
                  <li key={book.id} className={styles.bookItem}>
                     <Link to={`/book/${book.id}`}>
                        <Image
                           alt={book.title}
                           src={book.image}
                           width="128px"
                           height="199px"
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

export default MyBooks;

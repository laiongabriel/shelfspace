import React from "react";
import { UserBookList } from "../types";
import Image from "./helper/Image";
import styles from "../styles/MyBookshelf.module.scss";
import { Link } from "react-router-dom";
import Head from "./helper/Head";
import Modal from "./helper/Modal";
import { ReactComponent as RemoveIcon } from "../assets/img/icons/close-search-icon.svg";

function MyBookshelf() {
   const [bookList, setBookList] = React.useState<UserBookList[] | null>(null);
   const [modal, setModal] = React.useState(false);
   const [confirmDelete, setConfirmDelete] = React.useState(false);
   const [bookToDelete, setBookToDelete] = React.useState({
      title: "",
      id: "",
   });
   const userName = localStorage.getItem("userName");
   const localList = localStorage.getItem("userBookList");

   React.useEffect(() => {
      if (localList) setBookList(JSON.parse(localList));
   }, [localList]);

   React.useEffect(() => {
      if (confirmDelete) {
         const bookItem = document.getElementById(bookToDelete.id);
         bookItem!.style.opacity = "0";
         setTimeout(() => {
            const updatedList = bookList!.filter(
               (book) => book.id !== bookToDelete.id
            );
            localStorage.setItem("userBookList", JSON.stringify(updatedList));
            setBookList(updatedList);
         }, 400);
         setConfirmDelete(false);
         setModal(false);
      }
   }, [bookList, bookToDelete.id, confirmDelete]);

   function handleRemoveBook(
      e: React.MouseEvent<SVGSVGElement>,
      id: string,
      title: string
   ) {
      e.preventDefault();
      setBookToDelete({ id, title });
      setModal(true);
   }

   return (
      <section className={`${styles.myBookshelf}`}>
         <Head title="My Bookshelf" />
         {modal && (
            <Modal
               title="Remove book"
               message={`Are you sure you want to remove ${bookToDelete.title} from your bookshelf?`}
               setModal={setModal}
               setConfirmDelete={setConfirmDelete}
            />
         )}
         <div className="animeLeft">
            <h1>
               My Bookshelf{" "}
               {bookList && bookList?.length !== 0 && (
                  <span className={styles.size}>({bookList?.length})</span>
               )}
            </h1>
            {!userName ? (
               <p>
                  <Link
                     to="/create-profile"
                     className={styles.createProfileLink}
                  >
                     Create a profile
                  </Link>{" "}
                  to start adding books!
               </p>
            ) : bookList?.length ? (
               <ul className={styles.bookList}>
                  {bookList.map((book) => (
                     <li key={book.id}>
                        <Link
                           id={book.id}
                           to={`/book/${book.id}`}
                           className={styles.bookItem}
                        >
                           <Image
                              alt={book.title}
                              src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=200-h200`}
                              width="80x"
                              height="122px"
                           />
                           <div className={styles.bookInfo}>
                              <h3 className={styles.bookTitle}>{book.title}</h3>
                              <span className={styles.authorName}>
                                 {book.author}
                              </span>
                              <span className={styles.pageCount}>
                                 {book.pageCount} pages
                              </span>
                           </div>
                           <RemoveIcon
                              aria-label="Remove from bookshelf"
                              className={styles.removeIcon}
                              onClick={(e) =>
                                 handleRemoveBook(e, book.id, book.title)
                              }
                           />
                        </Link>
                     </li>
                  ))}
               </ul>
            ) : (
               <p>You don't have any books yet!</p>
            )}
         </div>
      </section>
   );
}

export default MyBookshelf;

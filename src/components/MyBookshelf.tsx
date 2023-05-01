import React from "react";
import { UserBookList } from "../types";
import Image from "./helper/Image";
import styles from "../styles/MyBookshelf.module.scss";
import { Link } from "react-router-dom";
import Head from "./helper/Head";
import Modal from "./helper/Modal";

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

   function handleRemoveBook(id: string, title: string) {
      setBookToDelete({ id, title });
      setModal(true);
   }

   return (
      <section className={`${styles.myBookshelf}`}>
         <Head title="My Bookshelf" />
         {modal && (
            <Modal
               message={`Are you sure you want to remove ${bookToDelete.title} from your bookshelf?`}
               setModal={setModal}
               setConfirmDelete={setConfirmDelete}
            />
         )}
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
                        onClick={() => handleRemoveBook(book.id, book.title)}
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

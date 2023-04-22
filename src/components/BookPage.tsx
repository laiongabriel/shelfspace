import React from "react";
import { useParams } from "react-router-dom";
import { UserBookList } from "../types/book";
import useFetch from "../hooks/useFetch";
import styles from "../styles/BookPage.module.scss";
import Image from "./helper/Image";
import Head from "./helper/Head";

function BookPage() {
   const { bookId } = useParams();
   const { request, loading, error, book } = useFetch();
   const [isOnList, setIsOnList] = React.useState(false);
   const userName = localStorage.getItem("userName");
   const localList = localStorage.getItem("userBookList");

   React.useEffect(() => {
      request(undefined, undefined, bookId);
   }, [bookId, request]);

   React.useEffect(() => {
      if (localList) {
         const parsedLocalList: UserBookList[] = JSON.parse(localList);
         const bookOnList = parsedLocalList.some(
            (userBook) => userBook.id === bookId
         );
         setIsOnList(bookOnList);
      }
   }, [bookId, localList]);

   function toggleList() {
      const bookToAdd = {
         id: book?.id,
         title: book?.volumeInfo.title,
         image: book?.volumeInfo.imageLinks.thumbnail,
         author: book?.volumeInfo.authors,
      };
      if (isOnList && localList) {
         const parsedLocalList: UserBookList[] = JSON.parse(localList);
         const updatedList = parsedLocalList.filter(
            (userBook) => userBook.id !== bookId
         );
         localStorage.setItem("userBookList", JSON.stringify(updatedList));
         setIsOnList(false);
      } else {
         if (localList) {
            const parsedLocalList: UserBookList[] = JSON.parse(localList);
            localStorage.setItem(
               "userBookList",
               JSON.stringify([...parsedLocalList, bookToAdd])
            );
         } else {
            localStorage.setItem("userBookList", JSON.stringify([bookToAdd]));
         }
         setIsOnList(true);
      }
   }

   if (loading) return <div className="loading"></div>;
   if (error) return <div>{error}</div>;
   if (book)
      return (
         <section className={styles.bookPageContainer}>
            <Head title={book.volumeInfo.title} />
            <div className={styles.bookPageLeft}>
               <Image
                  className={styles.bookImage}
                  alt={book.volumeInfo.title}
                  src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w240-h345`}
                  width="228px"
                  height="345px"
               />
               <div className={styles.bookActions}>
                  {userName ? (
                     <button onClick={toggleList}>
                        {isOnList
                           ? "Remove from your books"
                           : "Add to your books"}
                     </button>
                  ) : (
                     <p>create a profile to start adding books!</p>
                  )}
               </div>
            </div>

            <div className={styles.bookPageRight}>
               <h1 className={styles.bookTitle}>
                  {book.volumeInfo.subtitle
                     ? `${book.volumeInfo.title}: ${book.volumeInfo.subtitle}`
                     : book.volumeInfo.title}
               </h1>
               <p>
                  by{" "}
                  {book.volumeInfo.authors.map((author) => author).join(", ")}
               </p>
               <p>{book.volumeInfo.pageCount} pages</p>
               <p
                  dangerouslySetInnerHTML={{
                     __html: book.volumeInfo.description,
                  }}
               ></p>
            </div>
         </section>
      );
   else return null;
}

export default BookPage;

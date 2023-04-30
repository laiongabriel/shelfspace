import React from "react";
import { Link, useParams } from "react-router-dom";
import { UserBookList } from "../types";
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
   if (error) return <p>{error}</p>;
   if (book)
      return (
         <section className={`${styles.bookPageContainer} animeLeft`}>
            <Head
               title={`${book.volumeInfo.title} by ${book.volumeInfo.authors[0]}`}
            />
            <div className={styles.bookPageLeft}>
               <Image
                  alt={book.volumeInfo.title}
                  src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w512-h512`}
                  width="228px"
                  height="350px"
                  heightAuto={true}
               />
               <div className={styles.bookActions}>
                  {userName ? (
                     <button onClick={toggleList}>
                        {isOnList
                           ? "Remove from your shelf"
                           : "Add to your shelf"}
                     </button>
                  ) : (
                     <p>
                        <Link
                           to="/create-profile"
                           className={styles.createProfileLink}
                        >
                           Create a profile
                        </Link>{" "}
                        to start adding books!
                     </p>
                  )}
               </div>
            </div>

            <div className={styles.bookPageRight}>
               <h1 className={styles.bookTitle}>
                  {book.volumeInfo.subtitle
                     ? `${book.volumeInfo.title}: ${book.volumeInfo.subtitle}`
                     : book.volumeInfo.title}
               </h1>

               <div>
                  by{" "}
                  {book.volumeInfo.authors.map((author, index) => (
                     <React.Fragment key={index}>
                        <Link to={`/author/${author.replace(/\s+/g, "_")}`}>
                           <span className={styles.authorName}>{author}</span>
                        </Link>
                        {index < book.volumeInfo.authors.length - 1 && ", "}
                     </React.Fragment>
                  ))}
               </div>

               <p>
                  Published by {book.volumeInfo.publisher} in{" "}
                  {book.volumeInfo.publishedDate?.replace(/^(\d{4}).*$/, "$1")}
               </p>
               <p>{book.volumeInfo.pageCount} pages</p>
               <h2>About this book</h2>
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

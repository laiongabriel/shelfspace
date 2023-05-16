import React from "react";
import { Link } from "react-router-dom";
import Image from "../helper/Image";
import useFetch from "../../hooks/useFetch";
import styles from "../../styles/author/AuthorBooks.module.scss";

function AuthorBooks({ authorName }: { authorName: string }) {
   const { request, loading, bookList } = useFetch();

   React.useEffect(() => {
      if (authorName) request("?q=", authorName);
   }, [authorName, request]);

   return (
      <section className={styles.booksListContainer}>
         <h1>Some books by {authorName}</h1>
         {loading ? (
            <div className="loading"></div>
         ) : (
            <ul className={styles.booksList}>
               {bookList &&
                  bookList.map((book) => (
                     <li key={book.id}>
                        <Link to={`/book/${book.id}`}>
                           <Image
                              alt={book.volumeInfo.title}
                              src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w500-h500`}
                              width="128px"
                              height="199px"
                              heightAuto={true}
                              hover={true}
                           />
                        </Link>
                     </li>
                  ))}
            </ul>
         )}
      </section>
   );
}

export default AuthorBooks;

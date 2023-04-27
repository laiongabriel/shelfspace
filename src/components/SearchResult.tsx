import React from "react";
import useFetch from "../hooks/useFetch";
import styles from "../styles/SearchResult.module.scss";
import { Link, useLocation } from "react-router-dom";
import Image from "./helper/Image";
import Head from "./helper/Head";

function SearchResult() {
   const { bookList, loading, error, request } = useFetch();
   const location = useLocation();

   React.useEffect(() => {
      request(location.search);
   }, [location.search, request]);

   if (loading) return <div className="loading"></div>;
   if (error || !bookList?.length) return <h1>Nothing found!</h1>;
   return (
      <section className="animeUpDown">
         <Head title="Search result" />
         <h1>Search result</h1>
         <ul className={styles.searchResult}>
            {bookList?.map((book) => (
               <li key={book.id} className={styles.book}>
                  <Link to={`/book/${book.id}`}>
                     <Image
                        alt={book.volumeInfo.title}
                        src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w512-h512`}
                        width="128px"
                        height="186px"
                        hover={true}
                     />
                  </Link>
                  <div className={styles.bookInfo}>
                     <Link to={`/book/${book.id}`} className={styles.bookTitle}>
                        {book.volumeInfo.subtitle ? (
                           <h3>
                              {book.volumeInfo.title}:{" "}
                              {book.volumeInfo.subtitle}
                           </h3>
                        ) : (
                           <h3>{book.volumeInfo.title}</h3>
                        )}
                     </Link>

                     <p>
                        by{" "}
                        {book.volumeInfo.authors
                           .map((author) => author)
                           .join(", ")}
                     </p>
                     <p>{book.volumeInfo.pageCount} pages</p>
                     <p>Published by {book.volumeInfo.publisher}</p>
                  </div>
               </li>
            ))}
         </ul>
      </section>
   );
}

export default SearchResult;

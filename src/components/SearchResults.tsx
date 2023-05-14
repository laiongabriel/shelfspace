import React from "react";
import useFetch from "../hooks/useFetch";
import styles from "../styles/SearchResults.module.scss";
import { Link, useLocation } from "react-router-dom";
import Image from "./helper/Image";
import Head from "./helper/Head";

function SearchResults() {
   const { bookList, loading, error, request } = useFetch();
   const location = useLocation();

   React.useEffect(() => {
      window.scrollTo(0, 0);
      request(location.search);
   }, [location.search, request]);

   if (loading) return <div className="loading"></div>;
   if (error || !bookList?.length) return <h1>Nothing found!</h1>;
   return (
      <section className={`${styles.searchResults} animeUpDown`}>
         <Head title="Search results" />
         <h1>Search results</h1>
         <ul>
            {bookList?.map((book) => (
               <li key={book.id} className={styles.book}>
                  <Link to={`/book/${book.id}`}>
                     <Image
                        alt={book.volumeInfo.title}
                        src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w512-h512`}
                        width="128px"
                        heightAuto={true}
                        hover={true}
                     />
                  </Link>
                  <div className={styles.bookInfo}>
                     <Link to={`/book/${book.id}`} className={styles.bookTitle}>
                        {book.volumeInfo.subtitle ? (
                           <h3>{book.volumeInfo.title}</h3>
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
                     <p>Published by {book.volumeInfo.publisher}</p>
                     <p>{book.volumeInfo.pageCount} pages</p>
                     {book.volumeInfo.averageRating && (
                        <p>{book.volumeInfo.averageRating} avg rating</p>
                     )}
                  </div>
               </li>
            ))}
         </ul>
      </section>
   );
}

export default SearchResults;

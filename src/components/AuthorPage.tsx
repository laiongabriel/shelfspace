import React from "react";
import { Link, useParams } from "react-router-dom";
import Head from "./helper/Head";
import useFetch from "../hooks/useFetch";
import { Author } from "../types";
import Image from "./helper/Image";
import styles from "../styles/AuthorPage.module.scss";

function AuthorPage() {
   const [authorInfo, setAuthorInfo] = React.useState<Author | null>(null);
   const { authorName } = useParams();
   const { request, bookList } = useFetch();

   React.useEffect(() => {
      async function getAuthorInfo(authorName: string) {
         const response = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${authorName}`
         );
         const json: Author = await response.json();
         setAuthorInfo(json);
      }
      if (authorName) getAuthorInfo(authorName);
   }, [authorName]);

   React.useEffect(() => {
      if (authorInfo) request("?q=", authorInfo.title);
   }, [authorInfo, request]);

   if (!bookList || !authorInfo) return <div className="loading"></div>;
   if (authorInfo.title === "Not found.")
      return <p>This author does not exist in our database.</p>;
   return (
      <section className="animeLeft">
         <Head title={`${authorName?.replaceAll("_", " ")}`} />
         {authorInfo && (
            <div className={styles.authorContainer}>
               <section className={styles.authorInfo}>
                  {authorInfo.thumbnail && (
                     <Image
                        alt={authorInfo.title}
                        src={authorInfo.thumbnail.source}
                        width={String(authorInfo.thumbnail.width)}
                        heightAuto={true}
                     />
                  )}
                  <div className={styles.authorDesc}>
                     <h1>{authorInfo.title}</h1>
                     <p>{authorInfo.description}</p>
                     <p>{authorInfo.extract}</p>
                  </div>
               </section>

               <section className={styles.booksListContainer}>
                  <h1>Some books by {authorInfo.title}</h1>
                  <ul className={styles.booksList}>
                     {bookList &&
                        bookList.map((book) => (
                           <li key={book.id}>
                              <Link to={`/book/${book.id}`}>
                                 <Image
                                    alt={book.volumeInfo.title}
                                    src={book.volumeInfo.imageLinks.thumbnail}
                                    heightAuto={true}
                                    hover={true}
                                 />
                              </Link>
                           </li>
                        ))}
                  </ul>
               </section>
            </div>
         )}
      </section>
   );
}

export default AuthorPage;

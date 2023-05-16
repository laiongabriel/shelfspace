import React from "react";
import Head from "../helper/Head";
import { useParams } from "react-router-dom";
import { Author } from "../../types";
import Image from "../helper/Image";
import styles from "../../styles/author/AuthorPage.module.scss";
import AuthorBooks from "./AuthorBooks";

function AuthorPage() {
   const [authorInfo, setAuthorInfo] = React.useState<Author | null>(null);
   const [error, setError] = React.useState("");
   const [loading, setLoading] = React.useState(false);
   const { authorName } = useParams();

   React.useEffect(() => {
      async function getAuthorInfo(authorName: string) {
         try {
            setLoading(true);
            const response = await fetch(
               `https://en.wikipedia.org/api/rest_v1/page/summary/${authorName}`
            );
            if (!response.ok)
               throw new Error(
                  "An error has occurred. This author probably does not exist in our database."
               );
            const json: Author = await response.json();
            setAuthorInfo(json);
         } catch (error) {
            if (error instanceof Error) setError(error.message);
         } finally {
            setLoading(false);
         }
      }
      if (authorName) getAuthorInfo(authorName);
   }, [authorName]);

   if (loading) return <div className="loading"></div>;
   if (error) return <p>{error}</p>;
   if (authorInfo?.title === "Not found.")
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
                        height={String(authorInfo.thumbnail.height)}
                        heightAuto={true}
                     />
                  )}
                  <div>
                     <h1>{authorInfo.title}</h1>
                     <p>{authorInfo.description}</p>
                     <p>{authorInfo.extract}</p>
                  </div>
               </section>
               <AuthorBooks authorName={authorInfo.title} />
            </div>
         )}
      </section>
   );
}

export default AuthorPage;

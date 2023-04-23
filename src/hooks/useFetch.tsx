import React from "react";
import { Book } from "../types/book";

function useFetch() {
   const [bookList, setBookList] = React.useState<Book[] | null>(null);
   const [book, setBook] = React.useState<Book | null>(null);
   const [error, setError] = React.useState<string | null>(null);
   const [loading, setLoading] = React.useState(false);

   const request = React.useCallback(
      async (value?: string, author?: string, bookId?: string) => {
         const baseUrl = "https://www.googleapis.com/books/v1/volumes";
         let finalUrl;

         if (author) {
            finalUrl = `${baseUrl + value}+inauthor:${author}`;
         } else if (bookId) {
            finalUrl = `${baseUrl}/${bookId}`;
         } else finalUrl = `${baseUrl + value}&filter=ebooks&maxResults=15`;

         try {
            setError(null);
            setLoading(true);
            const response = await fetch(finalUrl);
            const json = await response.json();
            if (bookId) {
               setBook(json as Book);
            } else {
               const bookList: Book[] = json.items;
               const filteredList = bookList.filter(
                  ({ volumeInfo }) =>
                     volumeInfo.imageLinks &&
                     volumeInfo.authors &&
                     volumeInfo.description &&
                     volumeInfo.pageCount &&
                     volumeInfo.publisher
               );
               setBookList(filteredList);
            }
         } catch (error) {
            if (error instanceof Error) setError(error.message);
         } finally {
            setLoading(false);
         }
      },
      []
   );

   return {
      book,
      bookList,
      error,
      loading,
      request,
   };
}

export default useFetch;

export interface Book {
   id: string;
   volumeInfo: {
      title: string;
      subtitle: string;
      authors: string[];
      pageCount: number;
      description: string;
      publisher: string;
      publishedDate: string;
      imageLinks: {
         thumbnail: string;
      };
   };
}

export interface UserBookList {
   id: string;
   title: string;
   image: string;
   author: string[];
}

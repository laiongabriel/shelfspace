export interface Book {
   error?: {
      code: number;
   };
   id: string;
   volumeInfo: {
      title: string;
      subtitle: string;
      authors: string[];
      pageCount: number;
      description: string;
      publisher: string;
      publishedDate?: string;
      categories: string[];
      averageRating: number;
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
   pageCount: number;
}

export interface Author {
   title: string;
   description: string;
   extract: string;
   thumbnail: {
      height: number;
      width: number;
      source: string;
   };
   originalimage: {
      source: string;
   };
}

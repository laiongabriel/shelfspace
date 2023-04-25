import React from "react";

interface HeadProps {
   title: string;
   description?: string;
   ogImage?: string;
}

function Head({ title, description, ogImage }: HeadProps) {
   React.useEffect(() => {
      document.title = title + " | ShelfSpace";
      document
         .querySelector("meta[name='description']")
         ?.setAttribute("content", description || "");
      document
         .querySelector("meta[property='og:image']")
         ?.setAttribute("content", ogImage || "");
   }, [description, ogImage, title]);

   return null;
}

export default Head;

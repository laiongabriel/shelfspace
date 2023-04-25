import React from "react";

interface HeadProps {
   title?: string;
   description?: string;
   ogImage?: string;
}

function Head({ title, description, ogImage }: HeadProps) {
   React.useEffect(() => {
      if (title) {
         document.title = title + " | ShelfSpace";
         document
            .querySelector("meta[name='og:title']")
            ?.setAttribute("content", title || "");
      }
      if (description) {
         document
            .querySelector("meta[name='description']")
            ?.setAttribute("content", description || "");
         document
            .querySelector("meta[name='og:description']")
            ?.setAttribute("content", description || "");
      }
      if (ogImage) {
         document
            .querySelector("meta[name='og:image']")
            ?.setAttribute("content", ogImage || "");
      }
   }, [description, ogImage, title]);

   return null;
}

export default Head;

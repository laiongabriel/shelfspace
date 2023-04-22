import React from "react";

interface HeadProps {
   title: string;
   description?: string;
}

function Head({ title, description }: HeadProps) {
   React.useEffect(() => {
      document.title = title + " | ShelfSpace";
      document
         .querySelector("meta[name='description'")
         ?.setAttribute("content", description || "");
   }, [description, title]);

   return <></>;
}

export default Head;

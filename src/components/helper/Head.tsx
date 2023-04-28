import React from "react";

interface HeadProps {
   title?: string;
}

function Head({ title }: HeadProps) {
   React.useEffect(() => {
      document.title = title + " - ShelfSpace";
   }, [title]);

   return null;
}

export default Head;

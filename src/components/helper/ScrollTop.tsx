import React from "react";
import { useLocation } from "react-router-dom";

function ScrollTop() {
   const location = useLocation();

   React.useEffect(() => {
      window.scrollTo(0, 0);
   }, [location.pathname, location.search]);

   return null;
}

export default ScrollTop;

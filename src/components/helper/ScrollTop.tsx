import React from "react";
import { useLocation } from "react-router-dom";

function ScrollTop() {
   const location = useLocation();

   React.useEffect(() => {
      window.scrollTo({ top: 0 });
   }, [location.pathname]);

   return null;
}

export default ScrollTop;

import React from "react";
import { useLocation } from "react-router-dom";

function ScrollTop() {
   const location = useLocation();

   React.useEffect(() => {
      window.scrollTo(0, 0);

      // Adiciona um ouvinte de eventos popstate
      const handlePopstate = () => {
         // Rola para o topo da página quando o evento popstate ocorre
         window.scrollTo(0, 0);
      };
      window.addEventListener("popstate", handlePopstate);
   }, [location.pathname, location.search]);

   return null;
}

export default ScrollTop;

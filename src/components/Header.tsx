import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Header.module.scss";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NoPicture from "../assets/img/no-picture.svg";

function Header() {
   const [value, setValue] = React.useState("");
   const navigate = useNavigate();
   const { pathname } = useLocation();
   const userName = window.localStorage.getItem("userName");
   const userPicture = window.localStorage.getItem("userPicture");

   React.useEffect(() => {
      if (pathname !== "/search") setValue("");
   }, [pathname]);

   function scrollToTop() {
      window.scrollTo({
         top: 0,
         left: 0,
         behavior: "smooth",
      });
   }

   return (
      <header className={styles.header}>
         <div className={`${styles.headerContent} container`}>
            <div className={styles.headerLeft}>
               <Link
                  to="/"
                  className={styles.logo}
                  onClick={scrollToTop}
               ></Link>

               <nav>
                  <ul className={styles.navList}>
                     <li>
                        <Link to="/" onClick={scrollToTop}>
                           Home
                        </Link>
                     </li>
                     <li>
                        <Link to="/mybooks">My Books</Link>
                     </li>
                     <li>
                        <Link to="/about">About</Link>
                     </li>
                  </ul>
               </nav>
            </div>

            <div className={styles.headerRight}>
               <div className={styles.search}>
                  <input
                     type="text"
                     placeholder="Search for books or authors"
                     value={value}
                     onChange={({ target }) => setValue(target.value)}
                     onKeyDown={({ key }) =>
                        key === "Enter" && value.length
                           ? navigate(`/search?q=${value}`)
                           : null
                     }
                  />
                  <button
                     onClick={() =>
                        value.length ? navigate(`/search?q=${value}`) : null
                     }
                  ></button>
               </div>
               <div className={styles.profile}>
                  <Link to={userName ? "/profile" : "/createprofile"}>
                     {userPicture ? (
                        <img
                           className={styles.userPicture}
                           src={userPicture}
                           alt=""
                        />
                     ) : userName ? (
                        <img
                           className={styles.userPicture}
                           src={NoPicture}
                           alt=""
                        />
                     ) : (
                        "Create profile"
                     )}
                  </Link>
               </div>
            </div>
         </div>
      </header>
   );
}

export default Header;

import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Header.module.scss";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NoPicture from "../assets/img/no-picture.svg";
import useFetch from "../hooks/useFetch";
import Image from "./helper/Image";

function Header() {
   const [value, setValue] = React.useState("");
   const [isResultOpen, setIsResultOpen] = React.useState(false);
   const userName = window.localStorage.getItem("userName");
   const userPicture = window.localStorage.getItem("userPicture");
   const navigate = useNavigate();
   const { pathname } = useLocation();
   const { request, loading, bookList, setBookList } = useFetch();
   const searchRef = React.useRef<HTMLDivElement>(null);
   const debounceTimer = React.useRef<ReturnType<typeof setTimeout>>();

   React.useEffect(() => {
      if (pathname !== "/search") setValue("");
   }, [pathname]);

   function scrollToTop() {
      window.scrollTo(0, 0);
   }

   React.useEffect(() => {
      function handleOutsideClick(e: MouseEvent) {
         if (!searchRef.current!.contains(e.target as Node)) {
            setBookList(null);
            setIsResultOpen(false);
         }
      }
      document.addEventListener("click", handleOutsideClick);
      return () => {
         document.removeEventListener("click", handleOutsideClick);
      };
   }, [setBookList]);

   function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
      setValue(target.value);
      if (target.value.length) {
         setIsResultOpen(true);
         if (debounceTimer.current) clearTimeout(debounceTimer.current);
         debounceTimer.current = setTimeout(() => {
            request(`?q=${target.value}`);
         }, 200);
      } else {
         setIsResultOpen(false);
         setBookList(null);
      }
   }

   function handleSubmit(
      e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
   ) {
      e.preventDefault();
      if (value.length) {
         setIsResultOpen(false);
         navigate(`/search?q=${value}`);
      }
   }

   return (
      <header className={styles.header}>
         <div className={`${styles.headerContent} container`}>
            <Link to="/" onClick={scrollToTop} className={styles.logo}></Link>

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

            <div className={styles.search} ref={searchRef}>
               <form onSubmit={handleSubmit}>
                  <input
                     type="text"
                     value={value}
                     placeholder="Search for books or authors"
                     onChange={handleChange}
                  />
                  {loading && isResultOpen ? (
                     <div className="loading-header"></div>
                  ) : (
                     <button aria-label="Search icon"></button>
                  )}
               </form>
               {isResultOpen && bookList?.length && value.length ? (
                  <ul className={`${styles.searchResult} animeUpDown`}>
                     {bookList.slice(0, 5).map((book) => (
                        <li>
                           <Link
                              to={`/book/${book.id}`}
                              className={styles.searchResultItem}
                           >
                              <Image
                                 width="48px"
                                 height="72px"
                                 alt={book.volumeInfo.title}
                                 src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w48p-h72p`}
                              />
                              <div className={styles.searchResultItemInfo}>
                                 <p>{book.volumeInfo.title}</p>
                                 <span>{book.volumeInfo.authors[0]}</span>
                              </div>
                           </Link>
                        </li>
                     ))}
                     <button onClick={handleSubmit}>View all results...</button>
                  </ul>
               ) : null}
            </div>

            <div className={styles.profile}>
               <Link to={userName ? "/profile" : "/createprofile"}>
                  {userName && (
                     <>
                        <img
                           className={
                              userPicture
                                 ? styles.userPicture
                                 : styles.noPicture
                           }
                           src={userPicture || NoPicture}
                           alt=""
                        />
                        {userName}
                     </>
                  )}
                  {!userName && "Create profile"}
               </Link>
            </div>
         </div>
      </header>
   );
}

export default Header;

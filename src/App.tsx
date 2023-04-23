import "./App.scss";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchResultPage from "./components/SearchResult";
import BookPage from "./components/BookPage";
import ScrollTop from "./components/helper/ScrollTop";
import Profile from "./components/profile/Profile";
import MyBooks from "./components/MyBooks";
import CreateProfile from "./components/profile/CreateProfile";
import AuthorPage from "./components/AuthorPage";
import NotFound from "./components/helper/NotFound";

function App() {
   return (
      <BrowserRouter>
         <ScrollTop />
         <Header />
         <div className="container">
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="*" element={<NotFound />} />
               <Route path="/search" element={<SearchResultPage />} />
               <Route path="/book/:bookId" element={<BookPage />} />
               <Route path="/profile" element={<Profile />} />
               <Route path="/createprofile" element={<CreateProfile />} />
               <Route path="/mybooks" element={<MyBooks />} />
               <Route path="/author/:authorName" element={<AuthorPage />} />
            </Routes>
         </div>
      </BrowserRouter>
   );
}

export default App;

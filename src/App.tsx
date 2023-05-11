import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import BookPage from "./components/BookPage";
import ScrollTop from "./components/helper/ScrollTop";
import MyBookshelf from "./components/MyBookshelf";
import CreateProfile from "./components/profile/CreateProfile";
import AuthorPage from "./components/author/AuthorPage";
import NotFound from "./components/helper/NotFound";
import Profile from "./components/profile/Profile";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
   return (
      <BrowserRouter>
         <ScrollTop />
         <div className="container">
            <Header />
            <main>
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/book/:bookId" element={<BookPage />} />
                  <Route path="/profile/*" element={<Profile />} />
                  <Route path="/create-profile" element={<CreateProfile />} />
                  <Route path="/my-bookshelf" element={<MyBookshelf />} />
                  <Route path="/author/:authorName" element={<AuthorPage />} />
                  <Route path="*" element={<NotFound />} />
               </Routes>
            </main>
         </div>
         <Footer />
      </BrowserRouter>
   );
}

export default App;

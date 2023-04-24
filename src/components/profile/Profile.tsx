import { Routes, Route } from "react-router-dom";
import UserProfile from "./UserProfile";
import EditProfile from "./EditProfile";
import NotFound from "../helper/NotFound";

function Profile() {
   return (
      <section>
         <Routes>
            <Route path="/" element={<UserProfile />} />
            <Route path="/edit" element={<EditProfile />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </section>
   );
}

export default Profile;

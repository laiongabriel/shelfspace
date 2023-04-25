import { Routes, Route } from "react-router-dom";
import UserProfile from "./UserProfile";
import EditProfile from "./EditProfile";
import NotFound from "../helper/NotFound";

function Profile() {
   return (
      <Routes>
         <Route path="/" element={<UserProfile />} />
         <Route path="/edit" element={<EditProfile />} />
         <Route path="*" element={<NotFound />} />
      </Routes>
   );
}

export default Profile;

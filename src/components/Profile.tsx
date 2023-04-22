import { useNavigate } from "react-router-dom";
import Head from "./helper/Head";

function Profile() {
   const navigate = useNavigate();
   const userName = window.localStorage.getItem("userName");

   function deleteAccount() {
      if (window.confirm("All your books will be deleted! Are you sure?")) {
         localStorage.clear();
         navigate("/");
         window.location.reload();
      }
   }

   return (
      <section>
         <Head title={userName ? `${userName}'s profile` : "Profile"} />
         <div>
            <p>hello, {userName}</p>
            <button onClick={deleteAccount}>delete account</button>
         </div>
      </section>
   );
}

export default Profile;

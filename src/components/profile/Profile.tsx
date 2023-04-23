import { useNavigate } from "react-router-dom";
import Head from "../helper/Head";
import React from "react";

function Profile() {
   const [changingUsername, setChangingUsername] = React.useState(false);
   const [value, setValue] = React.useState("");
   const navigate = useNavigate();
   const userName = localStorage.getItem("userName");

   React.useEffect(() => {
      if (!userName) navigate("/createprofile");
   }, [navigate, userName]);

   function deleteAccount() {
      if (window.confirm("All your books will be deleted! Are you sure?")) {
         localStorage.clear();
         navigate("/");
      }
   }

   function changeUsername(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      if (value.length) {
         localStorage.setItem("userName", value);
         window.location.reload();
      }
   }

   return (
      <section className="animeLeft">
         <Head title={userName ? `${userName}'s profile` : "Profile"} />
         <div>
            {changingUsername ? (
               <form onSubmit={changeUsername}>
                  <input
                     type="text"
                     value={value}
                     maxLength={15}
                     autoFocus
                     onChange={({ target }) => setValue(target.value)}
                  />
                  <button>change</button>
                  <button
                     onClick={() => {
                        setChangingUsername(false);
                        setValue("");
                     }}
                  >
                     cancel
                  </button>
               </form>
            ) : (
               <p>{userName}</p>
            )}
            {!changingUsername && (
               <button onClick={() => setChangingUsername(true)}>
                  change username
               </button>
            )}
            <button onClick={deleteAccount}>delete account</button>
         </div>
      </section>
   );
}

export default Profile;

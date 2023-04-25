import { useNavigate } from "react-router-dom";
import styles from "../../styles/profile/UserProfile.module.scss";
import Head from "../helper/Head";
import React from "react";
import NoPicture from "../../assets/img/no-picture.svg";

function UserProfile() {
   const navigate = useNavigate();
   const userName = localStorage.getItem("userName");
   const userBio = localStorage.getItem("userBio");
   const userPicture = localStorage.getItem("userPicture");

   React.useEffect(() => {
      if (!userName) return navigate("/createprofile");
   }, [navigate, userName]);

   return (
      <section className="animeLeft">
         <Head title={userName ? `${userName}'s profile` : "Profile"} />
         <div>
            <h1>{userName}</h1>
            {userPicture ? (
               <img className="userPicture" src={userPicture} alt="" />
            ) : (
               <img src={NoPicture} alt={userName!} className="noPicture" />
            )}
            {userBio && <p>{userBio}</p>}

            <button onClick={() => navigate("edit")}>Edit profile</button>
         </div>
      </section>
   );
}

export default UserProfile;

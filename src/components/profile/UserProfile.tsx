import { useNavigate } from "react-router-dom";
import styles from "../../styles/profile/UserProfile.module.scss";
import Head from "../helper/Head";
import React from "react";
import NoPicture from "../../assets/img/no-picture.svg";
import { UserBookList } from "../../types";

function UserProfile() {
   const navigate = useNavigate();
   const [userBookList, setUserBookList] = React.useState<
      UserBookList[] | null
   >(null);
   const userName = localStorage.getItem("userName");
   const userBio = localStorage.getItem("userBio");
   const userPicture = localStorage.getItem("userPicture");
   const localList = localStorage.getItem("userBookList");

   React.useEffect(() => {
      if (!userName) return navigate("/createprofile");
      if (localList) setUserBookList(JSON.parse(localList));
   }, [localList, navigate, userName]);

   return (
      <section className={`${styles.userProfile} animeLeft`}>
         <Head title={userName ? `${userName}'s profile` : "Profile"} />

         <div className={styles.userIntro}>
            {userPicture ? (
               <img className="userPicture" src={userPicture} alt="" />
            ) : (
               <img src={NoPicture} alt={userName!} className="noPicture" />
            )}

            <div className={styles.userInfo}>
               <div className={styles.userStats}>
                  <h1>{userName}</h1>
                  <p>{userBookList?.length || 0} books</p>
               </div>

               <button onClick={() => navigate("edit")}>Edit profile</button>
            </div>
         </div>
         {userBio && <p>{userBio}</p>}
      </section>
   );
}

export default UserProfile;

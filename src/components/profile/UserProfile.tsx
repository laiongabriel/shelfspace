import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/profile/UserProfile.module.scss";
import Head from "../helper/Head";
import React from "react";
import NoPicture from "../../assets/img/no-picture.svg";
import { UserBookList } from "../../types";
import UserProfileImage from "../../assets/img/userprofile-img.svg";
import useMedia from "../../hooks/useMedia";

interface Joined {
   month: string;
   year: number;
}

function UserProfile() {
   const navigate = useNavigate();
   const [userBookList, setUserBookList] = React.useState<
      UserBookList[] | null
   >(null);
   const userName = localStorage.getItem("userName");
   const userBio = localStorage.getItem("userBio");
   const userPicture = localStorage.getItem("userPicture");
   const localList = localStorage.getItem("userBookList");
   const joined: Joined = JSON.parse(localStorage.getItem("joined")!);
   const match = useMedia("(max-width: 600px)");

   React.useEffect(() => {
      if (!userName) navigate("/createprofile");
      if (localList) setUserBookList(JSON.parse(localList));
   }, [localList, navigate, userName]);

   return (
      <section className={`${styles.userProfile} animeLeft`}>
         <Head title={`${userName}'s profile`} />
         <div>
            <div className={styles.userIntro}>
               <img
                  src={userPicture ?? NoPicture}
                  alt=""
                  className={userPicture ? "userPicture" : "noPicture"}
               />

               <div className={styles.userInfo}>
                  <h1>
                     {userName}{" "}
                     <button onClick={() => navigate("edit")}>
                        {match ? "Edit profile" : "(edit profile)"}
                     </button>
                  </h1>
                  <p>
                     Joined in {joined.month} {joined.year}
                  </p>
                  <Link to="/my-bookshelf" className={styles.bookNumber}>
                     {userBookList?.length || 0}{" "}
                     {userBookList && userBookList.length === 1
                        ? "book"
                        : "books"}
                  </Link>
               </div>
            </div>

            <div className={styles.userBio}>
               {userBio && (
                  <>
                     <h2>About me</h2>
                     <p>{userBio}</p>
                  </>
               )}
            </div>
         </div>
         <img
            src={UserProfileImage}
            alt=""
            className={styles.userProfileImage}
         />
      </section>
   );
}

export default UserProfile;

import React from "react";
import styles from "../../styles/profile/CreateProfile.module.scss";
import { useNavigate } from "react-router-dom";
import Head from "../helper/Head";
import useCropPicture from "../../hooks/useCropPicture";

function CreateProfile() {
   const [userName, setUserName] = React.useState("");
   const [userBio, setUserBio] = React.useState("");
   const { handleImageChange, croppedPicture } = useCropPicture();
   const navigate = useNavigate();

   React.useEffect(() => {
      if (localStorage.getItem("userName")) navigate("/profile");
   }, [navigate]);

   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      if (userName.length) {
         const date = new Date();
         const month = date.toLocaleString("default", { month: "long" });
         const joined = {
            month,
            year: date.getFullYear(),
         };
         localStorage.setItem("joined", JSON.stringify(joined));
         localStorage.setItem("userName", userName);
         if (croppedPicture)
            localStorage.setItem("userPicture", croppedPicture);
         if (userBio) localStorage.setItem("userBio", userBio);
         navigate("/profile");
      }
   }

   return (
      <section className="animeUpDown">
         <Head title="Create profile" />
         <h1>Join ShelfSpace!</h1>
         <form onSubmit={handleSubmit} className={styles.nameForm}>
            <label htmlFor="username">How would you like to be called?</label>
            <input
               type="text"
               id="username"
               maxLength={15}
               required
               onChange={({ target }) => setUserName(target.value)}
            />
            <label htmlFor="picture">Set your profile picture (optional)</label>
            <input
               type="file"
               accept="image/*"
               id="picture"
               onChange={handleImageChange}
            />
            {croppedPicture && (
               <img src={croppedPicture} alt="" className="userPicture" />
            )}
            <label>Bio (optional)</label>
            <textarea
               cols={50}
               rows={7}
               maxLength={400}
               onChange={({ target }) => setUserBio(target.value)}
            ></textarea>
            <button>let's go</button>
         </form>
      </section>
   );
}

export default CreateProfile;

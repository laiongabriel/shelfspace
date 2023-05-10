import React from "react";
import styles from "../../styles/profile/CreateProfile.module.scss";
import { useNavigate } from "react-router-dom";
import Head from "../helper/Head";
import useCropPicture from "../../hooks/useCropPicture";

function CreateProfile() {
   const [userName, setUserName] = React.useState("");
   const [userBio, setUserBio] = React.useState("");
   const { handleImageChange, croppedPicture, fileName } = useCropPicture();
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
      <section className={`${styles.createProfile} animeUpDown`}>
         <Head title="Create profile" />
         <h1>Join ShelfSpace!</h1>
         <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="username">How should we call you?</label>
            <input
               type="text"
               id="username"
               maxLength={15}
               required
               onChange={({ target }) => setUserName(target.value)}
               className={styles.nameInput}
               placeholder="Enter your username"
            />

            <p>Set your profile picture (optional)</p>

            <div className={styles.uploadPicture}>
               <label htmlFor="picture" className="file">
                  Upload picture
               </label>
               {fileName && <p>{fileName}</p>}
            </div>

            <input
               type="file"
               accept="image/*"
               id="picture"
               onChange={handleImageChange}
               className={styles.fileInput}
            />

            <label htmlFor="bio">Bio (optional)</label>
            <textarea
               id="bio"
               rows={7}
               onChange={({ target }) => setUserBio(target.value)}
               placeholder="Write your bio"
               className={styles.bio}
            ></textarea>
            <button>Submit</button>
         </form>
      </section>
   );
}

export default CreateProfile;

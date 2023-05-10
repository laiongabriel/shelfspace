import React from "react";
import { useNavigate } from "react-router-dom";
import Head from "../helper/Head";
import styles from "../../styles/profile/EditProfile.module.scss";
import useCropPicture from "../../hooks/useCropPicture";
import NoPicture from "../../assets/img/no-picture.svg";
import Modal from "../helper/Modal";

function EditProfile() {
   const [newUserName, setNewUserName] = React.useState("");
   const [newUserBio, setNewUserBio] = React.useState(
      localStorage.getItem("userBio") || ""
   );
   const [modal, setModal] = React.useState(false);
   const [confirmDelete, setConfirmDelete] = React.useState(false);
   const navigate = useNavigate();
   const {
      handleImageChange,
      croppedPicture,
      setCroppedPicture,
      pictureExists,
      setPictureExists,
   } = useCropPicture();

   const userName = localStorage.getItem("userName");
   const userBio = localStorage.getItem("userBio");
   const userPicture = localStorage.getItem("userPicture");

   React.useEffect(() => {
      if (!localStorage.getItem("userName")) navigate("/create-profile");
      if (userPicture) setPictureExists(true);
   }, [navigate, setPictureExists, userPicture]);

   React.useEffect(() => {
      if (confirmDelete) {
         localStorage.clear();
         navigate("/");
      }
   }, [confirmDelete, navigate]);

   function removePicture() {
      localStorage.removeItem("userPicture");
      setPictureExists(false);
      setCroppedPicture("");
   }

   function handleSubmit() {
      if (newUserName) localStorage.setItem("userName", newUserName);
      if (croppedPicture) localStorage.setItem("userPicture", croppedPicture);
      localStorage.setItem("userBio", newUserBio);
      navigate("/profile");
   }

   return (
      <section className={styles.editProfile}>
         <Head title="Edit your profile" />
         {modal && (
            <Modal
               title="Delete profile"
               message="All your books will be deleted! Are you sure?"
               setConfirmDelete={setConfirmDelete}
               setModal={setModal}
            />
         )}
         <div className="animeLeft">
            <h1>Edit your profile</h1>

            <div className={styles.profilePictureSection}>
               <img
                  src={croppedPicture || userPicture || NoPicture}
                  alt={userName!}
                  className={
                     croppedPicture || userPicture ? "userPicture" : "noPicture"
                  }
               />

               <div>
                  <label htmlFor="picture" className="file">
                     Upload picture
                  </label>
                  <input
                     id="picture"
                     type="file"
                     accept="image/*"
                     onChange={handleImageChange}
                  />

                  <button disabled={!pictureExists} onClick={removePicture}>
                     Remove picture
                  </button>
               </div>
            </div>

            <label htmlFor="username">Username</label>
            <input
               type="text"
               id="username"
               maxLength={15}
               defaultValue={userName!}
               onChange={({ target }) => setNewUserName(target.value)}
               placeholder="Edit your username"
            />
            <label htmlFor="bio">Bio</label>
            <textarea
               id="bio"
               rows={7}
               defaultValue={userBio ?? ""}
               onChange={({ target }) => setNewUserBio(target.value)}
               placeholder="Edit your bio"
            ></textarea>

            <div className={styles.finalActions}>
               <button
                  onClick={handleSubmit}
                  className={styles.saveChangesButton}
               >
                  Save changes
               </button>
               <button
                  onClick={() => setModal(true)}
                  className={styles.deleteProfileButton}
               >
                  Delete profile
               </button>
            </div>
         </div>
      </section>
   );
}

export default EditProfile;

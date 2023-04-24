import React from "react";
import { useNavigate } from "react-router-dom";
import Head from "../helper/Head";
import styles from "../../styles/profile/EditProfile.module.scss";
import useCropPicture from "../../hooks/useCropPicture";
import NotLoggedIn from "../../assets/img/not-logged-in.svg";

function EditProfile() {
   const [newUserName, setNewUserName] = React.useState("");
   const [newUserBio, setNewUserBio] = React.useState("");
   const {
      handleImageChange,
      croppedPicture,
      setCroppedPicture,
      pictureExists,
      setPictureExits,
   } = useCropPicture();
   const navigate = useNavigate();

   const userName = localStorage.getItem("userName");
   const userBio = localStorage.getItem("userBio");
   const userPicture = localStorage.getItem("userPicture");

   React.useEffect(() => {
      if (!localStorage.getItem("userName")) navigate("/createprofile");
      if (userPicture) setPictureExits(true);
   }, [navigate, setPictureExits, userPicture]);

   function removePicture() {
      localStorage.removeItem("userPicture");
      setPictureExits(false);
      setCroppedPicture("");
   }

   function deleteProfile() {
      if (window.confirm("All your books will be deleted! Are you sure?")) {
         localStorage.clear();
         navigate("/");
      }
   }

   function handleSubmit() {
      if (newUserName) localStorage.setItem("userName", newUserName);
      if (croppedPicture) localStorage.setItem("userPicture", croppedPicture);
      if (newUserBio) localStorage.setItem("userBio", newUserBio);
      navigate("/profile");
   }

   return (
      <section className="animeLeft">
         <Head title="Edit your profile" />
         <h1>Edit your profile</h1>
         <label htmlFor="username">Username</label>
         <input
            type="text"
            id="username"
            maxLength={15}
            defaultValue={userName!}
            onChange={({ target }) => setNewUserName(target.value)}
         />
         <label htmlFor="bio">Bio</label>
         <textarea
            id="bio"
            cols={50}
            rows={7}
            defaultValue={userBio ? userBio : ""}
            onChange={({ target }) => setNewUserBio(target.value)}
         ></textarea>

         {!croppedPicture && userPicture ? (
            <img src={userPicture} alt="" className="userPicture" />
         ) : !userPicture && croppedPicture.length ? (
            <img src={croppedPicture} alt="" className="userPicture" />
         ) : (
            <img src={NotLoggedIn} alt="" className="userPicture" />
         )}

         <button disabled={!pictureExists} onClick={removePicture}>
            remove picture
         </button>

         <label>Select a new profile picture</label>
         <input type="file" accept="image/*" onChange={handleImageChange} />

         <button onClick={handleSubmit}>Save changes</button>
         <button onClick={deleteProfile}>Delete profile</button>
      </section>
   );
}

export default EditProfile;

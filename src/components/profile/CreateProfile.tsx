import React from "react";
import styles from "../../styles/profile/CreateProfile.module.scss";
import { useNavigate } from "react-router-dom";

function CreateProfile() {
   const navigate = useNavigate();
   const [value, setValue] = React.useState("");

   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      localStorage.setItem("userName", value);
      navigate("/profile");
   }

   return (
      <section className="animeUpDown">
         <h1>you don't exist yet</h1>
         <form onSubmit={handleSubmit} className={styles.nameForm}>
            <label htmlFor="name">how would you like to be called?</label>
            <input
               type="text"
               id="name"
               maxLength={15}
               required
               value={value}
               onChange={({ target }) => setValue(target.value)}
            />
            <button>let's go</button>
         </form>
      </section>
   );
}

export default CreateProfile;

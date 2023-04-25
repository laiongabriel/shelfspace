import React from "react";

function useCropPicture() {
   const [croppedPicture, setCroppedPicture] = React.useState("");
   const [pictureExists, setPictureExits] = React.useState(false);

   function handleImageChange({ target }: React.ChangeEvent<HTMLInputElement>) {
      if (target.files?.length) {
         if (target.files[0].size > 5 * 1024 * 1024) {
            alert("The file size must be a maximum of 5MB.");
            target.value = "";
         } else {
            const reader = new FileReader();
            reader.onload = () => {
               const base64Image = reader.result;
               if (typeof base64Image === "string") {
                  const img = new Image();
                  img.src = base64Image;
                  img.onload = () => {
                     const canvas = document.createElement("canvas");
                     const ctx = canvas.getContext("2d");
                     const size = Math.min(img.width, img.height);
                     canvas.width = 170;
                     canvas.height = 170;
                     ctx?.drawImage(
                        img,
                        (img.width - size) / 2,
                        (img.height - size) / 2,
                        size,
                        size,
                        0,
                        0,
                        170,
                        170
                     );
                     const croppedImage = canvas.toDataURL();
                     setPictureExits(true);
                     setCroppedPicture(croppedImage);
                  };
               }
            };
            reader.readAsDataURL(target.files[0]);
         }
      }
   }

   return {
      handleImageChange,
      croppedPicture,
      setCroppedPicture,
      pictureExists,
      setPictureExits,
   };
}

export default useCropPicture;

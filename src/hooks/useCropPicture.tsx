import React from "react";

function useCropPicture() {
   const [croppedPicture, setCroppedPicture] = React.useState("");
   const [pictureExists, setPictureExists] = React.useState(false);

   const handleImageChange = React.useCallback(
      ({ target }: React.ChangeEvent<HTMLInputElement>) => {
         if (target.files?.length) {
            const reader = new FileReader();
            reader.onload = () => {
               const base64Image = reader.result;
               const img = new Image();
               img.src = base64Image as string;
               img.onload = () => {
                  const canvas = document.createElement("canvas");
                  const ctx = canvas.getContext("2d");
                  const size = Math.min(img.width, img.height);
                  canvas.width = 150;
                  canvas.height = 150;
                  ctx?.drawImage(
                     img,
                     (img.width - size) / 2,
                     (img.height - size) / 2,
                     size,
                     size,
                     0,
                     0,
                     150,
                     150
                  );
                  const croppedImage = canvas.toDataURL();
                  setPictureExists(true);
                  setCroppedPicture(croppedImage);
               };
            };
            reader.readAsDataURL(target.files[0]);
         }
      },
      []
   );

   return {
      handleImageChange,
      croppedPicture,
      setCroppedPicture,
      pictureExists,
      setPictureExists,
   };
}

export default useCropPicture;

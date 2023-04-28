import React from "react";
import styles from "../../styles/helper/Image.module.scss";

interface ImageProps {
   alt: string;
   src: string;
   width?: string;
   height?: string;
   heightAuto?: boolean;
   hover?: boolean;
}

function Image({ alt, src, width, height, heightAuto, hover }: ImageProps) {
   const [skeleton, setSkeleton] = React.useState(true);

   function handleLoad(e: React.SyntheticEvent<HTMLImageElement>) {
      setSkeleton(false);
      e.currentTarget.style.opacity = "1";
      if (heightAuto) e.currentTarget.style.height = "auto";
   }

   return (
      <div className={styles.wrapper}>
         {skeleton && <div className={styles.skeleton}></div>}
         <img
            className={hover ? styles.hover : ""}
            onLoad={handleLoad}
            src={src}
            alt={alt}
            width={width}
            height={height}
         />
      </div>
   );
}

export default Image;

import React from "react";
import styles from "../../styles/Image.module.scss";

interface ImageProps {
   alt: string;
   src: string;
   width?: string;
   height?: string;
   className?: string;
}

function Image({ alt, src, width, height, className }: ImageProps) {
   const [skeleton, setSkeleton] = React.useState(true);

   function handleLoad(event: React.SyntheticEvent<HTMLImageElement>) {
      setSkeleton(false);
      event.currentTarget.style.opacity = "1";
      event.currentTarget.style.height = "auto";
   }

   return (
      <div className={styles.wrapper}>
         {skeleton && <div className={styles.skeleton}></div>}
         <img
            className={className}
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

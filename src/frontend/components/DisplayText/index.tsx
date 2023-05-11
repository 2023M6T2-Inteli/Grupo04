import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

interface Props {
  image: any;
  displayContent: DisplayContent;
}

export interface DisplayContent {
  title: string;
  text: string;
}

const DisplayText: React.FC<Props> = ({ image, displayContent }) => {
  const container: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex w-full h-[33vh]">
      <div className={`${image && "w-[65vw]"} pl-[5%]`}>
        <h1 className="font-mont select-none pt-16 text-4xl text-blue-gerdau-init">
          {displayContent.title}
        </h1>
        <p className="font-inter pr-28 pt-5 select-none text-base">
          {displayContent.text}
        </p>
      </div>
      {image && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="my-auto"
        >
          <Image src={image} alt="Robo Ola"></Image>
        </motion.div>
      )}
    </div>
  );
};

export default DisplayText;

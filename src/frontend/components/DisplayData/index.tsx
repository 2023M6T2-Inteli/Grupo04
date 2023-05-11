import React from "react";
import InformationCard from "../InformationCard";
import { IconType } from "react-icons";
import { Variants, motion } from "framer-motion";

interface Props {
  cardsContent: CardContent[];
  title: string;
}

export interface CardContent {
  title: string;
  icon: IconType;
  content?: string;
  status?: string;
  operating?: string;
}

const DisplayData: React.FC<Props> = ({ cardsContent, title }) => {
  const container: Variants = {
    hidden: { opacity: 1, scale: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="h-full w-full">
      <h1 className="font-mont pl-[5%] select-none text-4xl text-blue-gerdau-init">
        {title}
      </h1>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="flex gap-3 px-[5%] pt-10 w-full justify-between h-full"
      >
        {cardsContent.map((card) => (
          <InformationCard cardContent={card} />
        ))}
      </motion.div>
    </div>
  );
};

export default DisplayData;

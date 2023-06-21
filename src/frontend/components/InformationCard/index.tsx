import React from "react";
import { CardContent } from "../DisplayData";
import { Icon } from "@chakra-ui/react";
import { Variants, motion } from "framer-motion";

interface Props {
  cardContent: CardContent;
}

const InformationCard: React.FC<Props> = ({ cardContent }) => {
  const item: Variants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={item}
      className="flex-grow w-[10%] h-[19%] rounded-2xl shadow-custom select-none"
    >
      <h1 className="mt-[5%] ml-[10%] select-none text-xl text-blue-gerdau-init font-mont">
        {cardContent.title}
      </h1>
      <div className="flex h-max w-ful items-center px-10 pt-3">
        <Icon as={cardContent.icon} w={65} h={65} className=""></Icon>
        {cardContent.content && (
          <div className="flex flex-grow text-4xl font-inter items-center justify-center self-center">
            {cardContent.content}
          </div>
        )}
        {cardContent.operating && cardContent.status && (
          <div className="h-max w-max mx-auto pl-4">
            <div className="flex flex-row font-inter items-center">
              Status:{" "}
              <p className="pl-1 text-green-500">{cardContent.status}</p>
            </div>
            <div className="flex flex-row font-inter items-center">
              Operating:{" "}
              <p className="pl-1 text-red-600">{cardContent.operating}</p>
            </div>
          </div>
        )}
        {cardContent.status && !cardContent.operating && (
          <div className="flex h-max w-max pl-4 mx-auto items-center justify-center">
            Status: <p className="pl-1 text-yellow-400">{cardContent.status}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default InformationCard;

import React from "react";
import { CardContent } from "../HistoryDisplayData";
import { Variants, motion } from "framer-motion";
import { Badge } from '@chakra-ui/react'

interface Props {
  cardContent: CardContent;
}

const HistoryInformationCard: React.FC<Props> = ({ cardContent }) => {
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
      className="flex w-[30%] h-[19%] rounded-3xl shadow-2xl select-none"
    >
        <div className="px-10 pt-5 space-y-1">
            {cardContent.status === "Completed" && (
                <Badge colorScheme="green" fontSize={18}>
                    {cardContent.status}
                </Badge>)
            }
            {cardContent.status === "In Progress" && (
                <Badge colorScheme="yellow" fontSize={18}>
                    {cardContent.status}
                </Badge>)
            }
            <div className="flex flex-row">
                <p className="text-2xl font-inter font-semibold mt-1 mr-2">
                    #{cardContent.id} 
                </p>
                <p className="text-2xl font-inter font-normal mt-1">
                    {cardContent.title}
                </p>
            </div>
            <div className="flex flex-row">
                <p className="text-xl font-inter font-semibold mr-2">
                    Local: 
                </p>
                <p className="text-xl font-inter font-normal">
                    {cardContent.local}
                </p>
            </div>
            <p className="text-lg font-inter font-normal pb-5">
                {cardContent.data} - {cardContent.hour}
            </p>
        </div>
    </motion.div>
  );
};

export default HistoryInformationCard;
import React from "react";
import HistoryInformationCard from "../HistoryInformationCard";
import { Variants, motion } from "framer-motion";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'

interface Props {
    cardsContent: CardContent[];
}

export interface CardContent {
  status?: string;
  id: string;
  title: string;
  local: string;
  data: string;
  hour: string;
}

const HistoryDisplayData: React.FC<Props> = ({ cardsContent }) => {
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

    var allCards = cardsContent.length;
    var finishedCards = cardsContent.filter((card) => card.status === "Completed").length;
    var notFinishedCards = cardsContent.filter((card) => card.status === "In Progress").length;
  
    return (
      <div className="h-full w-full px-10">
          <Tabs variant='enclosed' colorScheme='blue' size='lg'>
            <TabList>
                <Tab fontSize={25}>
                    <div className="flex gap-2">
                        All <Badge colorScheme='blue' size='lg' fontSize={25}>{allCards.toString()}</Badge>
                    </div>
                </Tab>
                <Tab fontSize={25}>
                    <div className="flex gap-2">
                        Finished <Badge colorScheme='blue' size='lg' fontSize={25}>{finishedCards.toString()}</Badge>
                    </div>
                </Tab>
                <Tab fontSize={25}>
                    <div className="flex gap-2">
                        Not Finished <Badge colorScheme='blue' size='lg' fontSize={25}>{notFinishedCards.toString()}</Badge>
                    </div>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={container}
                    className="flex flex-wrap gap-3 px-[5%] pt-10 w-full justify-center h-full"
                >
                    {cardsContent.map((card) => {
                        allCards += 1;
                        return <HistoryInformationCard cardContent={card} />;
                    })}
                </motion.div>
                </TabPanel>
                <TabPanel>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={container}
                    className="flex gap-3 px-[5%] pt-10 w-full justify-center h-full"
                >
                    {cardsContent.map((card) => {
                        if (card.status === "Completed") {
                            finishedCards += 1;
                            return <HistoryInformationCard cardContent={card} />;
                        } else {
                            return null;
                        }
                    })}
                </motion.div>
                </TabPanel>
                <TabPanel>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={container}
                    className="flex gap-3 px-[5%] pt-10 w-full justify-center h-full"
                >
                    {cardsContent.map((card) => {
                        if (card.status === "In Progress") {
                            notFinishedCards += 1;
                            return <HistoryInformationCard cardContent={card} />;
                        } else {
                            return null;
                        }
                    })}
                </motion.div>
                </TabPanel>
            </TabPanels>
          </Tabs>
      </div>
    );
  };
  
  export default HistoryDisplayData;
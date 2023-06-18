import React from "react";
import HeaderDisplay from "../HeaderDisplay";
import DisplayText from "../DisplayText";
import roboOla from "../../assets/RoboOla.svg";
import { DisplayContent } from "../DisplayText";
import DisplayData, { CardContent } from "../DisplayData";
import { BsRobot } from "react-icons/bs";
import { MdSensors } from "react-icons/md";
import { TbMicroscope } from "react-icons/tb";
import { BiDoorOpen } from "react-icons/bi";

const Display: React.FC = () => {
  const displayContent: DisplayContent = {
    title: "WelcomeLayout back!",
    text: "Hello and welcome to Turtle Controller! We're very happy to have you here with us and we hope you have an amazing experience using our platform.",
  };

  const cardContent: CardContent[] = [
    {
      title: "TurtleBot 3",
      icon: BsRobot,
      status: "Connected",
      operating: "No",
    },
    {
      title: "TurtleBot 3 sensors",
      icon: MdSensors,
      status: "Operating",
    },
    {
      title: "Analyzed this month",
      icon: TbMicroscope,
      content: "58",
    },
    {
      title: "Open analysis",
      icon: BiDoorOpen,
      content: "2",
    },
  ];

  return (
    <div className="flex-grow">
      <HeaderDisplay />
      <DisplayText displayContent={displayContent}/>
      <DisplayData title="General Information" cardsContent={cardContent} />
    </div>
  );
};

export default Display;

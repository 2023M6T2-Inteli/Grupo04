import React from "react";
import HeaderDisplay from "../HeaderDisplay";
import DisplayText from "../DisplayText";
import { DisplayContent } from "../DisplayText";
import DisplayData, { CardContent } from "../DisplayData";
import { BsRobot } from "react-icons/bs";
import { MdSensors } from "react-icons/md";
import { TbMicroscope } from "react-icons/tb";
import { BiDoorOpen } from "react-icons/bi";
import { Robot } from "../RobotSelectionBody";
import { axios } from "@/utils/axios";

interface Props {
  robot: Robot;
}

const Display: React.FC<Props> = ({ robot }) => {
  const displayContent: DisplayContent = {
    title: "WelcomeLayout back!",
    text: "Hello and welcome to Turtle Controller! We're very happy to have you here with us and we hope you have an amazing experience using our platform.",
  };

  const cardContent: CardContent[] = [
    {
      title: "TurtleBot 3",
      icon: BsRobot,
      status: robot.active ? "Connected" : "Disconnected",
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
      content: robot.Analyze.length.toString(),
    },
    {
      title: "Open analysis",
      icon: BiDoorOpen,
      content: robot.Analyze.filter((item) => item.status === "Completed").length.toString(),
    },
  ];

  return (
    <div className="flex-grow">
      <HeaderDisplay />
      <DisplayText displayContent={displayContent} />
      <DisplayData title="General Information" cardsContent={cardContent} />
    </div>
  );
};

export const getServerSideProps = async (ctx: any) => {
  const { id } = ctx.params;

  try {
    const res = await axios.get(`/robot/get_robot/${id}`);
    if (res.status === 200) {
      return {
        props: {
          analyze: res.data,
        },
      };
    } else {
      console.log("ERROR!!!!");
      return {
        redirect: {
          destination: "/robotselection",
          permanent: false,
        },
      };
    }
  } catch (err) {
    return {
      redirect: {
        destination: "/robotselection",
        permanent: false,
      },
    };
  }
};

export default Display;

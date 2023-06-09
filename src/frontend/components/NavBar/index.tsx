import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import gerdauLogoBranca from "../../assets/GerdauLogoBranca.svg";
import { Icon } from "@chakra-ui/react";
import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlinePlus, AiOutlineScan } from "react-icons/ai";
import { FaMicroscope } from "react-icons/fa";
import { NavBarOption, NavBarOptions } from "../NavBarOptions";
import { DisplayType } from "@/pages/dashboard/[...id]";
import SignOutButton from "@/components/SignOutButton";
import { Robot } from "../RobotSelectionBody";

interface Props {
  display: DisplayType;
  setDisplay: Dispatch<SetStateAction<DisplayType>>;
  robot: Robot;
}

const NavBar: React.FC<Props> = ({ display, setDisplay, robot }) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const fields: NavBarOption[] = [
    {
      name: "Dashboard",
      icon: <Icon as={MdSpaceDashboard} color={"white"} w={30} h={30} />,
      type: DisplayType.Dashboard,
      color: display === DisplayType.Dashboard ? "blue.300" : "blue-gerdau-mid",
    },
    {
      name: "Add analyze",
      icon: <Icon as={AiOutlinePlus} color={"white"} w={30} h={30} />,
      type: DisplayType.AddAnalyze,
      color: display === DisplayType.AddAnalyze ? "blue.300" : "blue-gerdau-mid",
    },
    {
      name: "History",
      icon: <Icon as={FaMicroscope} color={"white"} w={30} h={30} />,
      type: DisplayType.History,
      color: display === DisplayType.History ? "blue.300" : "blue-gerdau-mid",
    },
    {
      name: "Test robot",
      icon: <Icon as={AiOutlineScan} color={"white"} w={30} h={30} />,
      type: DisplayType.TestRobot,
      color: display === DisplayType.TestRobot ? "blue.300" : "blue-gerdau-mid",
    },
  ];

  const handleHover: () => void = () => {
    if (isHover) return;
    setIsHover(true);
  };

  const handleLeave: () => void = () => {
    setIsHover(false);
  };

  return (
    <div
      className="bg-blue-gerdau-mid w-[7vw] transition-all hover:w-[14vw] justify-between flex flex-col py-6 max-h-full rounded-r-lg"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <Image
        src={gerdauLogoBranca}
        className="mx-auto"
        alt="Gerdau Logo"
      />
      <NavBarOptions
        setDisplay={setDisplay}
        fields={fields}
        isHover={isHover}
      />
      <SignOutButton robot={robot} isHover={isHover} />
    </div>
  );
};

export default NavBar;

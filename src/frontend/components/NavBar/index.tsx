import { useState } from "react";
import Image from "next/image";
import gerdauLogoBranca from "../../assets/GerdauLogoBranca.svg";
import { Icon } from "@chakra-ui/react";
import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlinePlus, AiOutlineScan } from "react-icons/ai";
import { FaMicroscope } from "react-icons/fa";
import { NavBarOption, NavBarOptions } from "../NavBarOptions";
import { motion, Variants } from "framer-motion";

const NavBar: React.FC = () => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const fields: NavBarOption[] = [
    {
      name: "Dashboard",
      icon: <Icon as={MdSpaceDashboard} color={"white"} w={30} h={30} />,
    },
    {
      name: "Start analyze",
      icon: <Icon as={AiOutlinePlus} color={"white"} w={30} h={30} />,
    },
    {
      name: "Dashboard",
      icon: <Icon as={FaMicroscope} color={"white"} w={30} h={30} />,
    },
    {
      name: "Dashboard",
      icon: <Icon as={AiOutlineScan} color={"white"} w={30} h={30} />,
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
      className="bg-blue-gerdau-mid w-[5vw] transition-all hover:w-[12vw] rounded-r-lg"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <Image
        src={gerdauLogoBranca}
        className="mx-auto mt-4 mb-16"
        alt="Gerdau Logo"
      />
      <NavBarOptions fields={fields} isHover={isHover} />
    </div>
  );
};

export default NavBar;

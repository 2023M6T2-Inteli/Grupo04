import Image from "next/image";
import robotImage from "../../assets/TurtleBot.svg";
import { useEffect, useState } from "react";

interface Props {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

const RobotChoice: React.FC<Props> = ({ name, isActive, onClick }) => {
  const borderColor = isActive ? "border-green-500" : "border-gray-500";

  return (
    <div onClick={onClick}
      className={`font-inter items-start flex flex-row place-content-start rounded-lg border-solid border-2 gap-2 lg:gap-0 text-base text-center lg:text-lg select-none hover:border-yellow-400 ${borderColor}`}
    >
      <Image
        src={robotImage}
        className="lg:mx-6 mx-3"
        width={75}
        height={75}
        alt="Robot image"
      />
      <p className="font-inter self-center text-center text-black">{name}</p>
    </div>
  );
};

export default RobotChoice;

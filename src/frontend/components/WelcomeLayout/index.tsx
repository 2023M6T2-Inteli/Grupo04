import Image from "next/image";
import gerdauLogoBlue from "../../assets/GerdauLogoBlue.svg";
import Button from "../Button";
import { ButtonType } from "../Button";
import React from "react";
import { motion } from "framer-motion";
interface Props {
  robotSelection?: boolean;
  link: string;
  children?: React.ReactNode;
  login?: boolean;
}

const WelcomeLayout: React.FC<Props> = ({ link, robotSelection, children, login }) => {
  const container = {
    hidden: { opacity: 1, scale: 0 },
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="flex flex-col h-screen gap-8 px-10 lg:px-20 pt-28 lg:pt-12 lg:pb-11 pb-40 place-content-center col-span-2"
    >
      {robotSelection && (
        <Button text="" type={ButtonType.RollBack} link={"/"} />
      )}
      <Image
        src={gerdauLogoBlue}
        className="mx-auto select-none"
        alt="Gerdau Logo Blue"
      />
      {children}
      {!login && <Button text="Start" type={ButtonType.Home} link={link} />}
    </motion.div>
  );
};

export default WelcomeLayout;

import Image from "next/image";
import gerdauLogoBlue from "../../assets/GerdauLogoBlue.svg";
import Button from "../Button";
import { ButtonType } from "../Button";
import React, { useEffect } from "react";
import LoginBody from "../LoginBody";
import { AuthType } from "../LoginBody";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from '@/utils/axios'
interface Props {
  section: AuthType;
  link: string;
}

async function setRequest(){
  return(axios.get('/todos').then((response) => {
      console.log("teste")
      console.log(response);
      }));
  }

const Login: React.FC<Props> = ({ section, link }) => {
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
      className="flex flex-col h-screen gap-8 px-10 lg:px-20 pt-28 lg:pt-12 lg:pb-32 pb-40 place-content-center col-span-2"
    >
      <Image
        src={gerdauLogoBlue}
        className="mx-auto select-none"
        alt="Gerdau Logo Blue"
      />
      <LoginBody section={section} />
      {section === AuthType.Register && (
        <Button text="Start" type={ButtonType.Request} onClick={() => setRequest()} link='/login' />
      )}
      {section === AuthType.Register && (
        <Button text="Sign In." type={ButtonType.Register} link={link} />
      )}
      {section === AuthType.Home && (
        <Button text="Start" type={ButtonType.Request} link="/dashBoard" />
      )}
      {section === AuthType.Home && (
        <Button text="Sign Up." type={ButtonType.Register} link={link} />
      )}
    </motion.div>
  );
};

export default Login;

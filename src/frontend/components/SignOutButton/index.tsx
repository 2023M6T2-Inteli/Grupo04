import React, { useState } from "react";
import Image from "next/image";
import { BiDoorOpen } from "react-icons/bi";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Button, Icon, Tr } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { MdOutlineChangeCircle } from "react-icons/md";
import robotImage from "@/assets/TurtleBot.svg";
import { useRouter } from "next/router";
import { Robot } from "../RobotSelectionBody";

interface Props {
  isHover: boolean;
  robot: Robot;
}

const SignOutButton: React.FC<Props> = ({ isHover, robot }) => {
  const [switchRobotHover, setSwitchRobotHover] = useState<boolean>(false);

  const router = useRouter();

  const item: Variants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

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

  const handleSignOut = async () => {
    toast.success("Signed out successfully!");
    const res = signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}`,
    });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className={`flex flex-col  justify-end items-center gap-9`}
    >
      <AnimatePresence>
        {isHover ? (
          <>
            <motion.div
              className="flex mx-3 transition-all items-center rounded-md bg-white"
              variants={item}
              onHoverStart={() => setSwitchRobotHover(true)}
              onHoverEnd={() => setSwitchRobotHover(false)}
            >
              {switchRobotHover ? (
                <>
                  <Button
                    _hover={{ bg: "blue.300" }}
                    _active={{ bg: "blue.300" }}
                    fontFamily={"Montserrat"}
                    leftIcon={
                      <Icon
                        as={MdOutlineChangeCircle}
                        color={"white"}
                        w={30}
                        h={30}
                      />
                    }
                    bg={"blue-gerdau-mid"}
                    color={"white"}
                    onClick={() => {
                      router.push("/robotselection");
                    }}
                  >
                    Trocar
                  </Button>
                </>
              ) : (
                <>
                  <Image
                    alt="Robot Image"
                    src={robotImage}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <p className="bg-white pr-2">{robot.name}</p>
                </>
              )}
            </motion.div>
            <motion.div variants={item}>
              <Button
                _hover={{ bg: "blue.300" }}
                _active={{ bg: "blue.300" }}
                fontFamily={"Montserrat"}
                leftIcon={
                  <Icon as={BiDoorOpen} color={"white"} w={30} h={30} />
                }
                bg={"blue-gerdau-mid"}
                color={"white"}
                onClick={() => {
                  handleSignOut();
                }}
              >
                Sign Out
              </Button>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div className="h-auto w-auto" variants={item}>
              <Image
                alt="Robot Image"
                src={robotImage}
                width={40}
                height={40}
                className="rounded-full"
              />
            </motion.div>
            <motion.div
              className={`rounded-r-lg blue-gerdau-mid`}
              variants={item}
            >
              <Icon as={BiDoorOpen} color={"white"} w={30} h={30} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SignOutButton;

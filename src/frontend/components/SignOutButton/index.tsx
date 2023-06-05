import React from 'react';
import {BiDoorOpen} from "react-icons/bi";
import {AnimatePresence, motion, Variants} from "framer-motion";
import {Button, Icon} from "@chakra-ui/react";
import {signOut} from "next-auth/react";
import {toast} from "react-toastify";

interface Props {
    isHover: boolean;
}

const SignOutButton: React.FC<Props> = ({isHover}) => {
    const item: Variants = {
        hidden: {y: 80, opacity: 0},
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    const container: Variants = {
        hidden: {opacity: 1, scale: 1},
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
        toast.success('Signed out successfully!')
        const res = signOut({redirect: true, callbackUrl: `${window.location.origin}`});
    }


    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className={`flex ${isHover ? 'h-[50vh]' : 'h-[57vh]'} justify-center items-end`}
        >
            <AnimatePresence>
                {isHover ? (
                    <motion.div variants={item}>
                        <Button
                            _hover={{bg: "blue.300"}}
                            _active={{bg: "blue.300"}}
                            fontFamily={"Montserrat"}
                            leftIcon={<Icon as={BiDoorOpen} color={"white"} w={30} h={30}/>}
                            bg={"blue-gerdau-mid"}
                            color={"white"}
                            onClick={() => {
                                handleSignOut();
                            }}
                        >
                            Sign Out
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        className={`rounded-r-lg blue-gerdau-mid`}
                        variants={item}
                    >
                        <Icon as={BiDoorOpen} color={"white"} w={30} h={30}/>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    )
}

export default SignOutButton;
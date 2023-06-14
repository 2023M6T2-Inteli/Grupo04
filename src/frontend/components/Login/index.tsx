import Image from "next/image";
import gerdauLogoBlue from "../../assets/GerdauLogoBlue.svg";
import Button, {ButtonType} from "../Button";
import React, {useState} from "react";
import LoginBody from "../LoginBody";
import {SignType} from "../SignForm";
import {motion} from "framer-motion";
import {axios} from '@/utils/axios'
import Link from "next/link";

interface Props {

}

async function setRequest() {
    return (axios.get('/todos').then((response) => {
        console.log("teste")
        console.log(response);
    }));
}

const Login: React.FC<Props> = ({}) => {
    const container = {
        hidden: {opacity: 1, scale: 0},
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    const [sign, setSign] = useState<SignType>(SignType.Login);

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
            {sign === SignType.Register ? (
                <LoginBody signType={sign} text={'Let\'s get started'}
                           header={'Sign Up'}/>) : (
                <LoginBody signType={sign} text={"Welcome Back!"}
                           header={"Sign In"}/>)}
            {sign === SignType.Login && (
                <div className="text-center">
                    <p onClick={() => setSign(SignType.Register)}>{"Don't have" +
                        " an account? "}
                        <span className="mx-auto w-full select-none text-blue-500">
                            {"Sign Up."}
                        </span>
                    </p>
                </div>
            )}
        </motion.div>
    );
};

export default Login;
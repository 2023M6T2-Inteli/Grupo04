import Link from "next/link";
import Image from "next/image";
import arrowBack from "../../assets/Arrow.svg";
import plusButton from "../../assets/PlusButton.svg";
import React from "react";

export enum ButtonType {
    Home,
    RollBack,
    AddRobot,
    Register,
    Login,
    Request
}

interface Props {
    type: ButtonType;
    text: string;
    link?: string;
    onClick?: () => void | string;
}

const Button: React.FC<Props> = ({link, text, type, onClick}) => {
    switch (type) {
        case ButtonType.Home:
            if (link) {
                return (
                    <Link href={link} className="mx-auto w-full select-none">
                        <button
                            className="bg-blue-gerdau-init w-full py-2 text-white text-base lg:text-1xl font-mont font-bold rounded-full">
                            {text}
                        </button>
                    </Link>)
            }
            return (
                <div className="mx-auto w-full select-none">
                    <button
                        className="bg-blue-gerdau-init w-full py-2 text-white text-base lg:text-1xl font-mont font-bold rounded-full">
                        {text}
                    </button>
                </div>)
                ;

        case ButtonType.RollBack:
            if (link) {
                return (
                    <Link href={link} className="self-start">
                        <Image
                            src={arrowBack}
                            alt="Return page"
                            className="self-start select-none"
                        />
                    </Link>
                );
            }
            return (<></>)

        case ButtonType.AddRobot:
            return (
                <button
                    onClick={onClick}
                    className="inline-block self-start select-none"
                >
                    <Image
                        className="inline-block mr-2"
                        src={plusButton}
                        alt="Add button"
                    />
                    <p className="inline-block font-mont text-blue-gerdau-end">
                        Add new robot
                    </p>
                </button>
            );

        default:
            return <></>;
    }
};

export default Button;

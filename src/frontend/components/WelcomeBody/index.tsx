import React from "react";
import Image from "next/image";
import confetti from "../../assets/confetti.svg";

interface Props {}

const WelcomeBody: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <Image
          className="select-none"
          width={60}
          height={60}
          src={confetti}
          alt="Confetti"
        />

        <p className="font-mont  text-blue-gerdau-init font-bold text-lg md:text-3xl flex items-center select-none">
          You're back!!
        </p>
      </div>
      <p className="font-inter text-base text-center lg:text-lg">
        Control robots in confined space inspections with Turtle Controller!
        Monitor and control robots remotely, reduce costs and risks, optimize
        your operations, and ensure safety and precision in the inspections
        performed. Try it now and succeed in your inspections with Turtle
        Controller!
      </p>
    </>
  );
};

export default WelcomeBody;

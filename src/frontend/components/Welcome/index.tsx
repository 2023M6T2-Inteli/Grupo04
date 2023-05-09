import Image from "next/image";
import Link from "next/link";
import gerdauLogoBlue from "../../assets/GerdauLogoBlue.svg";
import confetti from "../../assets/confetti.svg";
import Button from "../Button";
import { ButtonType } from "../Button";

const Welcome = () => {
  return (
    <div className="flex flex-col gap-8 px-10 lg:px-20 pt-28 lg:pt-12 lg:pb-32 pb-3 place-content-center col-span-2">
      <Image src={gerdauLogoBlue} className="mx-auto" alt="Gerdau Logo Blue" />
      <div className="flex items-center justify-center gap-2">
        <div className="flex items-center justify-center">
          <Image width={60} height={60} src={confetti} alt="Confetti" />
        </div>
        <p className="font-mont  text-blue-zero font-bold text-lg md:text-3xl flex items-center">
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
      <Button type={ButtonType.Home} link={"/robotSelection"} />
    </div>
  );
};

export default Welcome;

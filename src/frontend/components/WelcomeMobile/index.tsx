import Image from "next/image";
import Link from "next/link";
import gerdauLogoBlue from "../../assets/GerdauLogoBlue.svg";
import confetti from "../../assets/confetti.svg";

const WelcomeMobile = () => {
  return (
    <div className="grid grid-rows-4 h-screen grid-cols-none place-content-center">
      <div className="relative flex pt-12 border-white place-content-center">
        <Image
          src={gerdauLogoBlue}
          className="absolute bottom-0"
          alt="Gerdau Logo Blue"
        />
      </div>
      <div className="flex h-full w-full items-center justify-center pb-5">
        <div className="flex  items-center justify-center">
          <Image width={60} height={60} src={confetti} alt="Confetti" />
        </div>
        <p className="font-mont h-full text-blue-zero font-bold text-3xl flex items-center">
          You're back!!
        </p>
      </div>
      <div className="flex place-content-center justify-center content-center pb-5">
        <p className="font-inter text-m pr-10 pl-10">
          Control robots in confined space inspections with Turtle Controller!
          Monitor and control robots remotely, reduce costs and risks, optimize
          your operations, and ensure safety and precision in the inspections
          performed. Try it now and succeed in your inspections with Turtle
          Controller!
        </p>
      </div>
      <div className="flex items-center justify-center w-full h-12">
        <Link
          href={"/robotSelection"}
          className="flex w-3/5 h-full content-center justify-center"
        >
          <button className="bg-blue-zero text-white text-2xl font-mont font-bold rounded-full h-full w-full mx-auto">
            Start
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeMobile;

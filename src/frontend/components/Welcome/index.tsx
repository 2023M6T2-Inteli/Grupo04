import Image from "next/image";
import gerdauLogoBlue from "../../assets/GerdauLogoBlue.svg";
import confetti from "../../assets/confetti.svg";
import Button from "../Button";
import { ButtonType } from "../Button";
import React from "react";
import arrowBack from "../../assets/Arrow.svg";
import Link from "next/link";
import RobotChoice from "../RobotChoice";
import plusButton from "../../assets/PlusButton.svg";
import Modal from "../Modal";
import { Field } from "../Modal";

export enum WelcomeType {
  Home,
  Selection,
}

interface Props {
  section: WelcomeType;
  link: string;
}

const Welcome: React.FC<Props> = ({ section, link }) => {
  const [robotChoice, setRobotChoice] = React.useState([
    {
      id: 1,
      name: "Turtle Bot 1",
    },
    {
      id: 2,
      name: "Turtle Bot 2",
    },
  ]);
  const [selectedChoice, setSelectedChoice] = React.useState<number | null>(
    null
  );

  const [createNewRobot, setCreateNewRobot] = React.useState<boolean>(false);

  const handleClick = () => {
    setCreateNewRobot((prev) => !prev);
  };

  const fields: Field = {
    header: "Add new robot",
    inputs: ["Robot name", "Robot IP"],
    button: "Add",
  }

  switch (section) {
    case WelcomeType.Home:
      return (
        <div className="flex flex-col gap-8 px-10 lg:px-20 pt-28 lg:pt-12 lg:pb-32 pb-3 place-content-center col-span-2">
          <Image
            src={gerdauLogoBlue}
            className="mx-auto select-none"
            alt="Gerdau Logo Blue"
          />
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center justify-center select-none">
              <Image width={60} height={60} src={confetti} alt="Confetti" />
            </div>
            <p className="font-mont  text-blue-zero font-bold text-lg md:text-3xl flex items-center select-none">
              You're back!!
            </p>
          </div>
          <p className="font-inter text-base text-center lg:text-lg">
            Control robots in confined space inspections with Turtle Controller!
            Monitor and control robots remotely, reduce costs and risks,
            optimize your operations, and ensure safety and precision in the
            inspections performed. Try it now and succeed in your inspections
            with Turtle Controller!
          </p>
          <Button text="Start" type={ButtonType.Home} link={link} />
        </div>
      );

    case WelcomeType.Selection:
      return (
        <div className="flex flex-col h-screen gap-8 px-10 lg:px-20 pt-28 lg:pt-12 lg:pb-32 pb-40 place-content-center col-span-2">
          <Link href={link} className="self-start">
            <Image
              src={arrowBack}
              alt="Return page"
              className="self-start select-none"
            />
          </Link>
          <Image
            src={gerdauLogoBlue}
            className="mx-auto"
            alt="Gerdau Logo Blue"
          />
          <div className="flex items-center justify-center gap-2">
            <p className="font-mont  text-blue-zero font-bold text-lg md:text-3xl flex items-center select-none">
              Let's Start
            </p>
          </div>
          <p className="block font-mont text-blue-gerdau-end text-xl select-none">Choose the turtle boot:</p>
          <button
            onClick={handleClick}
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
          {createNewRobot && (
            <Modal onClick={handleClick} fields={fields}/>
          )}
          {robotChoice.map((robot) => (
            <RobotChoice
              onClick={() => setSelectedChoice(robot.id)}
              isActive={selectedChoice === robot.id}
              name={robot.name}
            />
          ))}
          <Button text="Next" type={ButtonType.Home} link={link} />
        </div>
      );

    default:
      return <></>;
  }
};

export default Welcome;

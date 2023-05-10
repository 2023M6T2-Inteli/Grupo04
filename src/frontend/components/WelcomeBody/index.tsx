import React from "react";
import Image from "next/image";
import confetti from "../../assets/confetti.svg";
import Button, { ButtonType } from "../Button";
import RobotChoice from "../RobotChoice";
import Modal from "../Modal";
import { Field } from "../Modal";
import { useState } from "react";


export enum WelcomeType {
   Home,
   Selection,
 }


interface Props {
  section: WelcomeType;
}

interface Robot {
   id: number;
   name: string;
 }

const WelcomeBody: React.FC<Props> = ({ section }) => {
  const [robotChoice, setRobotChoice] = useState<Robot[]>([
    {
      id: 1,
      name: "Turtle Bot 1",
    },
    {
      id: 2,
      name: "Turtle Bot 2",
    },
  ]);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const [createNewRobot, setCreateNewRobot] = useState<boolean>(false);

  const handleClick = () => {
    setCreateNewRobot((prev) => !prev);
  };

  const fields: Field = {
    header: "Add new robot",
    inputs: ["Robot name", "Robot IP"],
    button: "Add",
  };

  switch (section) {
    case WelcomeType.Home:
      return (
        <>
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
        </>
      );

    case WelcomeType.Selection:
      return (
        <>
          <div className="flex items-center justify-center gap-2">
            <p className="font-mont  text-blue-zero font-bold text-lg md:text-3xl flex items-center select-none">
              Let's Start
            </p>
          </div>
          <p className="block font-mont text-blue-gerdau-end text-xl select-none">
            Choose the turtle boot:
          </p>
          <Button
            text="Add new robot"
            type={ButtonType.AddRobot}
            link=""
            onClick={handleClick}
          />
          {createNewRobot && <Modal onClick={handleClick} fields={fields} />}
          {robotChoice.map((robot) => (
            <RobotChoice
              onClick={() => setSelectedChoice(robot.id)}
              isActive={selectedChoice === robot.id}
              name={robot.name}
            />
          ))}
        </>
      );
  }
};

export default WelcomeBody;

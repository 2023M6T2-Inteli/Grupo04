import React, { Dispatch, SetStateAction, use, useEffect } from "react";
import Button, { ButtonType } from "../Button";
import RobotChoice from "../RobotChoice";
import ModalHome from "../ModalHome";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

export interface Field {
  header: string;
  inputs: ModalInputs[];
  button: string;
  value?: string;
}

interface Props {
  robotsProps?: Robot[];
  setLinkRedirect?: Dispatch<SetStateAction<string>>;
}

export interface ModalInputs {
  name: string;
  value: string | null;
  setValue: Dispatch<SetStateAction<string | null>>;
}

export interface Robot {
  id: number;
  name: string;
  ip: string;
  createdAt: string;
}

const RobotSelectionBody: React.FC<Props> = ({
  robotsProps,
  setLinkRedirect,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [robotName, setRobotName] = useState<string | null>(null);

  const [robotIp, setRobotIp] = useState<string | null>(null);

  useEffect(() => {
    if (setLinkRedirect) {
      setLinkRedirect(`dashboard/${selectedChoice}`);
    }
  }, [selectedChoice]);

  const fields: Field = {
    header: "Add new robot",
    inputs: [
      {
        name: "Robot name",
        value: robotName,
        setValue: setRobotName,
      },
      {
        name: "Robot IP",
        value: robotIp,
        setValue: setRobotIp,
      },
    ],
    button: "Add",
  };

  const [robots, setRobots] = useState<Robot[] | undefined>(robotsProps);

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <p className="font-mont  text-blue-gerdau-init font-bold text-lg md:text-3xl flex items-center select-none">
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
        onClick={onOpen}
      />
      <ModalHome
        setRobots={setRobots}
        isOpen={isOpen}
        onClose={onClose}
        fields={fields}
      />
      <div className="flex px-2 flex-col gap-2 overflow-x-hidden grow overflow-y-auto">
        {robots &&
          (robots.length === 0 ? (
            <p className="block font-mont text-blue-gerdau-end select-none">
              Add a robot before
            </p>
          ) : (
            robots.map((robot) => (
              <RobotChoice
                onClick={() => setSelectedChoice(robot.id)}
                isActive={selectedChoice === robot.id}
                name={robot.name}
              />
            ))
          ))}
      </div>
    </>
  );
};

export default RobotSelectionBody;

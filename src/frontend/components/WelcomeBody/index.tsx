import React, { Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
import confetti from "../../assets/confetti.svg";
import Button, { ButtonType } from "../Button";
import RobotChoice from "../RobotChoice";
import ModalHome from "../ModalHome";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import axios from '@/utils/axios';

export enum WelcomeType {
  Home,
  Selection,
}

export interface Field {
  header: string;
  inputs: ModalInputs[];
  button: string;
  value?: string
}

interface Props {
  section: WelcomeType;
}

export interface ModalInputs {
  name: string;
  value: string | null;
  setValue: Dispatch<SetStateAction<string | null>>;
}

interface Robot {
  id: number;
  name: string;
  ip: string;
  createdAt: string;
}

const WelcomeBody: React.FC<Props> = ({ section }) => {

  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [robotName, setRobotName] = useState<string | null>(null);

  const [robotIp, setRobotIp] = useState<string | null>(null);

  const fields: Field = {
    header: "Add new robot",
    inputs: [{
      name: "Robot name",
      value: robotName,
      setValue: setRobotName
    }, {
      name: "Robot IP",
      value: robotIp,
      setValue: setRobotIp
    }],
    button: "Add",
  };

  const [robots, setRobots] = useState<Robot[]>([])

  const getRobots = async() => {
    try {
      const response = await axios.get('/get_robots');
      const data =response.data
      console.log(data)
      setRobots(data)
    } catch (error){
      console.log(error);
    }
  }

  useEffect(() => {
    getRobots()
  }, [])


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
            onClick={onOpen}
          />
          <ModalHome isOpen={isOpen} onClose={onClose} fields={fields} />
          {robots.length === 0 ? <p className="block font-mont text-blue-gerdau-end select-none">Add a robot before</p>: (
            robots.map((robot) => (
              <RobotChoice
                onClick={() => setSelectedChoice(robot.id)}
                isActive={selectedChoice === robot.id}
                name={robot.name}
              />
            )))}
        </>
      );
  }
};

export default WelcomeBody;

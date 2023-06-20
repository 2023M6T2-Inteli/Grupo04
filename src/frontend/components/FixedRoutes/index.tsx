import React from "react";
import RouteCard from "../RouteCard";
import { RoutesInterface } from "../SetRoute";
import { Button, Icon } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import DropZone from "../DropZone";

interface Props {
  routes: RoutesInterface[];
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setStepsCompleted: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const FixedRoutes: React.FC<Props> = ({ routes, setFile, setStepsCompleted }) => {
  const arrowBack = (
    <Icon as={IoIosArrowBack} color={"gray.500"} w={30} h={30} />
  );

  const arrowFoward = (
    <Icon as={IoIosArrowForward} color={"gray.500"} w={30} h={30} />
  );

  return (
    <div className="flex flex-grow w-full flex-col items-center justify-center">
      <h1 className="w-auto text-3xl py-4 font-mont text-center text-blue-gerdau-init">
        Set route
      </h1>
      <div className="flex pt-1 gap-2 h-auto justify-center w-full">
        <Button
          className="my-auto"
          background={"white"}
          _hover={{ bg: "white" }}
          _active={{ bg: "white" }}
          leftIcon={arrowBack}
        />
        {routes.map((route) => (
          <RouteCard route={route} />
        ))}
        <Button
          className="my-auto"
          background={"white"}
          _hover={{ bg: "white" }}
          _active={{ bg: "white" }}
          leftIcon={arrowFoward}
        />
      </div>
      <h1 className="text-3xl py-4 font-mont text-center text-blue-gerdau-init">
        Or
      </h1>
      <DropZone setStepsCompleted={setStepsCompleted} setFile={setFile} />
    </div>
  );
};

export default FixedRoutes;

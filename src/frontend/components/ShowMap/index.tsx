import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@chakra-ui/react";

interface Props {
  file: File;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setStepsCompleted: React.Dispatch<React.SetStateAction<boolean[]>>;
  setLive: React.Dispatch<React.SetStateAction<boolean>>;
  analyzeInfo: React.Dispatch<React.SetStateAction<boolean>>
}

interface Circle {
  x: number;
  y: number;
}

const ShowMap: React.FC<Props> = ({
  file,
  setFile,
  setStepsCompleted,
  setLive,
  analyzeInfo,
}) => {
  const [circles, setCircles] = useState<Circle[]>([]);

  const handleClick = (event: any) => {
    console.log(event.clientX, event.clientY);

    const newCircle = {
      x: event.clientX - 570,
      y: event.clientY - 350,
    };

    setCircles((prevCircles) => [...prevCircles, newCircle]);
  };

  return (
    <>
      <div className="relative self-center flex-grow">
        <Image
          src={URL.createObjectURL(file)}
          width={400}
          height={220}
          alt="Image"
          onClick={handleClick}
        />
        {circles.map((circle, index) => (
          <div
            key={index}
            className="absolute w-9 h-9 bg-black rounded-full"
            style={{ left: `${circle.x}px`, top: `${circle.y}px` }}
          />
        ))}
      </div>
      <div className="flex w-4/5 px-7 gap-4  flex-grow">
        <Button
          className="grow"
          color="black"
          borderRadius="full"
          border="1px"
          bg="white"
          fontWeight="bold"
          onClick={() => {
            setStepsCompleted((prev) => {
              prev[1] = false;
              setFile(null);
              return prev;
            });
            setCircles([]);
          }}
        >
          Cancel
        </Button>
        <Button
          className="grow"
          color="white"
          borderRadius="full"
          borderColor="blue-gerdau-mid"
          _hover={{ bg: "blue.800" }}
          bg="blue.600"
          onClick={() => {
            setStepsCompleted((prev) => {
              prev[2] = true;
              setFile(file);
              analyzeInfo(true)
              return prev;
            });
            setCircles([])
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
};
export default ShowMap;

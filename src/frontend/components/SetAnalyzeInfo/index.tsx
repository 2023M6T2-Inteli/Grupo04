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

const ShowInfo: React.FC<Props> = ({
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
      <div className="relative self-center flex-1 w-3/4">
        <p className="w-full font-mont text-blue-zero font-bold text-lg md:text-3xl text-center mb-8">Analyze Information</p>
        <div className="flex-grow">
          <form>
            <label>
              <p className="rounded-full border border-zinc-800 w-full font-inter p-1.5 font-xs mb-4">
                <input
                  className="outline-none ring-0 ml-2"
                  type="text"
                  placeholder="Analyze Name"

                />
              </p>
            </label>
            <div className="flex grid grid-cols-2 gap-2">
              <label className="w-full col-span-1">
                <p className="rounded-full border border-zinc-800 w-full font-inter p-1.5 font-xs mb-4 flex-auto">
                  <input
                    className="w-full outline-none ring-0"
                    type="date"
                    placeholder="Start date"
                  />
                </p>
              </label>

              <label className="w-full col-span-1">
                <p className="rounded-full border border-zinc-800 w-full font-inter p-1.5 font-xs mb-4">
                  <input
                    className="w-full outline-none ring-0"
                    placeholder="End date"
                    type="date"
                  />
                </p>
              </label>
            </div>
            <div className="flex grid grid-cols-2 gap-3">
              <label className="w-full col-span-1">
                <p className="rounded-full border border-zinc-800 w-full font-inter p-1.5 font-xs mb-4">
                  <input
                    className="w-full outline-none ring-0"
                    type="text"
                    placeholder="Supervisor"
                  />
                </p>
              </label>

              <label className="w-full col-span-1" >
                <p className="rounded-full border border-zinc-800 w-full font-inter p-1.5 font-xs mb-4">
                  <input
                    className="w-full outline-none ring-0"
                    type="text"
                    placeholder="Operator"
                  />
                </p>
              </label>
            </div>
          </form>
        </div>

      <div className="flex w-full gap-3 flex-grow">
          <Button
            className="grow"
            color="black"
            borderRadius="full"
            borderColor="white"
            border="1px"
            bg="white"
            fontWeight="bold"
            onClick={() => {
              setStepsCompleted((prev) => {
                prev[2] = false;
                setFile(file);
                analyzeInfo(false)
                return prev;
              });
              setCircles([]);
            }}
          >
            Back
          </Button>
        <Button
          className="grow"
          color="white"
          borderRadius="full"
          borderColor="blue-gerdau-mid"
          _hover={{ bg: "blue.800" }}
          bg="blue.600"
          onClick={() => {setLive(true)}}
        >
          Finish
        </Button>
      </div>
      </div>
    </>
  );
};
export default ShowInfo;

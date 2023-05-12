import React from "react";
import Image from "next/image";
import { Button } from "@chakra-ui/react";

interface Props {
  file: File;
}

const ShowMap: React.FC<Props> = ({ file }) => {
  return (
    <>
      <Image
        className="self-center flex-grow"
        src={URL.createObjectURL(file)}
        width={400}
        height={400}
        alt={"Image"}
      ></Image>
      <div className="flex w-full px-7 gap-8 flex-grow">
        <Button
          className="grow"
          color={"black"}
          borderRadius={"full"}
          border={"4px"}
          bg={"white"}
        >
          Cancel
        </Button>
        <Button
          className="grow"
          color={"white"}
          borderRadius={"full"}
          borderColor={"blue-gerdau-mid"}
          _hover={{ bg: "blue.800" }}
          bg={"blue.600"}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default ShowMap;

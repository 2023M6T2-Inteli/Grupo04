import { useState } from "react";
import { Field } from "../RobotSelectionBody";
import { Icon } from "@chakra-ui/react";
import { AiFillFileAdd } from "react-icons/ai";

interface Props {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setStepsCompleted: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const DropZone: React.FC<Props> = ({ setFile, setStepsCompleted }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragEnter = (event: any) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    setIsDraggingOver(false);
    setStepsCompleted((prev) => {
      prev[1] = true;
      return prev;
    });
    setFile(selectedFile);
  };

  const handleFile = (file: any) => {
    const selectedFile = file.target.files[0];
    setStepsCompleted((prev) => {
      prev[1] = true;
      return prev;
    });
    setFile(selectedFile);
  };

  return (
    <label
      htmlFor="File"
      className={`flex flex-col items-center hover:cursor-pointer justify-center grow w-full border-dashed border-2 ${
        isDraggingOver ? "border-green-500" : "border-gray-500"
      }`}
      style={{ borderRadius: "8px" }}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <AiFillFileAdd size={50} />
      <p className="font-mont text-xl">Drag or choose a file </p>
      <input id="File" type="file" onChange={handleFile} className="hidden" />
    </label>
  );
};

export default DropZone;

import { useState } from "react";
import { Field } from "../ModalHome";

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
    <div
      className={`grow w-full border-dashed border-2 ${
        isDraggingOver ? "border-green-500" : "border-gray-500"
      }`}
      style={{ borderRadius: "8px" }}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input type="file" onChange={handleFile} className="h-full w-full" />
    </div>
  );
};

export default DropZone;

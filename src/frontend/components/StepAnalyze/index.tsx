import React from "react";

interface Props {
  step: string;
  next: boolean;
  completed: boolean;
  pathChange?: boolean;
}

const StepAnalyze: React.FC<Props> = ({
  step,
  next,
  completed,
  pathChange,
}) => {
  return (
    <div className="items-center h-auto w-auto">
      <p
        className={`absolute ${step === "Set route" && "top-0 left-[22vw]"} ${
          step === "Route points" && "top-0 left-[29vw]"
        } ${step === "Information" && "top-0 left-[38vw]"} select-none`}
      >
        {step}
      </p>
      <div className={`flex pt-1 ${next && "justify-center items-center"}`}>
        <div
          className={`rounded-full border-2 ${
            completed ? "border-blue-gerdau-mid" : "border-gray-400"
          } h-9 w-9 bg-white flex items-center justify-center`}
        >
          <div
            className={`${
              completed ? "bg-blue-gerdau-mid" : "bg-gray-400"
            } w-3 h-3 justify-items-center rounded-full`}
          ></div>
        </div>
        {next && (
          <div
            className={`${
              pathChange ? "bg-blue-gerdau-mid" : "bg-gray-400"
            } h-1 w-20`}
          />
        )}
      </div>
    </div>
  );
};

export default StepAnalyze;

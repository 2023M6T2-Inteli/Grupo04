import React from "react";

interface Props {
  step: string;
  next: boolean;
  completed: boolean;
}

const StepAnalyze: React.FC<Props> = ({ step, next, completed }) => {
  return (
    <div className="items-center h-auto w-auto">
      <p className="select-none">{step}</p>
      <div className={`flex ${next && "justify-center items-center"}`}>
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
              completed ? "bg-blue-gerdau-mid" : "bg-gray-400"
            } h-1 w-20`}
          />
        )}
      </div>
    </div>
  );
};

export default StepAnalyze;

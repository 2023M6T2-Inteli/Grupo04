import React from "react";
import StepAnalyze from "../StepAnalyze";

interface Props {
  stepsCompleted: boolean[];
}

interface StepInterface {
  name: string;
  next: boolean;
  completed: boolean;
}

const ProgressionBar: React.FC<Props> = ({ stepsCompleted }) => {
  const steps: StepInterface[] = [
    {
      name: "Set route",
      next: true,
      completed: stepsCompleted[0],
    },
    {
      name: "Route points",
      next: true,
      completed: stepsCompleted[1],
    },
    {
      name: "Information",
      next: false,
      completed: stepsCompleted[2],
    },
  ];
  return (
    <div className="flex justify-center h-auto w-auto">
      {steps.map((step) => (
        <StepAnalyze
          step={step.name}
          next={step.next}
          completed={step.completed}
        />
      ))}
    </div>
  );
};

export default ProgressionBar;

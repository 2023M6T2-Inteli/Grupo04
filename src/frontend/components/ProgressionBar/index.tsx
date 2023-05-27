import React from "react";
import StepAnalyze from "../StepAnalyze";

interface Props {
  stepsCompleted: boolean[];
}

interface StepInterface {
  name: string;
  next: boolean;
  completed: boolean;
  pathChange?: boolean;
}

const ProgressionBar: React.FC<Props> = ({ stepsCompleted }) => {
  const steps: StepInterface[] = [
    {
      name: "Set route",
      next: true,
      completed: stepsCompleted[0],
      pathChange: stepsCompleted[1],
    },
    {
      name: "Route points",
      next: true,
      completed: stepsCompleted[1],
      pathChange: stepsCompleted[2],
    },
    {
      name: "Information",
      next: false,
      completed: stepsCompleted[2],
    },
  ];
  return (
    <div className="flex justify-center pt-5 h-auto w-auto">
      {steps.map((step) => (
        <StepAnalyze
          step={step.name}
          next={step.next}
          completed={step.completed}
          pathChange={step.pathChange}
        />
      ))}
    </div>
  );
};

export default ProgressionBar;

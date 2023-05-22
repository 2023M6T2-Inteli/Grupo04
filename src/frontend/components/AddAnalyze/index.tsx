import React from "react";
import HeaderDisplay from "../HeaderDisplay";
import DisplayText, { DisplayContent } from "../DisplayText";
import SetRoute from "../SetRoute";

interface Props {}

const AddAnalyze: React.FC<Props> = (props) => {
  const displayContent: DisplayContent = {
    title: "Start analyze",
    text: "Before you start, it's important to check whether your robot is powered on and connected to the network. This will ensure that you have an accurate and efficient analysis of your robot.",
  };

  return (
    <div className="flex flex-col flex-grow">
      <HeaderDisplay />
      <DisplayText displayContent={displayContent} />
      <SetRoute />
    </div>
  );
};

export default AddAnalyze;

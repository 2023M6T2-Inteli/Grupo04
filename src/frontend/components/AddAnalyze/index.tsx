import React from "react";
import HeaderDisplay from "../HeaderDisplay";
import DisplayText, { DisplayContent } from "../DisplayText";
import SetRoute from "../SetRoute";
import LiveStream from "../LiveStream";
import { Robot } from "@/components/RobotSelectionBody";

interface Props {
  robot: Robot;
}

const AddAnalyze: React.FC<Props> = ({ robot }) => {
  const [live, setLive] = React.useState<boolean>(false);

  const displayContent: DisplayContent = {
    title: `Start analyze on ${robot.name}`,
    text: "Before you start, it's important to check whether your robot is powered on and connected to the network. This will ensure that you have an accurate and efficient analysis of your robot.",
  };

  return (
    <div className="flex flex-col flex-grow overflow-y-scroll">
      <HeaderDisplay />
      <DisplayText displayContent={displayContent} />
      {live ? <LiveStream robot={robot} /> : <SetRoute setLive={setLive} />}
    </div>
  );
};
export default AddAnalyze;
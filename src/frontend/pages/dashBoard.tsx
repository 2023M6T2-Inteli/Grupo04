import NavBar from "@/components/NavBar";
import Display from "@/components/Display";
import { useState } from "react";
import AddAnalyze from "@/components/AddAnalyze";

export enum DisplayType {
  Dashboard,
  AddAnalyze,
  History,
  TestRobot,
}

const DashBoard = () => {
  const [display, setDisplay] = useState<DisplayType>(DisplayType.AddAnalyze);

  return (
    <div className="h-screen w-screen overflow-hidden flex">
      <NavBar display={display} setDisplay={setDisplay} />
      {display === DisplayType.Dashboard && <Display />}
      {display === DisplayType.AddAnalyze && <AddAnalyze />}
    </div>
  );
};

export default DashBoard;

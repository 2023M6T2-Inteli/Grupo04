import NavBar from "@/components/NavBar";
import Display from "@/components/Display";
import { useState } from "react";
import AddAnalyze from "@/components/AddAnalyze";
import { WithAuth } from "@/HOC/WithAuth";

export enum DisplayType {
  Dashboard,
  AddAnalyze,
  History,
  TestRobot,
  SignOut,
}

const DashBoard = () => {
  // const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [display, setDisplay] = useState<DisplayType>(DisplayType.Dashboard);

  return (
    <div className="h-screen w-screen overflow-hidden flex">
      <NavBar display={display} setDisplay={setDisplay} />
      {display === DisplayType.Dashboard && <Display />}
      {display === DisplayType.AddAnalyze && <AddAnalyze />}
    </div>
  );
};

export const getServerSideProps = async (ctx: any) => {
  return await WithAuth(ctx);
};

export default DashBoard;

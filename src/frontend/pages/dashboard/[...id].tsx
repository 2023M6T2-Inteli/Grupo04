import NavBar from "@/components/NavBar";
import Display from "@/components/Display";
import React, { useState } from "react";
import AddAnalyze from "@/components/AddAnalyze";
import { WithAuth } from "@/HOC/WithAuth";
import { GetServerSideProps } from "next";
import { axios } from "@/utils/axios";
import { Robot } from "@/components/RobotSelectionBody";

export enum DisplayType {
  Dashboard,
  AddAnalyze,
  History,
  TestRobot,
  SignOut,
}

interface Props {
  robot: Robot;
}

const DashBoard: React.FC<Props> = ({ robot }) => {
  const [display, setDisplay] = useState<DisplayType>(DisplayType.Dashboard);

  return (
    <div className="h-screen w-screen overflow-hidden flex">
      <NavBar robot={robot} display={display} setDisplay={setDisplay} />
      {display === DisplayType.Dashboard && <Display robot={robot} />}
      {display === DisplayType.AddAnalyze && <AddAnalyze robot={robot} />}
    </div>
  );
};

export const getServerSideProps = async (ctx: any) => {
  const myGetServerSideProps: GetServerSideProps = async (ctx: any) => {
    const { id } = ctx.params;

    try {
      const res = await axios.get(`/robot/get_robot/${id}`);
      if (res.status === 200) {
        return res.data;
      } else {
        console.log("ERROR!!!!");
        return {
          redirect: {
            destination: "/robotselection",
            permanent: false,
          },
        };
      }
    } catch (err) {
      return {
        redirect: {
          destination: "/robotselection",
          permanent: false,
        },
      };
    }
  };

  return await WithAuth(ctx, myGetServerSideProps);
};

export default DashBoard;
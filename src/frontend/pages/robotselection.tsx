import Welcome from "@/components/Welcome";
import GerdauBanner from "@/components/GerdauBanner.tsx";
import { WelcomeType } from "@/components/WelcomeBody";
import { WithAuth } from "@/HOC/WithAuth";
import { GetServerSideProps } from "next";
import { axios } from "@/utils/axios";
import React from "react";
import { Robot } from "@/components/WelcomeBody";

interface Props {
  robots: Robot[];
}

const robotSelection: React.FC<Props> = ({ robots }) => {
  return (
    <div className="w-screen h-screen lg:grid lg:grid-cols-5 overflow-hidden">
      <GerdauBanner />
      <Welcome
        robots={robots}
        section={WelcomeType.Selection}
        link="/dashboard"
      />
    </div>
  );
};

export const getServerSideProps = async (ctx: any) => {
  const myGetServerSideProps: GetServerSideProps = async (ctx: any) => {
    const res = (await axios.get("/robot/get_robots")) as any;
    return res.data;
  };

  return await WithAuth(ctx, myGetServerSideProps);
};

export default robotSelection;

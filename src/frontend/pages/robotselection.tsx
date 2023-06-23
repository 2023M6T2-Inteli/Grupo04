import WelcomeLayout from "@/components/WelcomeLayout";
import GerdauBanner from "@/components/GerdauBanner.tsx";
import { WithAuth } from "@/HOC/WithAuth";
import { GetServerSideProps } from "next";
import { axios } from "@/utils/axios";
import React from "react";
import { Robot } from "@/components/RobotSelectionBody";
import RobotSelectionBody from "@/components/RobotSelectionBody";

interface Props {
  robots: Robot[];
}

const RobotSelection: React.FC<Props> = ({ robots }) => {
  const [linkRedirect, setLinkRedirect] = React.useState<string>("/dashboard");

  return (
    <div className="w-screen h-screen lg:grid lg:grid-cols-5 overflow-hidden">
      <GerdauBanner />
      <WelcomeLayout robotSelection={true} link={linkRedirect}>
        <RobotSelectionBody
          setLinkRedirect={setLinkRedirect}
          robotsProps={robots}
        />
      </WelcomeLayout>
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

export default RobotSelection;

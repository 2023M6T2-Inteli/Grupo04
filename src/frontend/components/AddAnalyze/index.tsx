import React, { use, useEffect } from "react";
import HeaderDisplay from "../HeaderDisplay";
import DisplayText, { DisplayContent } from "../DisplayText";
import SetRoute from "../SetRoute";
import LiveStream from "../LiveStream";
import { axios } from "@/utils/axios";

interface Props {}

const AddAnalyze: React.FC<Props> = () => {
  const [live, setLive] = React.useState<boolean>(false);

  const [routesAPI, setRoutesAPI] = React.useState<any>([]);

  const getRoutes = async () => {
    try {
      const res = await axios.get(`/route/get_all`);
      if (res.status === 200) {
        console.log("RESPOSTAAA", res.data.routes);
        setRoutesAPI(res.data.routes);
      } else {
        console.log("ERROR!!!!");
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRoutes();
  }, []);

  const displayContent: DisplayContent = {
    title: "Start analyze",
    text: "Before you start, it's important to check whether your robot is powered on and connected to the network. This will ensure that you have an accurate and efficient analysis of your robot.",
  };

  return (
    <div className="flex flex-col flex-grow overflow-y-scroll">
      <HeaderDisplay />
      <DisplayText displayContent={displayContent} />
      {live ? (
        <LiveStream />
      ) : (
        <SetRoute routesAPI={routesAPI} setLive={setLive} />
      )}
    </div>
  );
};

export default AddAnalyze;

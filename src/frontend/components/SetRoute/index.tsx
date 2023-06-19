import React, { useState } from "react";
import ProgressionBar from "../ProgressionBar";
import FixedRoutes from "../FixedRoutes";
import mapa from "../../assets/Mapa.svg";
import ShowMap from "../ShowMap";
import ShowInfo from "../SetAnalyzeInfo"

interface Props {
  setLive: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface RoutesInterface {
  name: string;
  data: string;
  hora: string;
  image: any;
}

const SetRoute: React.FC<Props> = ({ setLive }) => {
  const routes: RoutesInterface[] = [
    {
      name: "Tubulação de gás",
      data: "12/12/2021",
      hora: "12:00",
      image: mapa,
    },
    {
      name: "Tubulação de gás",
      data: "12/12/2021",
      hora: "12:00",
      image: mapa,
    },
    {
      name: "Tubulação de gás",
      data: "12/12/2021",
      hora: "12:00",
      image: mapa,
    },
  ];

  const [stepsCompleted, setStepsCompleted] = useState<boolean[]>([
    true,
    false,
    false,
  ]);

  const [file, setFile] = useState<File | null>(null);

  const [analyze_info, analyzeInfo ] = useState<boolean>(false);

  return (
    <div className="flex flex-grow pb-3 justify-center mt-8">
      <div className="flex flex-col relative items-center h-max w-[70%] mx-auto p-6 rounded-2xl shadow-custom">
        <ProgressionBar stepsCompleted={stepsCompleted} />
        {!file && (
          <FixedRoutes
            routes={routes}
            setStepsCompleted={setStepsCompleted}
            setFile={setFile}
          />
        )}
        {(file && !analyze_info) && (
          <ShowMap
            setLive={setLive}
            setFile={setFile}
            setStepsCompleted={setStepsCompleted}
            file={file}
            analyzeInfo={analyzeInfo}
          />
        )}
        {(file && analyze_info) && (
          <ShowInfo
            setLive={setLive}
            setFile={setFile}
            setStepsCompleted={setStepsCompleted}
            file={file}
            analyzeInfo={analyzeInfo}
          />
        )}
      </div>
    </div>
  );
};

export default SetRoute;

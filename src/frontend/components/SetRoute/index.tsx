import React, { useState } from "react";
import ProgressionBar from "../ProgressionBar";
import FixedRoutes from "../FixedRoutes";
import mapa from "../../assets/Mapa.svg";
import ShowMap from "../ShowMap";

interface Props {}

export interface RoutesInterface {
  name: string;
  data: string;
  hora: string;
  image: any;
}

const SetRoute: React.FC<Props> = (props) => {
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

  return (
    <div className="flex flex-grow pb-3 justify-center">
      <div className="flex flex-col relative items-center h-[65vh] w-[65vw] rounded-2xl shadow-2xl">
        <ProgressionBar stepsCompleted={stepsCompleted} />
        {!file && (
          <FixedRoutes
            routes={routes}
            setStepsCompleted={setStepsCompleted}
            setFile={setFile}
          />
        )}
        {file && (
          <ShowMap
            setFile={setFile}
            setStepsCompleted={setStepsCompleted}
            file={file}
          />
        )}
      </div>
    </div>
  );
};

export default SetRoute;

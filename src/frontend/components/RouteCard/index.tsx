import React from "react";
import mapa from "../../assets/Mapa.svg";
import { RoutesInterface } from "../SetRoute";
import Image from "next/image";

interface Props {
  route: RoutesInterface;
}

const RouteCard: React.FC<Props> = ({ route }) => {
  return (
    <div className="flex shadow-custom flex-col h-max w-full rounded-xl p-4">
      <Image
        className="mx-auto w-full"
        src={route.image}
        height={110}
        alt={route.name}
      ></Image>
      <h1 className="select-none pl-2 font-mont font-medium text-blue-gerdau-init">
        {route.name}
      </h1>
      <p className="pl-3 text-sm pb-1 font-inter">
        {route.data} - {route.hora}
      </p>
    </div>
  );
};

export default RouteCard;

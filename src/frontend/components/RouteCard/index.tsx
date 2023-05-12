import React from "react";
import mapa from "../../assets/Mapa.svg";
import { RoutesInterface } from "../SetRoute";
import Image from "next/image";

interface Props {
  route: RoutesInterface;
}

const RouteCard: React.FC<Props> = ({ route }) => {
  return (
    <div className="flex shadow-2xl flex-col h-36 w-56 rounded-xl">
      <Image
        className="pt-1 mx-auto"
        src={route.image}
        width={170}
        height={110}
        alt={route.name}
      ></Image>
      <h1 className="select-none pl-2 font-inter text-blue-gerdau-mid">
        {route.name}
      </h1>
      <p className="pl-3 text-sm pb-1 font-inter">
        {route.data} - {route.hora}
      </p>
    </div>
  );
};

export default RouteCard;

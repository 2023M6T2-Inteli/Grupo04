import Image from "next/image";
import gerdauLogo from "../../assets/GerdauLogo.svg";

const GerdauBanner = () => {
  return (
    <div className="flex invisible lg:visible col-span-3 content-center justify-center bg-gradient-to-br from-blue-gerdau-init via-blue-gerdau-mid to-blue-gerdau-end ">
      <Image width={602} height={586} src={gerdauLogo} alt="Gerdau Logo" />
    </div>
  );
};

export default GerdauBanner;
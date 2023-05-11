import Image from "next/image";
import gerdauLogo from "../../assets/GerdauLogo.svg";
import { motion } from "framer-motion";

const GerdauBanner = () => {
  return (
    <div className="col-span-3 lg:flex hidden invisible lg:visible content-center justify-center bg-gradient-to-br from-blue-gerdau-init via-blue-gerdau-mid to-blue-gerdau-end select-none overflow-hidden items-center">
      <motion.div
        className="flex
      items-center justify-center"
        initial={{ rotate: 180, scale: 0 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          ease: "easeInOut",
          duration: 0.25,
        }}
      >
        <Image width={602} height={586} src={gerdauLogo} alt="Gerdau Logo" />
      </motion.div>
    </div>
  );
};

export default GerdauBanner;

import Welcome from "@/components/Welcome";
import GerdauBanner from "@/components/GerdauBanner.tsx";
import { WelcomeType } from "@/components/WelcomeBody";

const robotSelection = () => {
  return (
    <div className="w-screen h-screen lg:grid lg:grid-cols-5 overflow-hidden">
      <GerdauBanner />
      <Welcome section={WelcomeType.Selection} link="/dashBoard" />
    </div>
  );
};

export default robotSelection;

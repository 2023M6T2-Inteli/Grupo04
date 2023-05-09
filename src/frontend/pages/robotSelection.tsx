import Welcome from "@/components/Welcome";
import GerdauBanner from "@/components/GerdauBanner.tsx";
import {WelcomeType} from "@/components/Welcome";

const robotSelection = () => {
  return (
    <div className="w-screen h-screen lg:grid lg:grid-cols-5">
      <GerdauBanner />
      <Welcome section={WelcomeType.Selection} link="/" />
    </div>
  );
};

export default robotSelection;

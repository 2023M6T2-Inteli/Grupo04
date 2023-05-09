import Welcome from "@/components/Welcome";
import GerdauBanner from "@/components/GerdauBanner.tsx";

const robotSelection = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-5">
      <GerdauBanner />
      <Welcome />
    </div>
  );
};

export default robotSelection;

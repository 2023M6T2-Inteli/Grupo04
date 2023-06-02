import Welcome from "@/components/Welcome";
import GerdauBanner from "@/components/GerdauBanner.tsx";
import { WelcomeType } from "@/components/WelcomeBody";
import { WithAuth } from "@/HOC/WithAuth";

const robotSelection = () => {
  return (
    <div className="w-screen h-screen lg:grid lg:grid-cols-5 overflow-hidden">
      <GerdauBanner />
      <Welcome section={WelcomeType.Selection} link="/dashboard" />
    </div>
  );
};

export const getServerSideProps = async (ctx: any) => {
  return await WithAuth(ctx);
};

export default robotSelection;

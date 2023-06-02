import GerdauBanner from "@/components/GerdauBanner.tsx";
import Welcome from "@/components/Welcome";
import { WelcomeType } from "@/components/WelcomeBody";

export default function Home() {
  return (
    <div className="w-screen h-screen lg:grid lg:grid-cols-5 overflow-hidden">
      <Welcome section={WelcomeType.Home} link="/login" />
      <GerdauBanner />
    </div>
  );
}

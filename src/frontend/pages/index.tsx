import GerdauBanner from "@/components/GerdauBanner.tsx";
import WelcomeLayout from "@/components/WelcomeLayout";
import WelcomeBody from "@/components/WelcomeBody";

export default function Home() {
  return (
    <div className="w-screen h-screen lg:grid lg:grid-cols-5 overflow-hidden">
      <WelcomeLayout link="/login">
        <WelcomeBody />
      </WelcomeLayout>
      <GerdauBanner />
    </div>
  );
}

import GerdauBanner from "@/components/GerdauBanner.tsx";
import Welcome from "@/components/Welcome";

export default function Home() {
  return (
    <div className="w-screen h-screen lg:grid lg:grid-cols-5">
      <Welcome />
      <GerdauBanner />
    </div>
  );
}

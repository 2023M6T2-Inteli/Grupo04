import GerdauBanner from "@/components/GerdauBanner.tsx";
import Login from "@/components/Login";
import { AuthType } from "@/components/LoginBody";

export default function Home() {
  return (
    <div className="w-screen h-screen lg:grid lg:grid-cols-5 overflow-hidden">
      <Login section={AuthType.Home} link="/register" />
      <GerdauBanner />
    </div>
  );
}

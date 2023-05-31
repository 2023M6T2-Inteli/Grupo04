import Login from "@/components/Login";
import GerdauBanner from "@/components/GerdauBanner.tsx";
import { AuthType } from "@/components/LoginBody";

const register = () => {
  return (
    <div className="w-screen h-screen lg:grid lg:grid-cols-5 overflow-hidden">
      <Login section={AuthType.Register} link="/login" />
      <GerdauBanner />
    </div>
  );
};

export default register;

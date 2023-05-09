import GerdauBanner from "@/components/GerdauBanner.tsx";
import Welcome from "@/components/Welcome";
import WelcomeMobile from "@/components/WelcomeMobile";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(true);

  useEffect(() => {
    setIsLargeScreen(window.innerWidth >= 1024);
  }, []);

  return (
    <>
      {isLargeScreen ? (
        <div className="w-screen h-screen grid grid-cols-5">
          <Welcome />
          <GerdauBanner />
        </div>
      ) : (
        <WelcomeMobile />
      )}
    </>
  );
}

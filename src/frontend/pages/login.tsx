import GerdauBanner from "@/components/GerdauBanner.tsx";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { WithAuth } from "@/HOC/WithAuth";
import { SignType } from "@/components/SignForm";
import WelcomeLayout from "@/components/WelcomeLayout";
import LoginBody from "@/components/LoginBody";

const LoginPage: React.FC = () => {
  const [sign, setSign] = useState<SignType>(SignType.Login);

  return (
    <div className="w-screen h-screen lg:grid lg:grid-cols-5 overflow-hidden">
      <WelcomeLayout login={true} link="">
        {sign === SignType.Register ? (
          <LoginBody
            signType={sign}
            text={"Let's get started"}
            header={"Sign Up"}
          />
        ) : (
          <LoginBody
            signType={sign}
            text={"Welcome Back!"}
            header={"Sign In"}
          />
        )}
        {sign === SignType.Login && (
          <p onClick={() => setSign(SignType.Register)}>
            {"Don't have" + " an account yet? "}
            <span className="mx-auto w-full select-none text-blue-500">
              {"Sign Up."}
            </span>
          </p>
        )}
      </WelcomeLayout>
      <GerdauBanner />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await WithAuth(ctx);
  if (!res.redirect) {
    return {
      redirect: {
        destination: "/robotselection",
        permanent: false,
      },
    };
  }
  return {
    props: { none: null },
  };
};

export default LoginPage;

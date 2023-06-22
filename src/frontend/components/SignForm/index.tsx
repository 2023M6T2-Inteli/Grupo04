import React from "react";
import { useForm } from "react-hook-form";
import Button, { ButtonType } from "@/components/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { axios } from "@/utils/axios";

export enum SignType {
  Login,
  Register,
}

interface IFormInputSignIn {
  email: string;
  password: string;
}

interface IFormInputSignUp {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  signType: SignType;
}

const SignForm: React.FC<Props> = ({ signType }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<
    IFormInputSignUp | IFormInputSignIn
  >();

  const submitSignIn = async (data: IFormInputSignIn) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: `${window.location.origin}`,
    });
    if (res && res.status === 200) {
      toast.success("Login realizado com sucesso.");
      router.replace("/robotselection");
    } else {
      toast.error("Erro ao realizar login.");
    }
  };

  const submitSignUp = async (data: any) => {
    try {
      if (data.password !== data.confirmPassword) {
        toast.error("As senhas não coincidem.");
        return;
      }
      console.log(data);
      const res = await axios.post("/user/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log(res);
      if (res && res.status === 200) {
        toast.success("Cadastro realizado com sucesso.");
        await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
          callbackUrl: `${window.location.origin}`,
        });
        router.replace("/robotselection");
      } else {
        toast.error("Erro ao realizar cadastro.");
      }
    } catch (e) {
      toast.error("Erro ao realizar cadastro.");
    }
  };

  return (
    <form
      onSubmit={
        signType === SignType.Login
          ? handleSubmit(submitSignIn)
          : handleSubmit(submitSignUp)
      }
    >
      {signType === SignType.Register && (
        <label>
          <p className="border-b-2 p-2 border-blue-gerdau-mid w-full font-inter font-xs mb-4">
            <input
              className="w-full outline-none ring-0 placeholder:font-inter placeholder-black-zero placeholder:text-px-18"
              {...register("name")}
              type="text"
              placeholder="Name"
            />
          </p>
        </label>
      )}
      <label>
        <p className="border-b-2 p-2 border-blue-gerdau-mid w-full font-inter font-xs mb-4">
          <input
            className="w-full outline-none ring-0 placeholder:font-inter placeholder-black-zero placeholder:text-px-18"
            type="text"
            placeholder="E-mail"
            {...register("email")}
          />
        </p>
      </label>
      <label>
        <p className="border-b-2 p-2 border-blue-gerdau-mid w-full font-inter font-xs mb-4">
          <input
            className="w-full outline-none ring-0 placeholder:font-inter placeholder-black-zero placeholder:text-px-18"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </p>
      </label>
      {signType === SignType.Register && (
        <label>
          <p className="border-b-2 p-2 border-blue-gerdau-mid w-full font-inter font-xs mb-4">
            <input
              className="w-full outline-none ring-0 placeholder:font-inter placeholder-black-zero placeholder:text-px-18"
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword")}
            />
          </p>
        </label>
      )}
      <div className="py-4">
        <Button
          type={ButtonType.Home}
          text={signType === SignType.Register ? "Sign Up" : "Sign" + " In"}
        />
      </div>
    </form>
  );
};

export default SignForm;

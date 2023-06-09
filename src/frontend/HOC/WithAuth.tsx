import { getSession, signOut } from "next-auth/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

interface UserI {
  name: string;
  email: string;
}
interface SessionI {
  user: UserI;
  expires: string;
  accessToken: string;
}

export const WithAuth = async (
  ctx: GetServerSidePropsContext,
  getServerSidePropsFunc?: GetServerSideProps
) => {
  const session = (await getSession(ctx)) as SessionI | null;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Se a sessão existir, então chame a função getServerSideProps da página.
  if (getServerSidePropsFunc) {
    const wrappedProps = (await getServerSidePropsFunc(ctx)) as any;

    if (wrappedProps.redirect) {
      return {
        ...wrappedProps,
        props: {
          session,
        },
      };
    }

    // Retorne os props recebidos da função getServerSideProps da página.
    return {
      props: {
        ...wrappedProps,
        session,
      },
    };
  }

  // Se não existir uma função getServerSideProps para a página, apenas retorne a sessão.
  return {
    props: {
      session,
    },
  };
};

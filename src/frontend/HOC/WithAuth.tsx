import {getSession} from "next-auth/react";
import {GetServerSideProps, GetServerSidePropsContext, NextPageContext} from "next";

export const WithAuth = async (ctx: GetServerSidePropsContext, getServerSidePropsFunc?: GetServerSideProps) => {
    const session = await getSession(ctx);

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    // Se a sessão existir, então chame a função getServerSideProps da página.
    if (getServerSidePropsFunc) {
        const wrappedProps = await getServerSidePropsFunc(ctx);

        // Retorne os props recebidos da função getServerSideProps da página.
        return {
            props: {
                ...wrappedProps,
                session,
            },
        }
    }

    // Se não existir uma função getServerSideProps para a página, apenas retorne a sessão.
    return {
        props: {
            session,
        },
    }
};
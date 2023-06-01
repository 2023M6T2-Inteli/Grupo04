import GerdauBanner from "@/components/GerdauBanner.tsx";
import Login from "@/components/Login";
import {getCsrfToken} from "next-auth/react";
import {GetServerSideProps} from "next";
import React, {useEffect} from "react";
import {toast} from "react-toastify";
import {WithAuth} from "@/HOC/WithAuth";

// interface Props {
//     csrfToken: string;
// }

const LoginPage: React.FC = () => {
    return (
        <div className="w-screen h-screen lg:grid lg:grid-cols-5 overflow-hidden">
            <Login/>
            <GerdauBanner/>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const res = await WithAuth(ctx);
    if (!res.redirect) {
        return {
            redirect: {
                destination: '/dashBoard',
                permanent: false,
            },
        }
    }
    return {
        props:
            {none: null}
    }

};

export default LoginPage


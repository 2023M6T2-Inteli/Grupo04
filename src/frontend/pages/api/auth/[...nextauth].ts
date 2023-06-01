import NextAuth from "next-auth/src";
import CredentialsProvider from "next-auth/providers/credentials";

interface Credentials {
    email: string;
    password: string;
}

export default NextAuth({
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {
                email: {label: "Email", type: "text", placeholder: "email"},
                password: {label: "Password", type: "password", placeholder: "password"},
            },
            authorize: async (credentials, req) => {
                const {email, password} = credentials as Credentials;

                const response = await fetch("http://localhost:3000/api/auth/login", {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {"Content-Type": "application/json"}
                });

                if (response.status === 200) {
                    const jsonResponse = await response.json();
                    return jsonResponse;
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt({token, user, account, profile, isNewUser}) {
            if (user) {
                // @ts-ignore
                token.accessToken = user.token;
            }
            return token;
        },
        session({session, token}) {
            // @ts-ignore
            session.accessToken = token.accessToken;
            return session;
        }
    },
    secret: 'secret',
});
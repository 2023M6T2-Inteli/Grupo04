import NextAuth, {NextAuthOptions, Session} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface Credentials {
    email: string;
    password: string;
}

export const  authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: {label: "Email", type: "text", placeholder: "email"},
                password: {label: "Password", type: "password", placeholder: "password"},
            },
            async authorize(credentials, req) {
                console.log("oiee")

                const {email, password} = credentials as Credentials;
                console.log(email, password)

                const response = await fetch("http://localhost:3001/user/login", {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {"Content-Type": "application/json"}
                });
                console.log("oaioi", response)

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
        jwt({token, user}) {
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
    secret: process.env.NEXTAUTH_SECRET,
    // pages: {
    //     signIn: "/login",
    // }
};

export default NextAuth(authOptions);
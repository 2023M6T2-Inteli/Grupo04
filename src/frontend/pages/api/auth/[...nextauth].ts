import NextAuth, { NextAuthOptions, Session } from "next-auth";
import jwt from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";

interface Credentials {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as Credentials;
        console.log(email, password);

        const response = await fetch("http://localhost:3001/user/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200) {
          const jsonResponse = await response.json();

          const user_response = await fetch("http://localhost:3001/user/", {
            method: "GET",
            headers: {
              Bearer: jsonResponse.token,
            },
          });
          if (user_response.status === 200) {
            const user = await user_response.json();

            return { ...jsonResponse, name: user.name, email: user.email };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("USER", user);
        console.log("TOKEN", token);
        // @ts-ignore
        token.accessToken = user.token;
      }
      return token;
    },
    session({ session, token }) {
      // @ts-ignore
      console.log("SESSION", session);
      console.log("TOKEN", token);
      session.accessToken = token.accessToken;
      return session;
    },
  },
  session: {
    maxAge: 60 * 60 * 2, // A sessão expirará após 1 hora de inatividade
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

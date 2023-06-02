import NextAuth, { NextAuthOptions } from "next-auth";
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
        // @ts-ignore
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      try {
        const res = await fetch("http://localhost:3001/user/", {
          method: "GET",
          headers: {
            Bearer: token.accessToken,
          },
        });
        if (res.status !== 200) {
          session = {};
        }
        session.accessToken = token.accessToken;
      } catch (e) {
        console.log(e);
        session = {};
      }
      return session;
    },
  },
  session: {
    maxAge: 60 * 60 * 2, // A sessão expirará após 2 horas
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

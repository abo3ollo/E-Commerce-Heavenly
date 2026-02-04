import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { jwtDecode } from "jwt-decode";

export let authOptions: NextAuthOptions = {

  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        let res = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        let payload = await res.json();
        console.log(payload);

        if (payload.message == "success") {
          let decoded: { id: string } = jwtDecode(payload.token);
          console.log(decoded);

          return {
            id: decoded.id,
            user: payload.user,
            token: payload.token,
            // user: payload.user,
          };
        }else{
            return null;
        }
        
      },
    }),
  ],

  callbacks: {

    async jwt({token ,user}) {

      if (user) {
      token.user = user.user
      token.token = user.token
    }
      
      return token
    },

    
    async session({ session, token }) {
      session.user = token.user 
      return session
    },
    
  }
}

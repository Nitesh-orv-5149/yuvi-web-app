import CredentialsProvider from "next-auth/providers/credentials"
import { clients, experts } from "../schema"
import { checkAuthLogin, checkAuthLoginAdmin } from "./authUtils"

/**
 * @type {import("next-auth").AuthOptions}
 */

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },

      async authorize(credentials) {
        const { identifier, password, role } = credentials
        console.log("Credentials: ", credentials)

        if (!identifier || !password || !role) return null

        let user = null

        // CLIENT LOGIN
        if (role === "client") {
          user = await checkAuthLogin({
            identifier,
            password,
            table: clients,
            roleName: "client",
          })
          if (user) return user
        }

        // EXPERT LOGIN
        if (role === "expert") {
          user = await checkAuthLogin({
            identifier,
            password,
            table: experts,
            roleName: "expert",
          })
          if (user) return user
        }

        // ADMIN LOGIN
        if (role === "admin") {
          user = await checkAuthLoginAdmin({
            identifier,
            password,
          })
          if (user) return user
        }

        return null
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.username = user.username
        token.role = user.role
      }
      return token
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        email: token.email,
        username: token.username,
        role: token.role,
      }
      return session
    },
  },
} 

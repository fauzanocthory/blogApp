import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils"
import { User } from "./models"
import bcrypt from "bcryptjs"

const login = async (credentials) => {
  try {
    connectToDb()
    const user = await User.findOne({username: credentials.username})
    if (!user) {
      throw new Error('Wrong Credentials')
    }

    const isPasswordCorrect = bcrypt.compare(credentials.password)
    if(!isPasswordCorrect) {
      throw new Error('Wrong Credentials')
    }

    return user;

  } catch (error) {
    console.log(error)
    throw new Error('failed to login')
  }
}


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "jsmith"},
        password: { label: "password", type: "password", placeholder: "password"},
      },
      async authorize(credentials) {
        try {
          const user = await login(credentials)
          return user
        } catch (error) {
          return null
        }
      }
    })
  ],
  callbacks: {
    async signIn({user, account, profile}) {
      // console.log(user, account, profile)
      if(account.provider === "github") {
        connectToDb()
        try {
          const user = await User.findOne({ email: profile.email})
          if(!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              image: profile.avatar_url
            })
            await newUser.save()
          }
        } catch (error) {
          console.log(error)
          return false
        }
      }
      return true
    }
  }
}

export default NextAuth(authOptions)
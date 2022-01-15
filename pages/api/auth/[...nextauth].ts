import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import User from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

export default NextAuth({
    session: {
        //@ts-ignore
        jwt: true
    },
    providers: [
        //@ts-ignore
        Credentials({
            async authorize(credentials : any) {
                dbConnect();

                const {email, password} = credentials;

                if(!email || !password){
                    throw new Error("Please enter email or password");
                }

                const user = await User.findOne({email}).select("+password");

                if(!user){
                    throw new Error("Invalid Email or Password");
                }

                //@ts-ignore
                const isPasswordMatched = await user.comparePassword(password);

                if(!isPasswordMatched){
                    throw new Error("Invalid Email or Password");
                }

                return Promise.resolve(user);
            }
        })
    ],
    callbacks: {
        //@ts-ignore
        jwt: async (token, user) => {
            user && (token.user = user)
            return Promise.resolve(token)
        },
        //@ts-ignore
        session: async (session, user) => {
            session.user = user.user;

            return Promise.resolve(session);
        }
    }
})
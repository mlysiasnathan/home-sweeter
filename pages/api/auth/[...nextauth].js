import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import SequelizeAdapter from "@next-auth/sequelize-adapter";
import {sequelize} from "../../../lib/sequelize";
import User from "../../../models/User";


export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "database", // Uses the database to store sessions
    },
    adapter: SequelizeAdapter(sequelize), // Sequelize adapter for database storage
    callbacks: {
        // This runs when a user logs in
        async signIn({ account, profile }) {

            if (!profile.email) {
                console.error("Google account missing email.");
                return false;
            }
            try {
                // Check if the user exists in the database

                let user = await User.findOne({ where: { email: profile.email }});
                if (!user) {
                    // If user doesn't exist, create a new entry
                    user = await User.create({
                        id: account.providerAccountId,
                        name: profile.name,
                        email: profile.email,
                        image: profile.image,
                        role: "renter", // Default role is "renter", but you can modify this logic
                    });
                    console.log('==============================user',user)
                    return true;
                }
                return true; // Allow login
            } catch (error) {
                console.error("Error during sign-in:", error);
                return false; // Deny login in case of error
            }
        },
        // This ensures the session contains user info
        async session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
                // session.user.role = user.role;
            }
            return session;
        },
    },
});

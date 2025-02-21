import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const {User} = require("../../../../models");

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {

        async signIn({user, account, profile}) {

            try {
                // Check if user exists in the database
                let existingUser = await User.findOne({where: {email: user.email}});
                if (!existingUser) {
                    // Create new user if not found
                    existingUser = await User.create({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                    });
                }
            } catch (error) {
                console.error("🚫🚫Error saving user:", error);
                return false;
            }

            return true;
        },
        async session({session, token}) {
            if (session?.user) {
                const dbUser = await User.findOne({where: {email: session.user.email}});
                if (dbUser) {
                    session.user.id = dbUser.id;
                    session.user.role = dbUser.role; // If you have roles
                }
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};

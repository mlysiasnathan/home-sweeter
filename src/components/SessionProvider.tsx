"use client"; // Ensures this runs in the client

import {SessionProvider} from "next-auth/react";

export default function AuthSessionProvider({children}: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}

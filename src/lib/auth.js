import { getSession } from "next-auth/react";

export const requireAuth = async (req, res, role = null) => {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (role && session.user.role !== role) {
        return res.status(403).json({ error: "Forbidden" });
    }

    return session;
};

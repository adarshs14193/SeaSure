import { auth } from "../config/firebase.js";

export const requireAuth = async (req, res, next) => {
    try {
        if(process.env.NODE_ENV === "production" && !req.secure){
            return res.status(403).json({error: "HTTPS Required"});
        }
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const idToken = authHeader.split(" ")[1];

        const decodedToken = await auth.verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized" });
    }
};
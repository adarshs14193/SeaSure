/**
 * Role-based authorization middleware
 * Must be used AFTER auth.middleware.js
 *
 * Usage:
 *   requireRole("VENDOR", "ADMIN")
 */
export const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        const user = req.user; // Set by requireAuth middleware

        if(!user){
            return res.status(401).json({ error: "Unauthenticated" });// Should not happen if used after requireAuth
        }

        const role = user.role; // Assuming role is stored in the token's custom claims

        if(!role){
            return res.status(403).json({ error: "Forbidden: No role assigned" });
        }
        if(!allowedRoles.includes(role)){
            return res.status(403).json({ error: "Forbidden: Access denied" });
        }
        next(); // User has one of the allowed roles
    };};
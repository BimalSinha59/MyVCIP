import { requireAuth } from '@clerk/express';
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js"

export const protectRoute = [
    requireAuth(),
    async (req, res, next) => {
        try {
            const clerkId = req.auth().userId;

            if(!clerkId){
                throw new ApiError(401, "Unauthorized - invalid token");
            }

            //find user in db by clerk ID
            const user = await User.findOne({ clerkId });

            if(!user){
                throw new ApiError(404, "User not found");
            }

            //attach user to req
            req.user = user;

            next();
        } catch (error) {
            console.error("Error in protectRoute middleware", error);
            throw new ApiError(500, "Internal Server Error");
        }
    }
]
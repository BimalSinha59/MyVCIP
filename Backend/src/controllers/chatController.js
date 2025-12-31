import { chatClient } from "../lib/stream.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export async function getStreamToken(req, res){
    try {
        //use clerkId for stream (not mongodb _id) => it should match the id 
        // we have in the stream dashboard.

        const token = chatClient.createToken(req.user.clerkId);
        res.status(200).json(
            new ApiResponse(
                200,
                {
                    token,
                    userId: req.user.clerkId,
                    userName: req.user.name,
                    userImage: req.user.image
                },
                "Stream token created successfully"
            )
        )
    } catch (error) {
        console.error("Error in getStreamToken: ", error);
        throw new ApiError(500, "Internal Server Error");
    }
}
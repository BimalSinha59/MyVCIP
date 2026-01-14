import { StreamVideoClient } from "@stream-io/video-react-sdk";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

let client = null;

/**
 * Initialize or reuse StreamVideoClient safely
 */
export const initializeStreamClient = async (user, token) => {
    if (!apiKey) {
        throw new Error("Stream API key is not provided.");
    }

    if (!user?.id || !token) {
        throw new Error("Invalid Stream user or token.");
    }

    // Reuse existing client if already initialized with same user
    if (client && client.user?.id === user.id) {
        return client;
    }

    // Disconnect existing client before creating a new one
    if (client) {
        await disconnectStreamClient();
    }

    client = new StreamVideoClient({
        apiKey,
        user,
        token,
    });

    return client;
};

/**
 * Disconnect and cleanup StreamVideoClient
 */
export const disconnectStreamClient = async () => {
    if (!client) return;

    try {
        await client.disconnectUser();
    } catch (error) {
        console.error("Error disconnecting Stream client:", error);
    } finally {
        client = null;
    }
};

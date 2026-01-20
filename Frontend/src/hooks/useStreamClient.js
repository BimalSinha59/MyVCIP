import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import {
    initializeStreamClient,
    disconnectStreamClient,
} from "../lib/stream";

import { sessionApi } from "../api/sessions";

function useStreamClient(
    session,
    loadingSession,
    isHost,
    isParticipant
) {
    const [streamClient, setStreamClient] = useState(null);
    const [call, setCall] = useState(null);
    const [chatClient, setChatClient] = useState(null);
    const [channel, setChannel] = useState(null);
    const [isInitializingCall, setIsInitializingCall] = useState(true);

    useEffect(() => {
        let videoCall = null;
        let chatClientInstance = null;
        let isActive = true; 

        const initCall = async () => {
            if (!session?.callId || !isActive) return;

            if (!isHost && !isParticipant) {
                setIsInitializingCall(false);
                return;
            }

            if (session.status === "completed") {
                setIsInitializingCall(false);
                return;
            }

            try {
                const response = await sessionApi.getStreamToken();
                const result = response.data?.data || response.data || response;

                const { token, userId, userName, userImage } = result;

                // 1. Initialize Video Client
                const client = await initializeStreamClient(
                    { id: userId, name: userName, image: userImage },
                    token
                );
                
                if (!isActive) return;
                setStreamClient(client);

                // 2. Join Video Call
                videoCall = client.call("default", session.callId);
                await videoCall.join({ create: isHost });
                
                if (!isActive) {
                    await videoCall.leave().catch(() => {});
                    return;
                }
                setCall(videoCall);

                // 3. Initialize Chat Client
                const apiKey = import.meta.env.VITE_STREAM_API_KEY;
                chatClientInstance = StreamChat.getInstance(apiKey);

                await chatClientInstance.connectUser(
                    { id: userId, name: userName, image: userImage },
                    token
                );

                if (!isActive) {
                    await chatClientInstance.disconnectUser();
                    return;
                }
                setChatClient(chatClientInstance);

                // 4. Watch Chat Channel
                const chatChannel = chatClientInstance.channel("messaging", session.callId);
                await chatChannel.watch();
                
                if (!isActive) return;
                setChannel(chatChannel);

            } catch (error) {
                console.error("Error init call:", error);
                toast.error("Failed to join video call");
            } finally {
                if (isActive) setIsInitializingCall(false);
            }
        };

        if (session && !loadingSession) {
            initCall();
        }

        return () => {
            isActive = false;
            
            const cleanup = async () => {
                try {
                    if (videoCall) {
                        if (videoCall.state.status !== 'left') {
                            await videoCall.leave();
                        }
                    }
                    if (chatClientInstance) {
                        await chatClientInstance.disconnectUser();
                    }

                    await disconnectStreamClient();
                } catch (error) {
                    if (!error.message?.includes("already been left")) {
                        console.error("Cleanup error:", error);
                    }
                }
            };

            cleanup();
        };
    }, [session, loadingSession, isHost, isParticipant]);

    return {
        streamClient,
        call,
        chatClient,
        channel,
        isInitializingCall,
    };
}

export default useStreamClient;
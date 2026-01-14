import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sessionApi } from "../api/sessions.js";

// --- MUTATIONS ---

export const useCreateSession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["createSession"],
        // We unwrap response.data so the component gets the clean object
        mutationFn: async (payload) => {
            const response = await sessionApi.createSession(payload);
            return response.data; 
        },
        onSuccess: () => {
            // Automatically refresh the active sessions list after creating one
            queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
        },
    });
};

export const useJoinSession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["joinSession"],
        mutationFn: async (sessionId) => {
            const response = await sessionApi.joinSession(sessionId);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
        },
    });
};

export const useEndSession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["endSession"],
        mutationFn: async (sessionId) => {
            const response = await sessionApi.endSession(sessionId);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
            queryClient.invalidateQueries({ queryKey: ["myRecentSessions"] });
        },
    });
};

// --- QUERIES ---

export const useActiveSessions = () => {
    return useQuery({
        queryKey: ["activeSessions"],
        queryFn: async () => {
            const response = await sessionApi.getActiveSessions();
            return response.data;
        },
    });
};

export const useMyRecentSessions = () => {
    return useQuery({
        queryKey: ["myRecentSessions"],
        queryFn: async () => {
            const response = await sessionApi.getMyRecentSessions();
            return response.data;
        },
    });
};

export const useSessionById = (id) => {
    return useQuery({
        queryKey: ["session", id],
        queryFn: async () => {
            const response = await sessionApi.getSessionById(id);
            return response.data;
        },
        enabled: !!id,
        refetchInterval: 5000, 
    });
};
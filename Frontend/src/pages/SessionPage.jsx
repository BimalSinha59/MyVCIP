import { useUser } from "@clerk/clerk-react";
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/codeExecution";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../lib/utils";
import { Loader2Icon, LogOutIcon, PhoneOffIcon } from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";
import ShareLinkButton from "../components/ShareLinkButton"

import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";
import toast from "react-hot-toast";

function SessionPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useUser();
    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const { data: sessionResponse, isLoading: loadingSession, refetch } = useSessionById(id);

    const joinSessionMutation = useJoinSession();
    const endSessionMutation = useEndSession();

    const session = sessionResponse?.data?.session || sessionResponse?.session;

    const isHost = session?.host?.clerkId === user?.id;
    const isParticipant = session?.participant?.clerkId === user?.id;

    const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(
        session,
        loadingSession,
        isHost,
        isParticipant
    );

    const problemData = useMemo(() => {
        if (!session?.problem) return null;

        return Object.values(PROBLEMS).find((p) => {
            const normalizedSessionProblem = session.problem.toLowerCase().replace(/-/g, " ").trim();
            const normalizedProblemTitle = p.title.toLowerCase().replace(/-/g, " ").trim();

            return normalizedSessionProblem === normalizedProblemTitle;
        });
    }, [session?.problem]);

    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [code, setCode] = useState("");

    useEffect(() => {
        if (problemData?.starterCode && !code) {
            const starter = problemData.starterCode[selectedLanguage] || "";
            setCode(starter);
        }
    }, [problemData, selectedLanguage, code]);

    useEffect(() => {
        if (!session || !user || loadingSession) return;
        if (isHost || isParticipant) return;

        joinSessionMutation.mutate(id, {
            onSuccess: () => {
                toast.success("Joined session!");
                refetch();
            },
            onError: (err) => {
                toast.error(err.response?.data?.message || "Failed to join");
                navigate("/dashboard");
            }
        });
    }, [session, user, loadingSession, isHost, isParticipant, id]);

    useEffect(() => {
        if (!session || loadingSession) return;
        if (session.status === "completed") navigate("/dashboard");
    }, [session, loadingSession, navigate]);

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setSelectedLanguage(newLang);

        const starterCode = problemData?.starterCode?.[newLang] || "";
        setCode(starterCode);
        setOutput(null);
    };

    const handleRunCode = async () => {
        setIsRunning(true);
        setOutput(null);

        const result = await executeCode(selectedLanguage, code);
        setOutput(result);
        setIsRunning(false);
    };

    const handleEndSession = () => {
        if (confirm("Are you sure you want to end this session?")) {
            endSessionMutation.mutate(id, {
                onSuccess: () => {
                    toast.success("Session ended");
                    navigate("/dashboard");
                },
                onError: (err) => {
                    toast.error(err.response?.data?.message || "Could not end session");
                }
            });
        }
    };

    return (
        <div className="h-screen bg-base-100 flex flex-col overflow-hidden">
            <Navbar />

            <div className="flex-1 min-h-0 bg-base-300 p-2">
                <PanelGroup direction="horizontal">
                    
                    {/* PANEL 1: PROBLEM DESCRIPTION (LEFT SIDECOLUMN) */}
                    <Panel defaultSize={30} minSize={25} className="bg-base-100 rounded-xl flex flex-col shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-base-300 flex items-start justify-between bg-base-200/50">
                            <div className="min-w-0">
                                <h1 className="text-xl font-bold text-base-content truncate">
                                    {session?.problem || "Loading..."}
                                </h1>
                                {problemData?.category && (
                                    <p className="text-xs text-base-content/60 mt-0.5">{problemData.category}</p>
                                )}
                                <p className="text-xs text-base-content/50 mt-1">
                                    Host: {session?.host?.name || "Loading..."} • {session?.participant ? 2 : 1}/2 users
                                </p>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                                <span className={`badge badge-sm font-medium ${getDifficultyBadgeClass(session?.difficulty)}`}>
                                    {session?.difficulty
                                        ? session.difficulty.charAt(0).toUpperCase() + session.difficulty.slice(1)
                                        : "Easy"}
                                </span>

                                {/* INVITE SHARING BUTTON */}
                                {session?.status === "active" && !session?.participant && (
                                    <ShareLinkButton />
                                )}


                                {isHost && session?.status === "active" && (
                                    <button
                                        onClick={handleEndSession}
                                        disabled={endSessionMutation.isPending}
                                        className="btn btn-error btn-xs gap-1 normal-case"
                                    >
                                        {endSessionMutation.isPending ? (
                                            <Loader2Icon className="w-3 h-3 animate-spin" />
                                        ) : (
                                            <LogOutIcon className="w-3 h-3" />
                                        )}
                                        End
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Description Content Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {problemData?.description && (
                                <div className="space-y-2 text-sm leading-relaxed text-base-content/90">
                                    <p>{problemData.description.text}</p>
                                    {problemData.description.notes?.map((note, idx) => (
                                        <p key={idx} className="bg-base-200/50 p-2 rounded-lg text-xs border border-base-300/40">{note}</p>
                                    ))}
                                </div>
                            )}

                            {problemData?.examples && problemData.examples.length > 0 && (
                                <div className="space-y-3 pt-2">
                                    <h2 className="text-sm font-bold text-base-content">Examples</h2>
                                    {problemData.examples.map((example, idx) => (
                                        <div key={idx} className="space-y-1">
                                            <p className="text-xs font-semibold text-base-content/70">Example {idx + 1}:</p>
                                            <div className="bg-base-200 rounded-lg p-3 font-mono text-xs space-y-1 border border-base-300">
                                                <div className="flex gap-2">
                                                    <span className="text-primary font-bold">Input:</span>
                                                    <span className="break-all">{example.input}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span className="text-secondary font-bold">Output:</span>
                                                    <span className="break-all">{example.output}</span>
                                                </div>
                                                {example.explanation && (
                                                    <p className="text-base-content/60 font-sans text-[11px] pt-1 border-t border-base-300 mt-1">
                                                        <span className="font-semibold text-base-content/80">Explanation:</span> {example.explanation}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {problemData?.constraints && problemData.constraints.length > 0 && (
                                <div className="space-y-2 pt-2">
                                    <h2 className="text-sm font-bold text-base-content">Constraints</h2>
                                    <ul className="space-y-1 text-xs bg-base-200/40 p-3 rounded-lg border border-base-300">
                                        {problemData.constraints.map((constraint, idx) => (
                                            <li key={idx} className="flex gap-1.5 items-start">
                                                <span className="text-primary select-none">•</span>
                                                <code className="font-mono text-base-content/90 bg-base-300/50 px-1 rounded break-all">{constraint}</code>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </Panel>

                    <PanelResizeHandle className="w-2 hover:bg-primary/40 active:bg-primary/80 transition-colors cursor-col-resize rounded" />

                    {/* PANEL 2: CORE WORKSPACE (EDITOR & OUTPUT) */}
                    <Panel defaultSize={45} minSize={35}>
                        <PanelGroup direction="vertical">
                            {/* Editor Container */}
                            <Panel defaultSize={70} minSize={40} className="bg-base-100 rounded-xl overflow-hidden shadow-sm flex flex-col">
                                <CodeEditorPanel
                                    selectedLanguage={selectedLanguage}
                                    code={code}
                                    isRunning={isRunning}
                                    onLanguageChange={handleLanguageChange}
                                    onCodeChange={(value) => setCode(value)}
                                    onRunCode={handleRunCode}
                                />
                            </Panel>

                            <PanelResizeHandle className="h-2 hover:bg-primary/40 active:bg-primary/80 transition-colors cursor-row-resize rounded" />

                            {/* Output Container */}
                            <Panel defaultSize={30} minSize={15} className="bg-base-100 rounded-xl overflow-hidden shadow-sm flex flex-col">
                                <OutputPanel output={output} />
                            </Panel>
                        </PanelGroup>
                    </Panel>

                    <PanelResizeHandle className="w-2 hover:bg-primary/40 active:bg-primary/80 transition-colors cursor-col-resize rounded" />

                    {/* PANEL 3: VIDEO STREAM & CHAT (RIGHT COMPANION COLUMN) */}
                    <Panel defaultSize={25} minSize={20} className="bg-base-100 rounded-xl overflow-hidden shadow-sm flex flex-col">
                        <div className="h-full bg-base-200/40 overflow-hidden flex flex-col">
                            {isInitializingCall ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="text-center">
                                        <Loader2Icon className="w-8 h-8 mx-auto animate-spin text-primary mb-2" />
                                        <p className="text-sm text-base-content/70">Connecting video stream...</p>
                                    </div>
                                </div>
                            ) : !streamClient || !call ? (
                                <div className="flex-1 flex items-center justify-center p-4">
                                    <div className="card bg-base-100 border border-base-300 shadow-sm max-w-xs">
                                        <div className="card-body items-center text-center p-6">
                                            <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center mb-2">
                                                <PhoneOffIcon className="w-6 h-6 text-error" />
                                            </div>
                                            <h2 className="text-md font-bold">Feed Unreachable</h2>
                                            <p className="text-xs text-base-content/60">Could not initialize Stream web RTC hooks.</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 h-full min-h-0">
                                    <StreamVideo client={streamClient}>
                                        <StreamCall call={call}>
                                            <VideoCallUI chatClient={chatClient} channel={channel} />
                                        </StreamCall>
                                    </StreamVideo>
                                </div>
                            )}
                        </div>
                    </Panel>

                </PanelGroup>
            </div>
        </div>
    );
}

export default SessionPage;
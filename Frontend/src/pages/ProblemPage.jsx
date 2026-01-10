import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems.js";
import Navbar from "../components/Navbar";
import ProblemDescription from "../components/ProblemDescription";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { executeCode } from "../lib/piston.js";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

function ProblemPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentProblemId, setCurrentProblemId] = useState("two-sum");
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [code, setCode] = useState(
        PROBLEMS[currentProblemId].starterCode.javascript
    );
    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const currentProblem = PROBLEMS[currentProblemId];

    // update problem when URL param changes
    useEffect(() => {
        if (id && PROBLEMS[id]) {
            setCurrentProblemId(id);
            setCode(PROBLEMS[id].starterCode[selectedLanguage]);
            setOutput(null);
        }
    }, [id, selectedLanguage]);

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setSelectedLanguage(newLang);
        setCode(currentProblem.starterCode[newLang]);
        setOutput(null);
    };

    const handleProblemChange = (newProblemId) =>
        navigate(`/problem/${newProblemId}`);

    const triggerConfetti = () => {
        confetti({
            particleCount: 80,
            spread: 250,
            origin: { x: 0.2, y: 0.6 },
        });

        confetti({
            particleCount: 80,
            spread: 250,
            origin: { x: 0.8, y: 0.6 },
        });
    };

    const normalizeOutput = (output) => {
        // normalize output for comparison
        return output
            .trim()
            .split("\n")
            .map((line) =>
                line
                    .trim()
                    .replace(/\[\s+/g, "[")
                    .replace(/\s+\]/g, "]")
                    .replace(/\s*,\s*/g, ",")
            )
            .filter((line) => line.length > 0)
            .join("\n");
    };

    const checkIfTestsPassed = (actualOutput, expectedOutput) => {
        const normalizedActual = normalizeOutput(actualOutput);
        const normalizedExpected = normalizeOutput(expectedOutput);

        return normalizedActual == normalizedExpected;
    };

    const handleRunCode = async () => {
        setIsRunning(true);
        setOutput(null);

        const result = await executeCode(selectedLanguage, code);
        setOutput(result);
        setIsRunning(false);

        if (result.success) {
            const expectedOutput =
                currentProblem.expectedOutput[selectedLanguage];
            const testsPassed = checkIfTestsPassed(
                result.output,
                expectedOutput
            );

            if (testsPassed) {
                triggerConfetti();
                toast.success("All tests passed! Great job!");
            } else {
                toast.error("Tests failed. Check your output");
            }
        } else {
            toast.error("Code execution failed!");
        }
    };

    return (
        <div className="h-screen bg-base-100 flex flex-col overflow-hidden">
            <Navbar />

            <div className="flex-1 overflow-hidden">
                <PanelGroup direction="horizontal">

                    {/* LEFT PANEL: Problem Description */}
                    <Panel defaultSize={40} minSize={30}>
                        <div className="h-full overflow-y-auto border-r border-base-300">
                            <ProblemDescription
                                problem={currentProblem}
                                currentProblemId={currentProblemId}
                                onProblemChange={handleProblemChange}
                                allProblems={Object.values(PROBLEMS)}
                            />
                        </div>
                    </Panel>

                    <PanelResizeHandle className="w-1 bg-base-300 hover:bg-blue-500 transition-all duration-300" />

                    {/* RIGHT PANEL: Editor & Output Group */}
                    <Panel defaultSize={60} minSize={30}>
                        <PanelGroup direction="vertical">

                            {/* TOP RIGHT: Editor Panel */}
                            <Panel defaultSize={70} minSize={20}>
                                <div className="h-full flex flex-col overflow-hidden">
                                    <CodeEditorPanel
                                        selectedLanguage={selectedLanguage}
                                        code={code}
                                        isRunning={isRunning}
                                        onLanguageChange={handleLanguageChange}
                                        onCodeChange={setCode}
                                        onRunCode={handleRunCode}
                                    />
                                </div>
                            </Panel>

                            <PanelResizeHandle className="h-1 bg-base-300 hover:bg-blue-500 transition-all duration-300" />

                            {/* BOTTOM RIGHT: Output Panel */}
                            <Panel defaultSize={30} minSize={10}>
                                <div className="h-full overflow-hidden flex flex-col bg-base-200">
                                    <OutputPanel output={output} />
                                </div>
                            </Panel>
                        </PanelGroup>
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    );
}

export default ProblemPage;

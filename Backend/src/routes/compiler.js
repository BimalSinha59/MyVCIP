import express from "express";

const router = express.Router();

router.post("/execute-code", async (req, res) => {
    try {
        const { language, code } = req.body;

        const JDOODLE_API_URL = process.env.JDOODLE_API_URL;
        const JDOODLE_CLIENT_ID = process.env.JDOODLE_CLIENT_ID;
        const JDOODLE_CLIENT_SECRET = process.env.JDOODLE_CLIENT_SECRET;

        const LANGUAGE_CONFIGS = {
            javascript: { language: "nodejs", versionIndex: "4" },
            python: { language: "python3", versionIndex: "4" },
            cpp: { language: "cpp17", versionIndex: "0" }
        };

        const config = LANGUAGE_CONFIGS[language.toLowerCase()];
        if (!config) {
            return res
                .status(400)
                .json({ success: false, error: "Unsupported language" });
        }

        const response = await fetch(JDOODLE_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clientId: JDOODLE_CLIENT_ID,
                clientSecret: JDOODLE_CLIENT_SECRET,
                script: code,
                language: config.language,
                versionIndex: config.versionIndex,
            }),
        });

        const data = await response.json();

        // Intercept JDoodle 429 Plan Limit Errors
        if (data.statusCode === 429) {
            return res.status(429).json({
                success: false,
                error: "Daily code execution limit reached. Please try again tomorrow!"
            });
        }

        if (data.statusCode === 200) {
            const outputText = data.output || "";

            // List common error indicators that Node, Python, or cpp throw in their stdout
            const hasRuntimeError =
                outputText.includes("SyntaxError:") ||
                outputText.includes("ReferenceError:") ||
                outputText.includes("TypeError:") ||
                outputText.includes("RangeError:") ||
                outputText.includes("Traceback (most recent call last):") || // Python
                outputText.includes("error:") ||                            // C++ Error
                outputText.includes("warning:") ||                          // C++ Warning
                outputText.includes("fatal error:") ||                      // C++ Fatal Error
                outputText.includes("main.cpp:");                           // C++ Compilation Line File

            if (hasRuntimeError) {
                // If an error is caught in the text, send it back as a failure
                return res.json({
                success: false,
                output: "",
                error: outputText,
                });
            }

            // If no error text is found, treat it as a real successful execution
            return res.json({
                success: true,
                output: outputText || "No output",
            });
        }

        return res.status(500).json({ success: false, error: "Execution failed" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

export default router;

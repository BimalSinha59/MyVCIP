export async function executeCode(language, code) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/execute-code`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ language, code })
        });

        return await response.json();
    } catch (error) {
        return {
            success: false,
            error: `Network error: ${error.message}`
        };
    }
}
const OLLAMA_URL = "http://localhost:11434/api/generate";

export const askAI = async (prompt: string) => {
    try {
        const res = await fetch(OLLAMA_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "llama3",
                prompt: prompt,
                stream: false
            })
        });
        if (!res.ok) throw new Error("Ollama 연결 실패");
        const data = await res.json();
        return data.response;
    } catch (e) {
        return "⚠️ 오류: 로컬 Ollama가 실행 중인지 확인하세요. (CORS 설정 필수)";
    }
};

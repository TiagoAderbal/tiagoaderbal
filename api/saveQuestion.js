export async function saveQuestion(question) {

  if (!question) return;

  try {
    await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question.trim(),
      }),
    });
  } catch (error) {
    console.error("[ATLAS] Erro ao salvar pergunta:", error.message);
  }
}
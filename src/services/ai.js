export async function askToTiago(question) {
  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    return errorData?.answer ?? "Desculpa, algo deu errado. Tenta novamente 🙏";
  }

  const data = await res.json();
  return data.answer;
}
export async function askToTiago(question) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // 429 vem do rate limit do Firewall da Vercel (corpo não é JSON da nossa API).
    if (res.status === 429) return { type: "RATE_LIMIT" };

    const data = await res.json();
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    return { type: error.name === "AbortError" ? "TIMEOUT" : "SERVER_ERROR" };
  }
}
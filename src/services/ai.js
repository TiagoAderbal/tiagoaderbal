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

    const data = await res.json();
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    return { type: error.name === "AbortError" ? "TIMEOUT" : "SERVER_ERROR" };
  }
}
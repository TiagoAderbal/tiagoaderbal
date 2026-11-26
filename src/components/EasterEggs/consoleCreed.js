// Recado para quem abre o DevTools. A trava evita duplicar no StrictMode (dev).
let printed = false;

export function printConsoleCreed() {
  if (printed || typeof window === "undefined") return;
  printed = true;

  console.log(
    "%cNothing is true, everything is permitted.",
    "font: 700 18px 'Space Grotesk', sans-serif; color: #b4c72c;",
  );
  console.log(
    "%cVocê abriu o DevTools. A Irmandade está de olho em você, colega dev.\n" +
      "Fique nas sombras, inspecione tudo e não confie em nenhuma div.\n\n" +
      "Psiu... o site guarda mais segredos: ↑ ↑ ↓ ↓ ← → ← → b a\n" +
      "Mas não adianta digitar aqui. Clique na página e digite lá, fora do console.",
    "font: 12px/1.6 monospace; color: #8a8d82;",
  );
}

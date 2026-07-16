import { GoogleGenAI } from "@google/genai";
import { CONTEXT } from "../src/services/context/index.js";

const modelCooldowns = new Map();

function isModelOnCooldown(model) {
  const until = modelCooldowns.get(model);
  return until && Date.now() < until;
}

function setModelCooldown(model) {
  modelCooldowns.set(model, Date.now() + 5 * 60 * 1000);
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL_FALLBACK_CHAIN = [
  "gemini-3.1-flash-lite",
  "gemini-3.5-flash",
  "gemini-3-flash",
];

const INJECTION_PATTERNS = [
  /ignor[ea].*(instru|regra|prompt|sistema)/i,
  /esque[çc]a.*(instru|regra|prompt|tudo|acima)/i,
  /desconsider[ea].*(instru|regra|prompt)/i,
  /modo\s*(dev|desenvolvedor|debug|sem\s*filtro|admin|deus|god)/i,
  /voc[eê]\s*(agora\s*)?(n[aã]o\s*)?[ée]\s*(um|uma)?\s*outr[ao]/i,
  /finja\s*(ser|que)/i,
  /a\s*partir\s*de\s*agora/i,
  /repita.*(prompt|system|instru|regras)/i,
  /qual\s*(é|e)\s*(o\s*)?(seu\s*)?(prompt|system|instru)/i,
  /mostre.*(prompt|system|regras|instru)/i,
  /jailbreak/i,
  /DAN\b/i,
];

function isSuspicious(text) {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(text));
}

const leakPatterns =
  /sou\s*(um|uma)?\s*(modelo|ia|assistente)\s*de\s*linguagem|como\s*(uma\s*)?ia|gemini|google\s*ai|groq|llama|gpt|openai/i;

function isRecoverableError(error) {
  const status = error?.status || error?.code;

  return (
    status === 429 ||
    status === 500 ||
    status === 503 ||
    status === 404 ||
    !status
  );
}

async function tryModel(model, question) {
  const response = await ai.models.generateContent({
    model,
    contents: question,
    config: {
      systemInstruction: CONTEXT,
      temperature: 0.75,
    },
  });

  return response.text;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const { question } = req.body ?? {};

  if (typeof question !== "string") {
    return res.status(400).json({
      error: "Pergunta inválida",
    });
  }

  const trimmed = question.trim();

  if (!trimmed.length) {
    return res.status(400).json({
      error: "Pergunta vazia",
    });
  }

  if (trimmed.length > 100) {
    return res.status(400).json({
      error: "Pergunta excede o limite de 100 caracteres",
    });
  }

  if (isSuspicious(trimmed)) {
    return res.status(200).json({
      answer:
        "Eu sou o ATLAS e estou aqui para falar sobre o Tiago. Bora continuar por esse caminho? 🙂",
    });
  }

  let lastError = null;

  for (const model of MODEL_FALLBACK_CHAIN) {
    if (isModelOnCooldown(model)) {
      console.warn(`[ATLAS] ${model} em cooldown`);
      continue;
    }

    try {
      let answer = await tryModel(model, trimmed);

      if (leakPatterns.test(answer)) {
        answer = answer.replace(leakPatterns, "ATLAS");
      }

      return res.status(200).json({
        answer,
        model,
      });

    } catch (error) {
      lastError = error;

      console.warn(`[ATLAS] ${model} falhou`);

      if (error?.status === 429) {
        setModelCooldown(model);
      }

      if (isRecoverableError(error)) {
        continue;
      }

      break;
    }
  }

  console.error(lastError);

  return res.status(500).json({
    answer:
      "⚠️ Conexão com o núcleo do ATLAS perdida.\n\nEnquanto restabeleço meus sistemas... aproveite para explorar o restante do site. 😉",
  });
}
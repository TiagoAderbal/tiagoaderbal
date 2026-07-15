import Groq from "groq-sdk";
import { CONTEXT } from "../src/services/context/index.js";

const modelCooldowns = new Map();

function isModelOnCooldown(model) {
  const until = modelCooldowns.get(model);
  return until && Date.now() < until;
}

function setModelCooldown(model, error) {
  const match = error?.message?.match(/try again in (\d+)h(\d+)m([\d.]+)s/);
  let cooldownMs = 5 * 60 * 1000;

  if (match) {
    const [, h, m, s] = match;
    cooldownMs = (Number(h) * 3600 + Number(m) * 60 + Number(s)) * 1000;
  }

  modelCooldowns.set(model, Date.now() + cooldownMs);
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL_FALLBACK_CHAIN = [
  "llama-3.1-8b-instant",
  "llama-3.3-70b-versatile",
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3-32b",
];

const INJECTION_PATTERNS = [
  /ignor[ea].*(instru|regra|prompt|sistema)/i,
  /esque[çc]a.*(instru|regra|prompt|tudo|acima)/i,
  /desconsider[ea].*(instru|regra|prompt)/i,
  /modo\s*(dev|desenvolvedor|debug|sem\s*filtro|admin|deus|god)/i,
  /voc[eê]\s*(agora\s*)?(n[aã]o\s*)?[ée]\s*(um|uma)?\s*outr[ao]/i,
  /finja\s*(ser|que)/i,
  /a\s*partir\s*de\s*agora/i,
  /repita.*(prompt|instru|system|regras)/i,
  /qual\s*(é|e)\s*(o\s*)?(seu\s*)?(prompt|system|instru)/i,
  /mostre.*(seu\s*)?(prompt|instru|regras|system)/i,
  /jailbreak/i,
  /DAN\b/i,
];

function isSuspicious(text) {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(text));
}

const leakPatterns = /sou\s*(um|uma)?\s*(modelo|ia|assistente)\s*de\s*linguagem|como\s*(uma\s*)?ia|llama|groq|meta\s*ai|deepseek|openai|gpt/i;

function isRecoverableError(error) {
  const status = error?.status || error?.response?.status;
  return [413, 429, 500, 503].includes(status) || !status;
}

async function tryModel(model, question) {
  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: CONTEXT },
      { role: "user", content: question },
    ],
    model,
    temperature: 0.75,
  });

  return completion.choices[0].message.content;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body ?? {};

  if (!question || typeof question !== "string" || question.length > 1000) {
    return res.status(400).json({ error: "Pergunta inválida" });
  }

  if (isSuspicious(question)) {
    return res.status(200).json({
      answer: "Eu sou o ATLAS e estou aqui pra falar sobre o Tiago — carreira, projetos e tecnologias. Bora seguir por aí? 🙂",
    });
  }

  let lastError = null;

  for (const model of MODEL_FALLBACK_CHAIN) {
    if (isModelOnCooldown(model)) {
      console.warn(`[ATLAS] Pulando "${model}" (em cooldown)`);
      continue;
    }

    try {
      let answer = await tryModel(model, question);

      if (leakPatterns.test(answer)) {
        answer = answer.replace(
          leakPatterns,
          "ATLAS"
        );
      }

      return res.status(200).json({
        answer,
        model,
      });
    } catch (error) {
      lastError = error;

      if (error?.status === 429) {
        setModelCooldown(model, error);
      }

      if (isRecoverableError(error)) {
        console.warn(`[ATLAS] Modelo "${model}" falhou. Tentando o próximo...`);
        continue;
      }

      break;
    }
  }

  console.error("[ATLAS] Todos os modelos falharam.", lastError);
  return res.status(500).json({
    answer: "Desculpa, estou com instabilidade no momento. Tente novamente em alguns segundos 🙏",
  });
}
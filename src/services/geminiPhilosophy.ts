import { GEMINI_API_KEY, hasGeminiKey } from '../config/gemini';

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta';
const MODEL = 'gemini-2.0-flash';
const env =
  typeof import.meta !== 'undefined'
    ? (import.meta as { env?: { VITE_CHATBOX_API_BASE_URL?: string } }).env
    : undefined;
const CHATBOX_API_BASE_URL = (env?.VITE_CHATBOX_API_BASE_URL || '').trim();
const CHATBOX_DEFAULT_PATH = '/api/chat';

const SYSTEM_PROMPT = `Bạn là trợ lý giải đáp về triết học Phật giáo Việt Nam. Trả lời ngắn gọn, rõ ràng, bằng tiếng Việt. Tập trung vào triết học Phật giáo Việt Nam (thiền Trúc Lâm, nhập thế, ca dao, lễ hội, nhân vật như Trần Nhân Tông, Thích Nhất Hạnh).`;

export function canUsePhilosophyAI(): boolean {
  // If ChatBox API is available (via env or Vite proxy), no Gemini key is required.
  return true;
}

/** Chỉ cho phép 1 request tới Gemini tại một thời điểm (tránh 429 do gọi trùng). */
let inFlightRequest: Promise<string> | null = null;

export async function askPhilosophyAI(
  prompt: string,
  context?: string
): Promise<string> {
  if (inFlightRequest) {
    throw new Error('Đang xử lý yêu cầu trước. Vui lòng đợi vài giây rồi thử lại.');
  }

  const doRequest = async (): Promise<string> => {
    const userText = context ? `${context}\n\nCâu hỏi / yêu cầu: ${prompt}` : prompt;

    // Prefer the hosted chatbox API to avoid direct Gemini quota issues in FE.
    const chatUrlBase = CHATBOX_API_BASE_URL || '';
    const chatUrl = chatUrlBase
      ? `${chatUrlBase.replace(/\/+$/, '')}${CHATBOX_DEFAULT_PATH}`
      : CHATBOX_DEFAULT_PATH; // uses Vite dev proxy when running locally

    try {
      const chatRes = await fetch(chatUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userText }),
      });

      if (chatRes.ok) {
        const data = (await chatRes.json()) as { answer?: string | null };
        const answer = data?.answer?.trim();
        if (answer) return answer;
        throw new Error('ChatBox API không trả về nội dung trả lời.');
      }

      // If chatbox fails, we fall back to direct Gemini below.
    } catch {
      // Ignore and fall back to direct Gemini.
    }

    if (!GEMINI_API_KEY?.trim()) {
      throw new Error(
        'Không gọi được ChatBox API và cũng chưa cấu hình Gemini key. Thêm VITE_GOOGLE_AI_API_KEY vào file .env hoặc set VITE_CHATBOX_API_BASE_URL.'
      );
    }

    const url = `${GEMINI_BASE}/models/${MODEL}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;

    const body: Record<string, unknown> = {
      contents: [{ parts: [{ text: userText }] }],
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitHint = retryAfter ? ` Đợi khoảng ${retryAfter} giây.` : ' Đợi 1–2 phút rồi thử lại.';
        throw new Error(
          `Bạn đã vượt giới hạn gọi API (free tier).${waitHint} Hoặc vào Google AI Studio → API keys → "Set up billing" để tăng hạn mức.`
        );
      }
      if (response.status === 403) throw new Error('API key không hợp lệ hoặc không có quyền.');
      throw new Error(`Lỗi API: ${response.status}. ${errText.slice(0, 200)}`);
    }

    const data = (await response.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
      error?: { message?: string };
    };

    if (data.error?.message) throw new Error(data.error.message);

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) throw new Error('Không nhận được câu trả lời từ AI.');

    return text;
  };

  inFlightRequest = doRequest();
  try {
    return await inFlightRequest;
  } finally {
    inFlightRequest = null;
  }
}

// Chỉ sử dụng ChatBox API từ backend, không dùng Gemini API ở FE nữa.
// Đọc base URL cho ChatBox API từ env (nếu có), nếu không thì dùng luôn backend Render mặc định.
const env =
  typeof import.meta !== 'undefined'
    ? (import.meta as { env?: { VITE_CHATBOX_API_BASE_URL?: string } }).env
    : undefined;

const CHATBOX_DEFAULT_PATH = '/api/chat';
const DEFAULT_CHATBOX_BASE = 'https://mln101-aichatbox.onrender.com';

const CHATBOX_API_BASE_URL = (env?.VITE_CHATBOX_API_BASE_URL?.trim() || DEFAULT_CHATBOX_BASE);

export function canUsePhilosophyAI(): boolean {
  // ChatBox API luôn sẵn sàng (dùng backend mặc định hoặc override qua env).
  return true;
}

/** Chỉ cho phép 1 request tới ChatBox API tại một thời điểm (tránh duplicate calls). */
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

    // Chỉ gọi ChatBox API từ backend.
    const chatUrlBase = CHATBOX_API_BASE_URL || DEFAULT_CHATBOX_BASE;
    const chatUrl = `${chatUrlBase.replace(/\/+$/, '')}${CHATBOX_DEFAULT_PATH}`;

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

      // Nếu ChatBox API trả về lỗi, throw với message chi tiết.
      const errorText = await chatRes.text();
      throw new Error(
        `ChatBox API lỗi (${chatRes.status}): ${errorText.slice(0, 200)}`
      );
    } catch (err) {
      // Nếu là network error hoặc lỗi khác, wrap lại với message thân thiện.
      if (err instanceof Error) {
        // Nếu đã có message rõ ràng từ ChatBox API, giữ nguyên.
        if (err.message.includes('ChatBox API')) {
          throw err;
        }
        // Network error hoặc lỗi khác.
        throw new Error(
          `Không thể kết nối tới ChatBox API. Vui lòng thử lại sau 1–2 phút. Chi tiết: ${err.message}`
        );
      }
      throw new Error('Lỗi không xác định khi gọi ChatBox API.');
    }
  };

  inFlightRequest = doRequest();
  try {
    return await inFlightRequest;
  } finally {
    inFlightRequest = null;
  }
}

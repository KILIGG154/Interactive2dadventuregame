import { DecisionMoment } from '../types/game';

export const decisionMoments: DecisionMoment[] = [
  {
    id: 'dm-truc-lam-quoc-gia-loan',
    scenario: 'Quốc gia đang trong cảnh loạn lạc, dân chúng khổ đau. Là một thiền sư thuộc truyền thống Trúc Lâm, bạn nên chọn con đường nào?',
    options: [
      {
        id: 'a',
        text: 'Rút vào núi sâu ẩn tu, giữ tâm thanh tịnh, không can dự thế sự.',
      },
      {
        id: 'b',
        text: 'Nhập triều làm cố vấn cho nhà vua, dùng trí tuệ Phật học để giúp định hướng quốc gia.',
      },
      {
        id: 'c',
        text: 'Ở giữa dân gian, dạy đạo, lập am thất và giúp người bình dân vượt qua khổ nạn.',
      },
    ],
    philosophicalAnalysis: {
      a: {
        fitLevel: 'low',
        explanation:
          'Ẩn tu tuyệt đối gần với truyền thống ly thế hơn là tinh thần Trúc Lâm. Trần Nhân Tông và các Tổ không tách khỏi đời mà luôn đặt mình trong vận mệnh dân tộc.',
        score: 30,
      },
      b: {
        fitLevel: 'high',
        explanation:
          'Trúc Lâm là mẫu hình vua – thiền sư. Nhập triều giúp nước, vận dụng trí tuệ giác ngộ để hộ quốc an dân là một trong những nét độc đáo nhất của Phật giáo Việt Nam.',
        score: 100,
      },
      c: {
        fitLevel: 'medium',
        explanation:
          'Ở giữa dân giúp đời rất gần với tinh thần nhập thế và từ bi của Trúc Lâm. Tuy nhiên, trong bối cảnh quốc gia nguy biến, việc tham gia ở tầm hoạch định chính sách (như phương án B) thể hiện rõ hơn vai trò “quốc sư”.',
        score: 70,
      },
    },
  },
];


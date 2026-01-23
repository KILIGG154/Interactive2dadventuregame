import { Era } from '../types/game';

export const gameData: Era[] = [
  {
    id: 'ly-tran',
    name: 'Lý - Trần',
    period: 'Thế kỷ 11-14',
    color: '#4A7C59',
    bgColor: '#D4A574',
    landmark: {
      name: 'Núi Yên Tử',
      x: 20,
      y: 15,
    },
    checkpoints: [
      {
        id: 'lt-1',
        title: 'Chùa Diên Hựu',
        description: 'Nơi khai sinh Phật giáo Việt Nam',
        x: 15,
        y: 20,
        status: 'active',
        icon: 'lotus',
        era: 'ly-tran',
        question: {
          title: 'Sự khởi nguồn của Phật giáo Việt Nam',
          question: 'Chùa nào được xem là ngôi chùa đầu tiên ở Việt Nam thời Lý?',
          options: [
            'Chùa Một Cột',
            'Chùa Diên Hựu',
            'Chùa Trấn Quốc',
            'Chùa Bút Tháp'
          ],
          correctAnswer: 1,
          explanation: 'Chùa Diên Hựu (Dâu) ở Bắc Ninh được xem là ngôi chùa cổ nhất Việt Nam, được xây dựng từ thời Lý Nam Đế (544-548).',
          historicalFigure: 'Lý Thánh Tông',
        },
      },
      {
        id: 'lt-2',
        title: 'Thiền sư Vạn Hạnh',
        description: 'Quốc sư đời Lý',
        x: 25,
        y: 25,
        status: 'locked',
        icon: 'bell',
        era: 'ly-tran',
        question: {
          title: 'Thiền sư Vạn Hạnh',
          question: 'Thiền sư Vạn Hạnh nổi tiếng với triết lý nào?',
          options: [
            'Thiền tông Trúc Lâm',
            'Tứ đại giai không',
            'Nhất hạnh tam muội',
            'Thiền Lâm Tế'
          ],
          correctAnswer: 1,
          explanation: 'Thiền sư Vạn Hạnh nổi tiếng với triết lý "Tứ đại giai không" - vạn vật đều vô thường.',
        },
      },
      {
        id: 'lt-3',
        title: 'Trần Nhân Tông',
        description: 'Vua tổ thiền phái Trúc Lâm',
        x: 35,
        y: 20,
        status: 'locked',
        icon: 'sutra',
        era: 'ly-tran',
        question: {
          title: 'Thiền phái Trúc Lâm - Trần Nhân Tông',
          question: 'Trần Nhân Tông sáng lập thiền phái nào?',
          options: [
            'Thiền Lâm Tế',
            'Thiền Tào Động',
            'Thiền Trúc Lâm',
            'Thiền Vô Ngôn Thông'
          ],
          correctAnswer: 2,
          explanation: 'Trần Nhân Tông là vị vua duy nhất trong lịch sử Việt Nam xuất gia, sáng lập thiền phái Trúc Lâm Yên Tử.',
          historicalFigure: 'Trần Nhân Tông',
        },
      },
      {
        id: 'lt-4',
        title: 'Núi Yên Tử',
        description: 'Thánh địa Phật giáo',
        x: 45,
        y: 25,
        status: 'locked',
        icon: 'lotus',
        era: 'ly-tran',
        question: {
          title: 'Yên Tử - Thánh địa Phật giáo',
          question: 'Yên Tử nổi tiếng là nơi tu hành của vị vua nào?',
          options: [
            'Lý Thánh Tông',
            'Trần Thái Tông',
            'Trần Nhân Tông',
            'Lê Thánh Tông'
          ],
          correctAnswer: 2,
          explanation: 'Trần Nhân Tông xuất gia tu tại Yên Tử và sáng lập thiền phái Trúc Lâm tại đây.',
        },
      },
      {
        id: 'lt-5',
        title: 'Chùa Một Cột',
        description: 'Kiến trúc độc đáo',
        x: 55,
        y: 22,
        status: 'locked',
        icon: 'bell',
        era: 'ly-tran',
        question: {
          title: 'Chùa Một Cột',
          question: 'Chùa Một Cột được xây dựng dưới triều đại nào?',
          options: [
            'Lý Thái Tổ',
            'Lý Thánh Tông',
            'Lý Thái Tông',
            'Lý Nhân Tông'
          ],
          correctAnswer: 2,
          explanation: 'Chùa Một Cột được xây dựng năm 1049 dưới thời Lý Thái Tông, với kiến trúc độc đáo hình hoa sen nở trên mặt nước.',
        },
      },
    ],
  },
  {
    id: 'tay-son',
    name: 'Thời kỳ Tây Sơn',
    period: 'Thế kỷ 18',
    color: '#C4302B',
    bgColor: '#8B4513',
    landmark: {
      name: 'Làng quê miền Trung',
      x: 65,
      y: 40,
    },
    checkpoints: [
      {
        id: 'ts-1',
        title: 'Phật giáo dân gian',
        description: 'Phật giáo gắn liền đời sống',
        x: 65,
        y: 30,
        status: 'locked',
        icon: 'lotus',
        era: 'tay-son',
        question: {
          title: 'Phật giáo thời Tây Sơn',
          question: 'Đặc điểm nào là nổi bật của Phật giáo thời Tây Sơn?',
          options: [
            'Phật giáo cung đình phát triển mạnh',
            'Phật giáo gắn liền với dân gian',
            'Thiền phái mới xuất hiện',
            'Phật giáo bị suy thoái'
          ],
          correctAnswer: 1,
          explanation: 'Thời Tây Sơn, Phật giáo gắn bó mật thiết với đời sống dân gian, ít chịu ảnh hưởng triều đình.',
        },
      },
      {
        id: 'ts-2',
        title: 'Chùa làng',
        description: 'Trung tâm văn hóa làng xã',
        x: 75,
        y: 35,
        status: 'locked',
        icon: 'bell',
        era: 'tay-son',
        question: {
          title: 'Vai trò chùa làng',
          question: 'Chùa làng thời Tây Sơn có vai trò gì?',
          options: [
            'Chỉ là nơi thờ phượng',
            'Trung tâm văn hóa và giáo dục',
            'Nơi tập trung quân sự',
            'Chỉ dành cho tu sĩ'
          ],
          correctAnswer: 1,
          explanation: 'Chùa làng là trung tâm văn hóa, giáo dục và sinh hoạt cộng đồng của làng xã Việt Nam.',
        },
      },
    ],
  },
  {
    id: 'can-dai',
    name: 'Phật giáo cận đại',
    period: 'Thế kỷ 19-20',
    color: '#9370DB',
    bgColor: '#D3D3D3',
    landmark: {
      name: 'Chùa Thiên Mụ',
      x: 20,
      y: 60,
    },
    checkpoints: [
      {
        id: 'cd-1',
        title: 'Chùa Thiên Mụ',
        description: 'Biểu tượng cố đô Huế',
        x: 20,
        y: 55,
        status: 'locked',
        icon: 'lotus',
        era: 'can-dai',
        question: {
          title: 'Chùa Thiên Mụ - Huế',
          question: 'Chùa Thiên Mụ nổi tiếng với công trình nào?',
          options: [
            'Tháp Báo Thiên',
            'Tháp Phước Duyên',
            'Tháp Từ Nhân',
            'Tháp Linh Mụ'
          ],
          correctAnswer: 1,
          explanation: 'Tháp Phước Duyên cao 21m với 7 tầng là biểu tượng của chùa Thiên Mụ và cố đô Huế.',
        },
      },
      {
        id: 'cd-2',
        title: 'Phật giáo cải cách',
        description: 'Phong trào canh tân',
        x: 30,
        y: 60,
        status: 'locked',
        icon: 'sutra',
        era: 'can-dai',
        question: {
          title: 'Phong trào cải cách Phật giáo',
          question: 'Ai là người khởi xướng phong trào cải cách Phật giáo đầu thế kỷ 20?',
          options: [
            'Thiền sư Thích Thanh Từ',
            'Hòa thượng Thích Trí Quang',
            'Cư sĩ Lê Đình Thám',
            'Thiền sư Thích Nhất Hạnh'
          ],
          correctAnswer: 2,
          explanation: 'Cư sĩ Lê Đình Thám là một trong những người khởi xướng phong trào cải cách Phật giáo Việt Nam đầu thế kỷ 20.',
        },
      },
      {
        id: 'cd-3',
        title: 'Hội Phật giáo',
        description: 'Tổ chức thống nhất',
        x: 40,
        y: 58,
        status: 'locked',
        icon: 'bell',
        era: 'can-dai',
        question: {
          title: 'Giáo hội Phật giáo Việt Nam',
          question: 'Giáo hội Phật giáo Việt Nam thống nhất được thành lập năm nào?',
          options: [
            '1945',
            '1951',
            '1958',
            '1963'
          ],
          correctAnswer: 1,
          explanation: 'Giáo hội Phật giáo Việt Nam thống nhất được thành lập năm 1951 tại Huế.',
        },
      },
    ],
  },
  {
    id: 'hien-dai',
    name: 'Phật giáo hiện đại',
    period: 'Thế kỷ 21',
    color: '#4169E1',
    bgColor: '#FFFFFF',
    landmark: {
      name: 'Thiền viện đương đại',
      x: 50,
      y: 70,
    },
    checkpoints: [
      {
        id: 'hd-1',
        title: 'Thiền sư Thích Nhất Hạnh',
        description: 'Thiền chánh niệm toàn cầu',
        x: 50,
        y: 65,
        status: 'locked',
        icon: 'lotus',
        era: 'hien-dai',
        question: {
          title: 'Thiền sư Thích Nhất Hạnh',
          question: 'Thiền sư Thích Nhất Hạnh nổi tiếng với dòng tu nào?',
          options: [
            'Dòng Thiền Tông',
            'Dòng Làng Mai',
            'Dòng Trúc Lâm',
            'Dòng Liễu Quán'
          ],
          correctAnswer: 1,
          explanation: 'Thiền sư Thích Nhất Hạnh sáng lập dòng tu Làng Mai (Plum Village) tại Pháp, phổ biến thiền chánh niệm ra toàn thế giới.',
          historicalFigure: 'Thích Nhất Hạnh',
        },
      },
      {
        id: 'hd-2',
        title: 'Phật giáo nhập thế',
        description: 'Tham gia xã hội',
        x: 60,
        y: 70,
        status: 'locked',
        icon: 'sutra',
        era: 'hien-dai',
        question: {
          title: 'Phật giáo nhập thế',
          question: 'Phật giáo nhập thế là gì?',
          options: [
            'Phật giáo tham gia chính trị',
            'Phật giáo phục vụ xã hội, cộng đồng',
            'Phật giáo xuất gia',
            'Phật giáo từ thiện'
          ],
          correctAnswer: 1,
          explanation: 'Phật giáo nhập thế là xu hướng Phật giáo tham gia tích cực vào các hoạt động xã hội, từ thiện, giáo dục để phục vụ cộng đồng.',
        },
      },
      {
        id: 'hd-3',
        title: 'Thiền viện hiện đại',
        description: 'Không gian tu học đương đại',
        x: 70,
        y: 68,
        status: 'locked',
        icon: 'bell',
        era: 'hien-dai',
        question: {
          title: 'Thiền viện đương đại',
          question: 'Thiền viện Trúc Lâm nổi tiếng ở đâu?',
          options: [
            'Đà Lạt',
            'Hà Nội',
            'Huế',
            'Sài Gòn'
          ],
          correctAnswer: 0,
          explanation: 'Thiền viện Trúc Lâm Đà Lạt là một trong những thiền viện nổi tiếng nhất Việt Nam, nằm giữa khung cảnh thiên nhiên tuyệt đẹp.',
        },
      },
      {
        id: 'hd-4',
        title: 'Phật giáo toàn cầu',
        description: 'Kết nối quốc tế',
        x: 80,
        y: 65,
        status: 'locked',
        icon: 'lotus',
        era: 'hien-dai',
        question: {
          title: 'Phật giáo Việt Nam ra thế giới',
          question: 'Phật giáo Việt Nam đóng góp gì cho Phật giáo thế giới?',
          options: [
            'Thiền chánh niệm (Mindfulness)',
            'Thiền Mật Tông',
            'Thiền Tịnh Độ',
            'Thiền Đốn Ngộ'
          ],
          correctAnswer: 0,
          explanation: 'Phật giáo Việt Nam, đặc biệt qua Thiền sư Thích Nhất Hạnh, đã phổ biến thiền chánh niệm (Mindfulness) ra toàn thế giới.',
        },
      },
    ],
  },
];

export const achievements = [
  {
    id: 'first-step',
    name: 'Bước đầu giác ngộ',
    description: 'Hoàn thành checkpoint đầu tiên',
    icon: '🪷',
  },
  {
    id: 'era-master',
    name: 'Thông thạo thời kỳ',
    description: 'Hoàn thành tất cả checkpoint trong một khu vực',
    icon: '📿',
  },
  {
    id: 'scholar',
    name: 'Học giả Phật học',
    description: 'Đạt 500 điểm',
    icon: '📚',
  },
  {
    id: 'enlightened',
    name: 'Giác ngộ viên mãn',
    description: 'Hoàn thành toàn bộ hành trình',
    icon: '✨',
  },
];

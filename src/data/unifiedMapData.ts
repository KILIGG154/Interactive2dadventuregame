import { Checkpoint } from '../types/game';

// Unified map - all checkpoints in zigzag pattern
export const unifiedMapCheckpoints: Checkpoint[] = [
  // ===== LÝ - TRẦN Dynasty (Zigzag from left to right) =====
  {
    id: 'cp-1',
    title: 'Chùa Diên Hựu',
    description: 'Khởi đầu hành trình',
    x: 20,
    y: 70,
    status: 'active',
    icon: 'lotus',
    era: 'ly-tran',
    question: {
      title: 'Sự khởi nguồn của Phật giáo Việt Nam',
      question: 'Chùa nào được xem là ngôi chùa đầu tiên ở Việt Nam?',
      options: [
        'Chùa Một Cột',
        'Chùa Diên Hựu',
        'Chùa Trấn Quốc',
        'Chùa Bút Tháp'
      ],
      correctAnswer: 1,
      hint: '💡 Gợi ý: Chùa này còn có tên là Chùa Dâu, nằm ở Bắc Ninh, được xây dựng từ thế kỷ thứ 6.',
      explanation: 'Chùa Diên Hựu (Dâu) ở Bắc Ninh được xem là ngôi chùa cổ nhất Việt Nam, được xây dựng từ thời Lý Nam Đế (544-548).',
      historicalFigure: 'Lý Thánh Tông',
    },
    theory: {
      title: 'Chùa Diên Hựu – Ngôi chùa cổ nhất Việt Nam',
      content: 'Chùa Diên Hựu còn gọi là Chùa Dâu, tọa lạc tại Bắc Ninh. Đây được xem là ngôi chùa đầu tiên và cổ nhất ở Việt Nam, được xây dựng từ thời Lý Nam Đế (khoảng 544–548). Chùa gắn liền với sự hình thành và phát triển của Phật giáo Việt Nam thời kỳ đầu.',
    },
  },
  {
    id: 'cp-2',
    title: 'Chùa Một Cột',
    description: 'Kiến trúc độc đáo',
    x: 30,
    y: 50,
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
      hint: '💡 Gợi ý: Chùa được xây dựng năm 1049, dưới thời vị vua thứ 3 của nhà Lý.',
      explanation: 'Chùa Một Cột được xây dựng năm 1049 dưới thời Lý Thái Tông, với kiến trúc độc đáo hình hoa sen nở trên mặt nước.',
    },
    theory: {
      title: 'Chùa Một Cột – Kiến trúc một cột độc đáo',
      content: 'Chùa Một Cột được xây dựng năm 1049, dưới triều vua Lý Thái Tông (vị vua thứ ba của nhà Lý). Chùa có kiến trúc rất đặc trưng: một cột đá giữa hồ, trên đỉnh là đài sen, tượng trưng cho hoa sen nở trên mặt nước. Đây là một trong những biểu tượng văn hóa Phật giáo và kiến trúc Việt Nam.',
    },
  },
  {
    id: 'cp-3',
    title: 'Thiền sư Vạn Hạnh',
    description: 'Quốc sư đời Lý',
    x: 40,
    y: 68,
    status: 'locked',
    icon: 'sutra',
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
      hint: '💡 Gợi ý: Triết lý nhấn mạnh bốn đại (đất, nước, lửa, gió) đều vô thường, không thật có.',
      explanation: 'Thiền sư Vạn Hạnh nổi tiếng với triết lý "Tứ đại giai không" - vạn vật đều vô thường.',
    },
    theory: {
      title: 'Thiền sư Vạn Hạnh – Quốc sư đời Lý',
      content: 'Thiền sư Vạn Hạnh (938–1018) là quốc sư dưới thời Lý. Ngài nổi tiếng với triết lý "Tứ đại giai không": bốn đại (đất, nước, lửa, gió) đều là không, vạn vật vô thường. Triết lý này ảnh hưởng sâu sắc đến Phật giáo và tư tưởng Việt Nam thời Lý.',
    },
  },
  {
    id: 'cp-4',
    title: 'Trần Nhân Tông',
    description: 'Vua tổ thiền Trúc Lâm',
    x: 50,
    y: 48,
    status: 'locked',
    icon: 'lotus',
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
      hint: '💡 Gợi ý: Thiền phái mang bản sắc Việt Nam, gắn với núi Yên Tử.',
      explanation: 'Trần Nhân Tông là vị vua duy nhất trong lịch sử Việt Nam xuất gia, sáng lập thiền phái Trúc Lâm Yên Tử.',
      historicalFigure: 'Trần Nhân Tông',
    },
    theory: {
      title: 'Trần Nhân Tông – Sáng lập thiền phái Trúc Lâm',
      content: 'Trần Nhân Tông (1258–1308) là vị vua thứ ba nhà Trần. Sau khi truyền ngôi, ngài xuất gia và là vị vua duy nhất trong lịch sử Việt Nam đi tu. Ngài sáng lập thiền phái Trúc Lâm Yên Tử – thiền phái mang bản sắc Việt Nam, kết hợp Thiền – Tịnh – Mật.',
    },
    // Gắn Decision Moment về lựa chọn hành động của thiền sư Trúc Lâm khi quốc gia loạn lạc
    decisionMomentId: 'dm-truc-lam-quoc-gia-loan',
  },
  {
    id: 'cp-5',
    title: 'Núi Yên Tử',
    description: 'Thánh địa Phật giáo',
    x: 60,
    y: 70,
    status: 'locked',
    icon: 'bell',
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
      hint: '💡 Gợi ý: Chính vị vua đã sáng lập thiền phái Trúc Lâm Yên Tử.',
      explanation: 'Trần Nhân Tông xuất gia tu tại Yên Tử và sáng lập thiền phái Trúc Lâm tại đây.',
    },
    theory: {
      title: 'Yên Tử – Thánh địa Phật giáo Trúc Lâm',
      content: 'Núi Yên Tử (Quảng Ninh) là nơi Trần Nhân Tông xuất gia tu hành và sáng lập thiền phái Trúc Lâm. Yên Tử được xem là thánh địa của Phật giáo Việt Nam, nơi hành hương và tu tập của nhiều thế hệ. Hệ thống chùa tháp trên Yên Tử gắn liền với Trúc Lâm tam tổ.',
    },
  },
  
  // ===== TÂY SƠN Period (Zigzag continues) =====
  {
    id: 'cp-6',
    title: 'Phật giáo dân gian',
    description: 'Gắn liền đời sống',
    x: 25,
    y: 50,
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
      hint: '💡 Gợi ý: Thời Tây Sơn, Phật giáo ít tập trung ở cung đình, mà gần gũi với đời sống làng quê.',
      explanation: 'Thời Tây Sơn, Phật giáo gắn bó mật thiết với đời sống dân gian, ít chịu ảnh hưởng triều đình.',
    },
    theory: {
      title: 'Phật giáo thời Tây Sơn – Gắn với dân gian',
      content: 'Trong thời kỳ Tây Sơn (thế kỷ 18), Phật giáo không phát triển mạnh ở cung đình như thời Lý – Trần, mà gắn bó chặt chẽ với đời sống làng xã. Phật giáo dân gian trở thành trụ cột tinh thần và văn hóa của người dân.',
    },
  },
  {
    id: 'cp-7',
    title: 'Chùa làng',
    description: 'Trung tâm văn hóa',
    x: 45,
    y: 68,
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
      hint: '💡 Gợi ý: Đây không chỉ là nơi thờ phượng, mà còn là nơi sinh hoạt văn hóa, học chữ của dân làng.',
      explanation: 'Chùa làng là trung tâm văn hóa, giáo dục và sinh hoạt cộng đồng của làng xã Việt Nam.',
    },
    theory: {
      title: 'Chùa làng – Trung tâm văn hóa và giáo dục',
      content: 'Chùa làng ở Việt Nam không chỉ là nơi thờ Phật mà còn là trung tâm văn hóa, giáo dục và sinh hoạt cộng đồng. Tại đây diễn ra lễ hội, học chữ, và các hoạt động từ thiện. Chùa làng đóng vai trò quan trọng trong việc gắn kết và giáo dục người dân.',
    },
  },
  
  // ===== CẬN ĐẠI Period (Zigzag continues) =====
  {
    id: 'cp-8',
    title: 'Chùa Thiên Mụ',
    description: 'Biểu tượng cố đô Huế',
    x: 30,
    y: 50,
    status: 'locked',
    icon: 'sutra',
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
      hint: '💡 Gợi ý: Đó là tòa tháp bát giác cao 7 tầng, biểu tượng của chùa.',
      explanation: 'Tháp Phước Duyên cao 21m với 7 tầng là biểu tượng của chùa Thiên Mụ và cố đô Huế.',
    },
    theory: {
      title: 'Chùa Thiên Mụ – Biểu tượng cố đô Huế',
      content: 'Chùa Thiên Mụ (Huế) nổi tiếng với Tháp Phước Duyên – tháp bát giác cao 21 mét, 7 tầng, mỗi tầng thờ một vị Phật. Tháp là biểu tượng của chùa và của cố đô Huế. Chùa được xây dựng từ đầu thế kỷ 17 và là một trong những ngôi chùa đẹp nhất Việt Nam.',
    },
  },
  {
    id: 'cp-9',
    title: 'Phật giáo cải cách',
    description: 'Phong trào canh tân',
    x: 50,
    y: 68,
    status: 'locked',
    icon: 'lotus',
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
      hint: '💡 Gợi ý: Đáp án là một cư sĩ, không phải vị thiền sư hay hòa thượng nổi tiếng về sau.',
      explanation: 'Cư sĩ Lê Đình Thám là một trong những người khởi xướng phong trào cải cách Phật giáo Việt Nam đầu thế kỷ 20.',
    },
    theory: {
      title: 'Phong trào cải cách Phật giáo – Cư sĩ Lê Đình Thám',
      content: 'Đầu thế kỷ 20, Phật giáo Việt Nam có phong trào chấn hưng và cải cách. Cư sĩ Lê Đình Thám là một trong những người tiên phong: vận động thành lập hội Phật học, mở trường, in kinh và đưa Phật giáo gắn với giáo dục, xã hội hiện đại.',
    },
  },
  {
    id: 'cp-10',
    title: 'Hội Phật giáo',
    description: 'Tổ chức thống nhất',
    x: 70,
    y: 50,
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
      hint: '💡 Gợi ý: Năm thành lập nằm giữa hai mốc 1945 và 1963.',
      explanation: 'Giáo hội Phật giáo Việt Nam thống nhất được thành lập năm 1951 tại Huế.',
    },
    theory: {
      title: 'Giáo hội Phật giáo Việt Nam thống nhất',
      content: 'Giáo hội Phật giáo Việt Nam thống nhất được thành lập năm 1951 tại Huế, quy tụ các tổ chức Phật giáo Bắc – Trung – Nam. Sự ra đời này đánh dấu bước thống nhất Phật giáo Việt Nam trong thời cận hiện đại.',
    },
  },
  
  // ===== HIỆN ĐẠI Period (Final zigzag) =====
  {
    id: 'cp-11',
    title: 'Thích Nhất Hạnh',
    description: 'Thiền chánh niệm',
    x: 30,
    y: 68,
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
      hint: '💡 Gợi ý: Tên dòng tu gắn với một ngôi làng ở Pháp, nơi ngài lập tăng đoàn.',
      explanation: 'Thiền sư Thích Nhất Hạnh sáng lập dòng tu Làng Mai (Plum Village) tại Pháp, phổ biến thiền chánh niệm ra toàn thế giới.',
      historicalFigure: 'Thích Nhất Hạnh',
    },
    theory: {
      title: 'Thiền sư Thích Nhất Hạnh – Dòng tu Làng Mai',
      content: 'Thiền sư Thích Nhất Hạnh (1926–2022) là một trong những tu sĩ Phật giáo có ảnh hưởng nhất thế giới. Ngài sáng lập dòng tu Làng Mai (Plum Village) tại Pháp và phổ biến thiền chánh niệm (mindfulness) ra toàn cầu qua sách, khóa tu và hoạt động hòa bình.',
    },
  },
  {
    id: 'cp-12',
    title: 'Phật giáo nhập thế',
    description: 'Tham gia xã hội',
    x: 50,
    y: 50,
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
      hint: '💡 Gợi ý: Nhập thế nghĩa là đem đạo vào đời, tham gia phục vụ cộng đồng.',
      explanation: 'Phật giáo nhập thế là xu hướng Phật giáo tham gia tích cực vào các hoạt động xã hội, từ thiện, giáo dục để phục vụ cộng đồng.',
    },
    theory: {
      title: 'Phật giáo nhập thế – Phục vụ xã hội và cộng đồng',
      content: 'Phật giáo nhập thế là xu hướng Phật giáo không chỉ tu trong chùa mà tham gia tích cực vào đời sống xã hội: từ thiện, giáo dục, y tế, bảo vệ môi trường và hòa bình. Mục đích là đem đạo vào đời, phục vụ cộng đồng và giảm bớt khổ đau trong xã hội.',
    },
  },
  {
    id: 'cp-13',
    title: 'Thiền viện hiện đại',
    description: 'Không gian tu học',
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
      hint: '💡 Gợi ý: Thiền viện nằm ở thành phố cao nguyên có hồ Tuyền Lâm.',
      explanation: 'Thiền viện Trúc Lâm Đà Lạt là một trong những thiền viện nổi tiếng nhất Việt Nam, nằm giữa khung cảnh thiên nhiên tuyệt đẹp.',
    },
    theory: {
      title: 'Thiền viện Trúc Lâm – Đà Lạt',
      content: 'Thiền viện Trúc Lâm nổi tiếng nhất nằm ở Đà Lạt, giữa núi rừng và hồ Tuyền Lâm. Đây là thiền viện hiện đại theo phái Trúc Lâm, vừa là nơi tu tập vừa là điểm tham quan với kiến trúc hài hòa thiên nhiên.',
    },
  },
];

// Era regions with icons
export const eraRegions = [
  {
    name: 'Lý - Trần',
    period: 'TK 11-14',
    color: '#4A7C59',
    icon: '🏯', // Temple/Palace
    startCheckpoint: 0,
    endCheckpoint: 4,
    x: 18,
    y: 85,
  },
  {
    name: 'Tây Sơn',
    period: 'TK 18',
    color: '#C4302B',
    icon: '🏛️', // Village temple
    startCheckpoint: 5,
    endCheckpoint: 6,
    x: 45,
    y: 85,
  },
  {
    name: 'Cận đại',
    period: 'TK 19-20',
    color: '#9370DB',
    icon: '🕉️', // Buddhist symbol
    startCheckpoint: 7,
    endCheckpoint: 9,
    x: 62,
    y: 85,
  },
  {
    name: 'Hiện đại',
    period: 'TK 21',
    color: '#4169E1',
    icon: '🧘', // Meditation
    startCheckpoint: 10,
    endCheckpoint: 12,
    x: 80,
    y: 85,
  },
];
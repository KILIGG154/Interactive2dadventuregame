export type DialogueQuestionFocus = 'similarity' | 'difference' | 'practice' | 'society' | 'enlightenment';

export interface DialogueQuestion {
  id: string;
  question: string;
  focus: DialogueQuestionFocus;
}

export interface DialogueExchange {
  questionId: string;
  tnTongAnswer: string;
  nhatHanhAnswer: string;
  summarySimilarities: string[];
  summaryDifferences: string[];
}

export const dialogueQuestions: DialogueQuestion[] = [
  {
    id: 'q1',
    question: 'Thế nào là tu trong đời sống?',
    focus: 'practice',
  },
  {
    id: 'q2',
    question: 'Vai trò của người tu sĩ với xã hội là gì?',
    focus: 'society',
  },
  {
    id: 'q3',
    question: 'Làm thế nào để đối mặt với chiến tranh và xung đột?',
    focus: 'society',
  },
  {
    id: 'q4',
    question: 'Giác ngộ có nghĩa là gì?',
    focus: 'enlightenment',
  },
  {
    id: 'q5',
    question: 'Mối quan hệ giữa Thiền và đời sống hàng ngày?',
    focus: 'practice',
  },
];

export const dialogueExchanges: DialogueExchange[] = [
  {
    questionId: 'q1',
    tnTongAnswer: `"Cư trần lạc đạo" - sống trong đời mà vui với đạo. Tu tập không phải là trốn tránh cuộc sống mà là sống tỉnh thức trong mọi hoạt động hàng ngày. Khi làm vua, ta lo việc nước; khi xuất gia, ta tu tập. Nhưng dù ở đâu, tâm vẫn an định, không bị cuộc đời làm dao động. Tu trong đời sống là biết cách giữ tâm thanh tịnh giữa những bộn bề của cuộc sống, không để tham sân si chi phối.`,
    nhatHanhAnswer: `Tu tập chánh niệm trong từng khoảnh khắc hiện tại. Khi rửa bát, ta rửa bát với toàn tâm toàn ý. Khi đi bộ, ta đi bộ với chánh niệm. Không cần tìm kiếm giác ngộ ở đâu xa - giác ngộ có sẵn trong giây phút hiện tại nếu ta biết cách sống tỉnh thức. Tu trong đời sống là biến mọi hoạt động hàng ngày thành cơ hội tu tập, từ việc ăn cơm, uống trà đến làm việc và giao tiếp với người khác.`,
    summarySimilarities: [
      'Cả hai đều nhấn mạnh tu tập không tách rời khỏi đời sống hàng ngày',
      'Đều cho rằng giác ngộ có thể đạt được ngay trong cuộc sống thế tục',
      'Cả hai đều nhấn mạnh tầm quan trọng của việc giữ tâm an định và tỉnh thức',
      'Đều phản đối quan niệm tu tập là trốn tránh cuộc sống',
    ],
    summaryDifferences: [
      'Trần Nhân Tông nhấn mạnh "cư trần lạc đạo" - sống trong đời mà vui với đạo, có thể chuyển đổi giữa vai trò thế tục và tu sĩ',
      'Thích Nhất Hạnh phát triển phương pháp cụ thể hơn với "chánh niệm" - tập trung vào từng hành động cụ thể trong hiện tại',
      'Trần Nhân Tông tập trung vào việc không để tâm bị dao động bởi cuộc đời',
      'Thích Nhất Hạnh nhấn mạnh việc biến mọi hoạt động thành cơ hội tu tập có ý thức',
    ],
  },
  {
    questionId: 'q2',
    tnTongAnswer: `Người tu sĩ phải có trách nhiệm với đất nước và dân tộc. Khi quốc gia lâm nguy, ta không thể ngồi yên tu tập mà phải đứng ra bảo vệ đất nước. "Hộ quốc an dân" - bảo vệ nước, an ổn dân chúng - đó là trách nhiệm của người tu sĩ. Nhưng điều quan trọng là làm việc này với tâm từ bi, không vì tham vọng cá nhân mà vì lợi ích của muôn dân.`,
    nhatHanhAnswer: `Người tu sĩ phải tham gia tích cực vào việc giải quyết các vấn đề xã hội. Phật giáo nhập thế không có nghĩa là can thiệp vào chính trị mà là đem trí tuệ và từ bi để giúp đỡ những người đau khổ. Chúng ta phải lên tiếng chống lại bất công, tham gia vào các hoạt động hòa bình, giáo dục, và từ thiện. Tu sĩ không chỉ lo việc tu tập cá nhân mà còn phải có trách nhiệm với cộng đồng và thế giới.`,
    summarySimilarities: [
      'Cả hai đều nhấn mạnh người tu sĩ phải có trách nhiệm với xã hội, không chỉ lo tu tập cá nhân',
      'Đều cho rằng Phật giáo phải gắn liền với việc phục vụ lợi ích của cộng đồng',
      'Cả hai đều phản đối quan niệm tu sĩ chỉ nên ẩn tu, tách biệt khỏi xã hội',
      'Đều nhấn mạnh tầm quan trọng của từ bi và trí tuệ trong việc phục vụ xã hội',
    ],
    summaryDifferences: [
      'Trần Nhân Tông nhấn mạnh "hộ quốc an dân" trong bối cảnh bảo vệ đất nước trước ngoại xâm, có thể tham gia trực tiếp vào chính trị và quân sự',
      'Thích Nhất Hạnh tập trung vào "Phật giáo nhập thế" trong bối cảnh hòa bình, nhấn mạnh các hoạt động giáo dục, từ thiện, và hòa giải',
      'Trần Nhân Tông có thể đảm nhận vai trò lãnh đạo chính trị và quân sự khi cần thiết',
      'Thích Nhất Hạnh nhấn mạnh việc không can thiệp trực tiếp vào chính trị mà thông qua giáo dục và hoạt động xã hội',
    ],
  },
  {
    questionId: 'q3',
    tnTongAnswer: `Khi đất nước bị xâm lược, ta không thể chỉ ngồi yên cầu nguyện. Phải đứng lên bảo vệ độc lập dân tộc, nhưng làm điều này với tâm từ bi, không vì thù hận. Chiến đấu để bảo vệ đất nước là một hình thức tu tập - tu tập lòng dũng cảm, tu tập tinh thần hy sinh vì lợi ích của muôn dân. Nhưng sau chiến tranh, phải biết tha thứ và hòa giải, không để hận thù tiếp tục.`,
    nhatHanhAnswer: `Chúng ta phải làm mọi cách để ngăn chặn chiến tranh trước khi nó xảy ra thông qua đối thoại, hòa giải, và giáo dục. Nhưng khi chiến tranh đã xảy ra, chúng ta phải đứng về phía những người đau khổ, không phân biệt phe phái. Quan trọng nhất là phải hiểu được nguyên nhân sâu xa của xung đột - đó là sự thiếu hiểu biết, sợ hãi, và thù hận. Chúng ta phải làm việc để chữa lành những vết thương này, không chỉ sau chiến tranh mà ngay cả trong thời bình.`,
    summarySimilarities: [
      'Cả hai đều nhấn mạnh tầm quan trọng của từ bi và không để thù hận chi phối',
      'Đều cho rằng phải đứng về phía những người đau khổ',
      'Cả hai đều nhấn mạnh việc hòa giải và tha thứ sau xung đột',
      'Đều phản đối việc sử dụng bạo lực vì thù hận cá nhân',
    ],
    summaryDifferences: [
      'Trần Nhân Tông chấp nhận việc sử dụng vũ lực để bảo vệ đất nước khi bị xâm lược, coi đây là trách nhiệm và một hình thức tu tập',
      'Thích Nhất Hạnh nhấn mạnh việc ngăn chặn chiến tranh từ đầu thông qua đối thoại và hòa giải, tập trung vào việc giải quyết nguyên nhân sâu xa',
      'Trần Nhân Tông có thể tham gia trực tiếp vào chiến đấu khi cần thiết',
      'Thích Nhất Hạnh tập trung vào các hoạt động hòa bình, giáo dục, và chữa lành vết thương',
    ],
  },
  {
    questionId: 'q4',
    tnTongAnswer: `Giác ngộ là nhận ra được bản tính chân thật của mình - đó là Phật tính vốn sẵn có trong mỗi người. Không cần tìm kiếm ở đâu xa, chỉ cần quay về với tâm thanh tịnh của chính mình. Giác ngộ không phải là đạt được cái gì mới mà là nhận ra cái đã có sẵn. Khi giác ngộ, ta thấy được tính không của vạn pháp, không còn bị ràng buộc bởi tham sân si, sống tự do và an lạc.`,
    nhatHanhAnswer: `Giác ngộ là sống tỉnh thức trong từng khoảnh khắc hiện tại, nhận ra được sự liên kết mật thiết giữa mình và vạn vật (tương tức). Không có cái "tôi" riêng biệt - tất cả đều liên kết với nhau. Giác ngộ không phải là một trạng thái đặc biệt mà là cách sống hàng ngày: sống với chánh niệm, với lòng từ bi, và với sự hiểu biết về tính tương tức của vạn pháp. Khi giác ngộ, ta thấy được hạnh phúc có sẵn trong giây phút hiện tại, không cần tìm kiếm ở tương lai.`,
    summarySimilarities: [
      'Cả hai đều cho rằng giác ngộ không phải là đạt được cái gì mới mà là nhận ra cái đã có sẵn',
      'Đều nhấn mạnh giác ngộ có thể đạt được trong đời sống hàng ngày, không cần tách biệt khỏi cuộc sống',
      'Cả hai đều phản đối quan niệm giác ngộ là một trạng thái xa vời, khó đạt được',
      'Đều nhấn mạnh tầm quan trọng của việc nhận ra bản tính chân thật của mình',
    ],
    summaryDifferences: [
      'Trần Nhân Tông nhấn mạnh "Phật tính vốn sẵn có" và việc quay về với tâm thanh tịnh, tập trung vào tính không của vạn pháp',
      'Thích Nhất Hạnh phát triển khái niệm "tương tức" (interbeing) - sự liên kết mật thiết giữa mình và vạn vật, nhấn mạnh vào sự liên kết thay vì tính không',
      'Trần Nhân Tông tập trung vào việc giải thoát khỏi ràng buộc của tham sân si',
      'Thích Nhất Hạnh nhấn mạnh việc sống tỉnh thức trong hiện tại và nhận ra hạnh phúc có sẵn',
    ],
  },
  {
    questionId: 'q5',
    tnTongAnswer: `Thiền không phải là một hoạt động riêng biệt mà là cách sống. Khi làm việc, ta làm việc với tâm thiền; khi nghỉ ngơi, ta nghỉ ngơi với tâm thiền. Thiền là giữ cho tâm luôn an định, không bị cuộc đời làm dao động. Trong đời sống hàng ngày, ta có thể tu tập thiền qua việc giữ tâm thanh tịnh, không để tham sân si chi phối, sống với lòng từ bi và trí tuệ.`,
    nhatHanhAnswer: `Thiền chánh niệm là đem thiền vào mọi hoạt động hàng ngày. Khi ăn, ta ăn với chánh niệm; khi đi, ta đi với chánh niệm; khi làm việc, ta làm việc với chánh niệm. Mỗi hoạt động đều có thể trở thành một cơ hội để tu tập thiền. Quan trọng là sống tỉnh thức trong từng khoảnh khắc, nhận biết được những gì đang xảy ra trong thân và tâm. Thiền không chỉ là ngồi yên mà là cách sống tỉnh thức trong mọi hoạt động.`,
    summarySimilarities: [
      'Cả hai đều nhấn mạnh thiền không phải là hoạt động riêng biệt mà là cách sống',
      'Đều cho rằng thiền có thể được thực hành trong mọi hoạt động hàng ngày',
      'Cả hai đều phản đối quan niệm thiền chỉ là ngồi yên, tách biệt khỏi cuộc sống',
      'Đều nhấn mạnh tầm quan trọng của việc sống tỉnh thức trong đời sống hàng ngày',
    ],
    summaryDifferences: [
      'Trần Nhân Tông nhấn mạnh việc giữ tâm an định và không để cuộc đời làm dao động, tập trung vào tâm thanh tịnh',
      'Thích Nhất Hạnh phát triển phương pháp cụ thể hơn với "chánh niệm" - tập trung vào từng hành động cụ thể và nhận biết những gì đang xảy ra',
      'Trần Nhân Tông tập trung vào việc không để tham sân si chi phối',
      'Thích Nhất Hạnh nhấn mạnh việc nhận biết cụ thể những gì đang xảy ra trong thân và tâm trong từng khoảnh khắc',
    ],
  },
];

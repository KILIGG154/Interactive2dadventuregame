export type FolkCategoryType = 'ca-dao' | 'truyen-thuyet' | 'le-hoi';

export interface FolkCategory {
  id: string;
  title: string;
  description: string;
  type: FolkCategoryType;
}

export interface FolkItem {
  id: string;
  categoryId: string;
  title: string;
  content: string;
  explanation: string;
  exampleQuestion?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
}

export const folkCategories: FolkCategory[] = [
  {
    id: 'ca-dao',
    title: 'Ca dao',
    description: 'Những câu ca dao phản ánh tư tưởng Phật giáo trong đời sống dân gian Việt Nam',
    type: 'ca-dao',
  },
  {
    id: 'truyen-thuyet',
    title: 'Truyền thuyết',
    description: 'Các truyền thuyết dân gian gắn liền với Phật giáo và các nhân vật Phật giáo',
    type: 'truyen-thuyet',
  },
  {
    id: 'le-hoi',
    title: 'Lễ hội',
    description: 'Các lễ hội Phật giáo mang đậm bản sắc văn hóa Việt Nam',
    type: 'le-hoi',
  },
];

export const folkItems: FolkItem[] = [
  // Ca dao
  {
    id: 'ca-dao-1',
    categoryId: 'ca-dao',
    title: 'Ca dao về tinh thần nhập thế',
    content: `"Làm trai quyết chí tu hành
Được thành chánh quả, độ mình độ người"

"Tu đâu cho bằng tu nhà
Thờ cha kính mẹ mới là chân tu"

"Ăn chay nằm mộng chiêm bao
Thấy Phật thấy tiên, Phật nào cũng hay"`,
    explanation: `Những câu ca dao này phản ánh tư tưởng "nhập thế" đặc trưng của Phật giáo Việt Nam. Khác với quan niệm xuất thế của một số truyền thống Phật giáo khác, ca dao Việt Nam nhấn mạnh việc tu tập ngay trong đời sống gia đình và xã hội. Câu "Tu đâu cho bằng tu nhà" thể hiện rõ quan điểm rằng việc thờ cha kính mẹ, sống đạo đức trong gia đình chính là cách tu tập chân chính nhất. Điều này phù hợp với tinh thần "cư trần lạc đạo" của thiền phái Trúc Lâm và "Phật giáo nhập thế" của Thích Nhất Hạnh.`,
    exampleQuestion: {
      question: 'Câu ca dao nào phản ánh tư tưởng "nhập thế" của Phật giáo Việt Nam?',
      options: [
        'Làm trai quyết chí tu hành / Được thành chánh quả, độ mình độ người',
        'Tu đâu cho bằng tu nhà / Thờ cha kính mẹ mới là chân tu',
        'Ăn chay nằm mộng chiêm bao / Thấy Phật thấy tiên, Phật nào cũng hay',
        'Tất cả các câu trên',
      ],
      correctAnswer: 3,
      explanation: 'Tất cả các câu ca dao trên đều thể hiện tư tưởng nhập thế, đặc biệt là câu "Tu đâu cho bằng tu nhà" nhấn mạnh việc tu tập trong đời sống gia đình.',
    },
  },
  {
    id: 'ca-dao-2',
    categoryId: 'ca-dao',
    title: 'Ca dao về từ bi và cứu khổ',
    content: `"Làm phúc thì phúc lại
Làm ác thì ác lại"

"Ở hiền thì lại gặp lành
Ở ác thì gặp dữ tan tành như tro"

"Thương người như thể thương thân
Nhân nghĩa nhân tình, nhân nhân hòa đồng"`,
    explanation: `Những câu ca dao này thể hiện giáo lý nhân quả và từ bi của Phật giáo đã được Việt hóa sâu sắc. Người Việt hiểu nhân quả không chỉ là luật tự nhiên mà còn là đạo lý sống: làm điều thiện sẽ gặp điều thiện, làm điều ác sẽ gặp quả báo. Đặc biệt, câu "Thương người như thể thương thân" thể hiện tinh thần từ bi - coi nỗi khổ của người khác như nỗi khổ của chính mình. Đây là một trong những giá trị cốt lõi của Phật giáo nhập thế Việt Nam, khuyến khích mọi người sống có trách nhiệm với cộng đồng.`,
  },
  {
    id: 'ca-dao-3',
    categoryId: 'ca-dao',
    title: 'Ca dao về vô thường và buông xả',
    content: `"Đời người như giấc chiêm bao
Tỉnh ra mới biết mình nào có đâu"

"Của cải như phù vân
Có rồi lại mất, mất rồi lại có"

"Tham thì thâm, tham thì thâm
Tham thì thâm, tham thì thâm"`,
    explanation: `Ca dao Việt Nam thể hiện sự hiểu biết về giáo lý vô thường và buông xả một cách tự nhiên, gần gũi. Câu "Đời người như giấc chiêm bao" phản ánh quan niệm về tính tạm thời của cuộc sống, tương tự như khái niệm "vô thường" trong Phật giáo. Việc nhắc nhở về tính phù du của của cải giúp con người không quá bám víu vào vật chất, từ đó có thể sống tự do và hạnh phúc hơn. Đây là cách Phật giáo được truyền đạt qua văn hóa dân gian một cách dễ hiểu và dễ nhớ.`,
  },
  // Truyền thuyết
  {
    id: 'truyen-thuyet-1',
    categoryId: 'truyen-thuyet',
    title: 'Truyền thuyết về Bồ Tát Quan Âm nghìn mắt nghìn tay',
    content: `Truyền thuyết kể rằng, xưa kia có một công chúa tên là Diệu Thiện, con gái của vua Diệu Trang. Công chúa từ nhỏ đã có tấm lòng từ bi, không muốn lấy chồng mà chỉ muốn tu hành để cứu độ chúng sinh. Vua cha giận dữ, bắt công chúa phải làm những việc khó khăn nhất nhưng công chúa đều vượt qua được nhờ lòng từ bi và sự kiên trì.

Cuối cùng, khi công chúa đạt được giác ngộ, Bồ Tát Quan Âm hiện ra và ban cho công chúa nghìn mắt để thấy hết nỗi khổ của chúng sinh, nghìn tay để cứu giúp tất cả. Từ đó, hình tượng Bồ Tát Quan Âm nghìn mắt nghìn tay trở thành biểu tượng của lòng từ bi vô hạn và khả năng cứu độ chúng sinh của Phật giáo.`,
    explanation: `Truyền thuyết này phản ánh giá trị cốt lõi của Phật giáo Việt Nam: từ bi và nhập thế. Hình tượng nghìn mắt nghìn tay không chỉ là biểu tượng nghệ thuật mà còn mang ý nghĩa triết học sâu sắc: một vị Bồ Tát phải có khả năng nhìn thấy mọi nỗi khổ đau (nghìn mắt) và có khả năng hành động để cứu giúp (nghìn tay). Điều này phù hợp với tinh thần "Phật giáo nhập thế" - không chỉ tu tập cho bản thân mà còn tích cực tham gia vào việc giải quyết khổ đau của thế giới. Truyền thuyết này cũng thể hiện sự sáng tạo của người Việt trong việc tiếp nhận và biến đổi hình tượng Phật giáo cho phù hợp với văn hóa bản địa.`,
  },
  {
    id: 'truyen-thuyet-2',
    categoryId: 'truyen-thuyet',
    title: 'Truyền thuyết về chùa Một Cột',
    content: `Truyền thuyết kể rằng, vua Lý Thái Tông (1028-1054) đã mơ thấy được Bồ Tát Quan Âm ngồi trên đài sen, mời vua lên đài. Khi tỉnh dậy, vua kể lại giấc mơ cho các quan thần. Một vị thiền sư đã giải thích rằng đây là điềm lành, và đề xuất xây dựng một ngôi chùa có kiến trúc như đài sen trong giấc mơ.

Vua Lý Thái Tông đã cho xây dựng chùa Một Cột (Diên Hựu tự) vào năm 1049 với kiến trúc độc đáo: một cột đá giữa hồ, trên đỉnh là đài sen bằng gỗ, tượng trưng cho hoa sen nở trên mặt nước. Chùa này trở thành biểu tượng của sự kết hợp giữa Phật giáo và văn hóa Việt Nam, thể hiện tinh thần sáng tạo và độc đáo của Phật giáo Việt Nam.`,
    explanation: `Truyền thuyết này minh chứng cho sự sáng tạo và bản sắc riêng của Phật giáo Việt Nam. Không chỉ đơn giản là sao chép kiến trúc từ Ấn Độ hay Trung Hoa, người Việt đã tạo ra một kiến trúc độc đáo, mang đậm tính biểu tượng và triết học. Hoa sen trong Phật giáo tượng trưng cho sự thanh tịnh, giác ngộ - mọc lên từ bùn nhưng không bị ô nhiễm. Kiến trúc chùa Một Cột không chỉ đẹp về mặt thẩm mỹ mà còn chứa đựng ý nghĩa triết học sâu sắc về sự giác ngộ trong đời sống thế tục. Đây là một ví dụ điển hình về cách Phật giáo được Việt hóa và sáng tạo để phù hợp với văn hóa bản địa.`,
  },
  // Lễ hội
  {
    id: 'le-hoi-1',
    categoryId: 'le-hoi',
    title: 'Lễ hội Vu Lan - Ngày báo hiếu',
    content: `Lễ hội Vu Lan (còn gọi là lễ Xá tội vong nhân) được tổ chức vào ngày rằm tháng 7 âm lịch hàng năm. Lễ hội này có nguồn gốc từ câu chuyện về Mục Kiền Liên, một đệ tử của Đức Phật, đã cứu mẹ mình khỏi địa ngục nhờ lòng hiếu thảo và sự hướng dẫn của Đức Phật.

Trong lễ hội Vu Lan, người Việt không chỉ cúng dường cho các vong linh mà còn thể hiện lòng hiếu thảo với cha mẹ còn sống và đã khuất. Đây là một trong những lễ hội quan trọng nhất của Phật giáo Việt Nam, thể hiện giá trị "hiếu đạo" - một giá trị cốt lõi của văn hóa Việt Nam được kết hợp với giáo lý Phật giáo.`,
    explanation: `Lễ hội Vu Lan là một ví dụ điển hình về sự kết hợp giữa Phật giáo và văn hóa Việt Nam. Trong khi lễ hội có nguồn gốc từ Phật giáo Ấn Độ, người Việt đã biến đổi nó thành một lễ hội mang đậm bản sắc dân tộc, nhấn mạnh giá trị hiếu đạo. Điều này phản ánh tư tưởng "nhập thế" của Phật giáo Việt Nam: không tách rời khỏi các giá trị gia đình và xã hội truyền thống. Lễ hội Vu Lan cũng thể hiện quan niệm về sự liên kết giữa các thế hệ, giữa người sống và người đã khuất, tạo nên một mối liên hệ tâm linh sâu sắc trong cộng đồng. Đây là cách Phật giáo góp phần củng cố các giá trị đạo đức xã hội Việt Nam.`,
  },
  {
    id: 'le-hoi-2',
    categoryId: 'le-hoi',
    title: 'Lễ hội Yên Tử - Hành hương về đất Phật',
    content: `Lễ hội Yên Tử được tổ chức từ tháng Giêng đến hết tháng Ba âm lịch hàng năm tại núi Yên Tử (Quảng Ninh). Đây là nơi Trần Nhân Tông đã xuất gia và sáng lập thiền phái Trúc Lâm vào thế kỷ 13.

Hàng năm, hàng trăm nghìn Phật tử và du khách từ khắp nơi trên cả nước và thế giới về Yên Tử để hành hương, leo núi, và tham gia các nghi lễ Phật giáo. Lễ hội không chỉ là dịp để tưởng nhớ Trần Nhân Tông mà còn là cơ hội để mọi người tu tập, tìm kiếm sự thanh tịnh và giác ngộ. Hành trình leo núi Yên Tử được coi như một hành trình tu tập, mỗi bước chân là một bước tiến về phía giác ngộ.`,
    explanation: `Lễ hội Yên Tử thể hiện sự kết hợp độc đáo giữa tu tập và hành hương trong Phật giáo Việt Nam. Không giống như một số truyền thống Phật giáo khác nhấn mạnh việc tách biệt khỏi thế giới, lễ hội Yên Tử cho thấy cách người Việt kết hợp tu tập với hoạt động cộng đồng và du lịch tâm linh. Hành trình leo núi tượng trưng cho hành trình tu tập - đầy khó khăn nhưng đầy ý nghĩa. Điều này phù hợp với tinh thần "cư trần lạc đạo" của Trúc Lâm: tu tập không phải là trốn tránh cuộc sống mà là sống tỉnh thức trong mọi hoạt động. Lễ hội Yên Tử cũng là minh chứng cho sự phát triển và ảnh hưởng lâu dài của thiền phái Trúc Lâm trong đời sống tâm linh người Việt.`,
  },
  {
    id: 'le-hoi-3',
    categoryId: 'le-hoi',
    title: 'Lễ Phật Đản - Ngày Đức Phật ra đời',
    content: `Lễ Phật Đản được tổ chức vào ngày rằm tháng Tư âm lịch hàng năm để kỷ niệm ngày Đức Phật Thích Ca Mâu Ni ra đời, thành đạo và nhập Niết Bàn. Ở Việt Nam, lễ Phật Đản không chỉ là một ngày lễ tôn giáo mà còn là một ngày lễ văn hóa, được tổ chức rộng rãi với nhiều hoạt động như diễu hành, thả đèn hoa đăng, làm từ thiện.

Đặc biệt, lễ Phật Đản ở Việt Nam thường kết hợp với các hoạt động nhập thế như làm từ thiện, thăm viếng người già và trẻ em, tổ chức các hoạt động văn hóa giáo dục. Điều này thể hiện tinh thần "Phật giáo nhập thế" - không chỉ tưởng nhớ Đức Phật mà còn thực hành giáo lý của Ngài trong đời sống thực tế.`,
    explanation: `Lễ Phật Đản ở Việt Nam là một ví dụ điển hình về cách Phật giáo được thực hành trong bối cảnh văn hóa Việt Nam. Không chỉ là một nghi lễ tôn giáo thuần túy, lễ Phật Đản trở thành một dịp để cộng đồng cùng nhau thực hành các giá trị Phật giáo như từ bi, bố thí, và nhập thế. Việc kết hợp lễ hội với các hoạt động từ thiện và giáo dục phản ánh quan niệm rằng tu tập không chỉ là việc cá nhân mà còn phải góp phần vào việc xây dựng một xã hội tốt đẹp hơn. Đây là cách Phật giáo Việt Nam thể hiện tính "sáng tạo bản địa" - không chỉ tiếp nhận giáo lý mà còn phát triển và ứng dụng nó một cách phù hợp với văn hóa và hoàn cảnh xã hội Việt Nam.`,
  },
];

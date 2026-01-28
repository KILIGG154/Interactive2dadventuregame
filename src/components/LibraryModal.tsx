import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Lightbulb, MapPin, Flame, BookOpen, Calendar, Scale, Sparkles, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Checkpoint } from '../types/game';
import { TheoryCard } from './TheoryCard';
import { PhilosophicalComparison } from './PhilosophicalComparison';
import { FolkCultureSection } from './FolkCultureSection';
import { PhilosophicalDialogue } from './PhilosophicalDialogue';
import { eraRegions } from '../data/unifiedMapData';
import { philosophicalPeriods, getUnlockedPeriods } from '../data/philosophicalPeriodsData';

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkpoints: Checkpoint[];
}

type Tab = 'journey' | 'figures' | 'philosophy' | 'monuments' | 'theory' | 'comparison' | 'folk-culture' | 'dialogue';

export function LibraryModal({ isOpen, onClose, checkpoints }: LibraryModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('journey'); // Bắt đầu với tab Hành Trình
  const [expandedTheoryId, setExpandedTheoryId] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [expandedFigureId, setExpandedFigureId] = useState<string | null>(null);

  // Calculate completion progress
  const completedCheckpoints = checkpoints.filter(cp => cp.status === 'completed').map(cp => cp.id);
  const unlockedPeriods = getUnlockedPeriods(completedCheckpoints, checkpoints.length);  const figures = [
    {
      id: 'van-hanh',
      name: 'Thiền sư Vạn Hạnh',
      era: 'Lý (1012-1096)',
      contribution: 'Triết lý "Tứ đại giai không" - Quốc sư đầu tiên',
      image: '/src/images/1.jpg',
      biography: 'Vạn Hạnh (1012-1096), tên thật là Nguyễn Chí Thanh, sinh tại làng Cổ Pháp (nay thuộc Hưng Yên). Ông là một trong những thiền sư vĩ đại nhất trong lịch sử Phật giáo Việt Nam và là Quốc sư đầu tiên của nước ta. Từ nhỏ đã thông minh lanh lợi, ông sớm xuất gia tu học và trở thành một học giả uyên bác. Thiền sư Vạn Hạnh không chỉ là một nhà sư đạo đức cao cả mà còn là một nhà tư tưởng lớn, một nhà chiêm tinh học giỏi và là cố vấn tin cậy của Lý Thái Tổ. Ông đã góp phần quan trọng trong việc dời đô từ Hoa Lư về Thăng Long năm 1010, đặt nền móng cho một triều đại hưng thịnh kéo dài hơn 200 năm.',
      achievements: [
        'Được Lý Thái Tổ (Lý Công Uẩn) phong làm Quốc sư đầu tiên của Việt Nam, mở đầu truyền thống Phật giáo hoàng gia',
        'Sáng tạo và phát triển triết lý "Tứ đại giai không" - một hệ thống tư tưởng Phật giáo độc đáo phù hợp với đặc điểm văn hóa Việt Nam',
        'Tham mưu cho Lý Thái Tổ trong việc dời đô từ Hoa Lư về Thăng Long (1010), góp phần xây dựng kinh thành Thăng Long phồn vinh',
        'Xây dựng hệ thống giáo dục Phật giáo, đào tạo nhiều thế hệ cao tăng ưu tú, tạo nền tảng cho sự phát triển của Phật giáo triều Lý',
        'Biên soạn nhiều tác phẩm quan trọng về Phật học và chiêm tinh, ảnh hưởng sâu sắc đến tư tưởng của các triều đại sau',
        'Thiết lập mối quan hệ hài hòa giữa Phật giáo và Nho giáo, tạo nên bản sắc văn hóa tôn giáo đặc trưng của Việt Nam'
      ],
      philosophy: 'Triết lý "Tứ đại giai không" của Vạn Hạnh là một trong những đóng góp độc đáo nhất của Phật giáo Việt Nam. Theo đó, bốn yếu tố cấu thành vạn vật (đất, nước, gió, lửa) đều có tính chất "không", tức là không có thực thể cố định, bất biến. Tuy nhiên, điều quan trọng là tâm thức con người - đây là yếu tố chân thật duy nhất có thể nhận thức và chuyển hóa thế giới. Tư tưởng này không chỉ kế thừa tinh hoa Phật học Ấn Độ mà còn kết hợp tinh tế với tư duy biện chứng của người Việt, nhấn mạnh vai trò chủ động của con người trong việc tạo dựng số phận. Ông cũng phát triển lý thuyết về "thập nhị nhân duyên" trong bối cảnh Việt Nam, giải thích mối quan hệ nhân quả trong cuộc sống và sự tu tập.',
      historicalContext: 'Thiền sư Vạn Hạnh sống trong thời kỳ chuyển đổi quan trọng của lịch sử Việt Nam - từ cuối thời Lê sơ (1009) đến đầu triều Lý (1010-1225). Đây là giai đoạn đất nước cần sự thống nhất về tinh thần và tư tưởng sau thời kỳ loạn lạc. Lý Thái Tổ khi lên ngôi đã nhận ra tầm quan trọng của Phật giáo trong việc xây dựng nền tảng tinh thần cho triều đại mới. Vạn Hạnh, với tài năng xuất chúng và uy tín cao trong giới tăng lữ, đã trở thành cây cột tinh thần giúp Lý Thái Tổ củng cố vương quyền. Ông không chỉ là một vị thầy tâm linh mà còn là một nhà tư tưởng chính trị sáng suốt, góp phần định hướng chính sách của nhà Lý theo hướng khoan dung, nhân văn. Thời kỳ này cũng chứng kiến sự giao thoa văn hóa giữa Phật giáo với tín ngưỡng dân gian Việt Nam, tạo nên một nền Phật giáo có đậm chất bản địa.'
    },    {
      id: 'tran-nhan-tong',
      name: 'Trần Nhân Tông',
      era: 'Trần (1258-1308)',
      contribution: 'Sáng lập thiền phái Trúc Lâm',
      image: '/src/images/2.jpg',
      biography: 'Trần Nhân Tông (1258-1308), tên thật là Trần Khâm, sinh ra trong hoàng gia triều Trần, là con thứ của Trần Thánh Tông. Lên ngôi năm 1278 ở tuổi 21, ông trở thành một trong những vị vua tài năng nhất lịch sử Việt Nam. Sau 15 năm cai trị, ông truyền ngôi cho con trai là Trần Anh Tông và xuất gia tu hành tại núi Yên Tử. Tại đây, ông sáng lập thiền phái Trúc Lâm đầu tiên của Việt Nam, kết hợp tinh hoa của Phật giáo với tâm hồn dân tộc. Ông không chỉ là một vị vua anh minh mà còn là một thiền sư giác ngộ, để lại di sản tinh thần vô giá cho hậu thế.',
      achievements: [
        'Sáng lập thiền phái Trúc Lâm - tông phái Phật giáo thuần Việt đầu tiên, khai sinh truyền thống tu tập độc đáo của dân tộc',
        'Kết hợp thành công ba pháp môn Thiền - Tịnh - Mật trong tu tập, tạo nên phương pháp tu học đặc trưng phù hợp với người Việt',
        'Viết nhiều tác phẩm quan trọng bằng chữ Nôm như "Khóa hư lục", "Thiền tông chỉ nam", làm cho Phật pháp gần gũi với dân chúng',
        'Tạo ra truyền thống tu tập trên núi Yên Tử, biến nơi đây thành "đất thánh" của Phật giáo Việt Nam',
        'Chỉ đạo kháng chiến chống quân Mông Cổ, thể hiện tinh thần "hộ quốc an dân" của Phật giáo',
        'Xây dựng hệ thống thiền viện và đào tạo nhiều đệ tử ưu tú như Pháp Loa, Huyền Quang'
      ],
      philosophy: 'Tư tưởng cốt lõi của Trần Nhân Tông là "Tâm tức Phật, Phật tức tâm" - nhấn mạnh rằng Phật tính vốn sẵn có trong mỗi con người, không cần tìm kiếm ở bên ngoài. Ông phát triển triết lý "Thiền - Tịnh - Mật hòa hợp", trong đó Thiền giúp khai mở trí tuệ, Tịnh độ nuôi dưỡng tâm từ bi, và Mật tông cung cấp phương tiện tu tập linh hoạt. Đặc biệt, ông đề xuất "tam giáo đồng nguyên" - sự hòa hợp giữa Phật, Nho, Lão để xây dựng một xã hội hài hòa. Tư tưởng này không chỉ có ý nghĩa tôn giáo mà còn mang tính chính trị xã hội sâu sắc.',
      historicalContext: 'Trần Nhân Tông sống trong thời kỳ đen tối nhất lịch sử Việt Nam khi đế quốc Mông Cổ ba lần xâm lược (1258, 1285, 1288). Là người trực tiếp chỉ đạo cuộc kháng chiến lần thứ hai và thứ ba, ông thấu hiểu rằng sức mạnh tinh thần là yếu tố quyết định chiến thắng. Việc ông sáng lập thiền phái Trúc Lâm không chỉ nhằm phát triển tâm linh cá nhân mà còn muốn tạo ra một nguồn sức mạnh tinh thần cho toàn dân tộc. Trong bối cảnh đất nước cần củng cố độc lập và bản sắc văn hóa, thiền phái Trúc Lâm ra đời như một tuyên ngôn về sự tự chủ tinh thần của dân tộc Việt Nam.'
    },    {
      id: 'thich-nhat-hanh',
      name: 'Thích Nhất Hạnh',
      era: 'Hiện đại (1926-2022)',
      contribution: 'Phổ biến thiền chánh niệm toàn cầu',
      image: '/src/images/3.webp',
      biography: 'Thích Nhất Hạnh (1926-2022), tên thật Nguyễn Xuân Bảo, sinh tại Thừa Thiên Huế trong một gia đình Phật tử. Từ nhỏ đã có thiên hướng tu học, ông xuất gia năm 16 tuổi tại chùa Từ Hiếu. Không chỉ là một thiền sư xuất sắc, ông còn là nhà thơ, nhà văn, nhà hoạt động hòa bình và là người đi tiên phong trong việc đưa Phật giáo Việt Nam ra thế giới. Bị lưu vong hơn 40 năm do hoạt động hòa bình trong chiến tranh Việt Nam, ông đã xây dựng cộng đồng thiền quốc tế và trở thành một trong những thiền sư có ảnh hưởng nhất thế giới hiện đại.',
      achievements: [
        'Sáng lập phong trào "Phật giáo nhập thế" (Engaged Buddhism), khuyến khích Phật tử tham gia tích cực vào giải quyết các vấn đề xã hội',
        'Phổ biến thiền chánh niệm (Mindfulness) ra toàn thế giới, làm cho thiền Việt Nam trở nên quen thuộc với hàng triệu người',
        'Viết hơn 130 cuốn sách được dịch ra hơn 40 ngôn ngữ, trở thành tác giả Phật giáo được đọc nhiều nhất thế giới',
        'Thành lập làng Mai (Plum Village) tại Pháp - trung tâm thiền quốc tế lớn nhất châu Âu với hàng nghìn học viên mỗi năm',
        'Đào tạo hàng nghìn thiền sinh trên khắp thế giới, tạo ra một mạng lưới cộng đồng thiền toàn cầu',
        'Được đề cử giải Nobel Hòa bình năm 1967 bởi Martin Luther King Jr. vì những đóng góp cho hòa bình thế giới'
      ],
      philosophy: 'Triết lý cốt lõi của Thích Nhất Hạnh là "thiền chánh niệm trong đời sống hàng ngày" - sống tỉnh thức, tỉnh giác trong từng khoảnh khắc hiện tại. Ông dạy rằng hạnh phúc không phải tìm kiếm ở tương lai mà có sẵn trong giây phút hiện tại nếu ta biết cách sống chánh niệm. Ông phát triển khái niệm "Phật giáo nhập thế", cho rằng tu tập không thể tách rời khỏi đời sống xã hội và Phật tử phải tham gia tích cực vào việc giải quyết khổ đau của thế giới. Tư tưởng "tương tức" (interbeing) của ông giải thích mọi hiện tượng đều có mối liên hệ mật thiết với nhau, không có gì tồn tại độc lập.',
      historicalContext: 'Thích Nhất Hạnh sống qua nhiều biến động lịch sử lớn của Việt Nam và thế giới - từ thời Pháp thuộc, hai cuộc kháng chiến, chiến tranh Việt Nam đến thời kỳ toàn cầu hóa. Ông chứng kiến tận mắt những đau khổ của chiến tranh và nhận thức được nhu cầu cấp thiết của việc ứng dụng Phật pháp để chữa lành tâm hồn con người và xây dựng hòa bình. Trong bối cảnh thế giới hiện đại đầy stress và xung đột, thiền chánh niệm của ông trở thành phương thuốc tinh thần cho hàng triệu người khắp thế giới. Ông đã thành công trong việc "dịch thuật" Phật giáo truyền thống sang ngôn ngữ hiện đại, phù hợp với người phương Tây.'
    },    {
      id: 'phap-loa',
      name: 'Thiền sư Pháp Loa',
      era: 'Trần (1284-1330)',
      contribution: 'Đệ tử kế thừa Trúc Lâm đời thứ 2',
      image: '/src/images/4.webp',
      biography: 'Pháp Loa (1284-1330), tên thật là Lê Phụng Hiểu, sinh ra trong một gia đình quan lại ở Đông Anh (nay thuộc Hà Nội). Từ nhỏ ông đã thông minh và có năng khiếu về Phật học. Năm 1299, khi Trần Nhân Tông xuất gia tại núi Yên Tử, Pháp Loa đã theo Hoàng đế tu tập và trở thành đệ tử trực tiếp của Ngài. Với trí tuệ sáng suốt và lòng thành kính tuyệt đối, ông được Trần Nhân Tông chọn làm người kế thừa tông phái. Pháp Loa không chỉ là một thiền sư tài năng mà còn là một nhà tổ chức xuất sắc, có công lớn trong việc phát triển và hệ thống hóa tư tưởng thiền phái Trúc Lâm.',
      achievements: [
        'Kế thừa và phát triển tư tưởng thiền phái Trúc Lâm một cách có hệ thống, xây dựng các nguyên tắc tu tập cụ thể',
        'Soạn thảo và biên tập nhiều tác phẩm quan trọng về thiền học Trúc Lâm, bao gồm các bài kệ và hướng dẫn tu tập',
        'Đào tạo và hướng dẫn nhiều đệ tử ưu tú, trong đó có Huyền Quang - người sau này trở thành Tổ sư đời thứ ba',
        'Duy trì và mở rộng truyền thống tu tập tại núi Yên Tử, xây dựng thêm nhiều thiền viện và cơ sở tu học',
        'Phát triển phương pháp giảng dạy Phật pháp bằng tiếng Việt, làm cho giáo lý gần gũi hơn với dân chúng',
        'Thiết lập các quy tắc và nghi thức riêng cho thiền phái Trúc Lâm, tạo nên bản sắc độc đáo của tông phái'
      ],
      philosophy: 'Pháp Loa kế thừa và phát triển sâu sắc tư tưởng "Thiền - Tịnh - Mật hòa hợp" của Trần Nhân Tông. Ông nhấn mạnh việc tu tập phải gắn liền với cuộc sống thường nhật, không tách rời khỏi thực tế xã hội. Triết lý của ông tập trung vào "tu tâm dưỡng tính", trong đó việc rèn luyện tâm hồn phải đi đôi với việc tu dưỡng phẩm chất đạo đức. Ông cũng phát triển tư tưởng về "định tuệ song tu" - việc kết hợp thiền định với trí tuệ để đạt đến giác ngộ. Đặc biệt, Pháp Loa nhấn mạnh tầm quan trọng của việc truyền đạo và giáo dục, cho rằng một thiền sư chân chính phải có khả năng truyền tải Phật pháp một cách dễ hiểu và thiết thực.',
      historicalContext: 'Pháp Loa sống trong thời kỳ hậu kháng chiến chống Mông Cổ, khi đất nước đang trong quá trình hồi phục và xây dựng lại sau những tàn phá của chiến tranh. Đây là thời điểm thiền phái Trúc Lâm cần được củng cố và phát triển để tiếp tục sứ mệnh nuôi dưỡng tinh thần dân tộc. Vai trò của Pháp Loa rất quan trọng trong việc chuyển giao tư tưởng từ thế hệ sáng lập (Trần Nhân Tông) sang thế hệ kế thừa. Ông phải đối mặt với thách thức làm sao duy trì tinh thần ban đầu của tông phái trong khi vẫn phát triển và thích ứng với hoàn cảnh mới. Thời kỳ này cũng chứng kiến sự giao lưu văn hóa tôn giáo với các nước láng giềng, đòi hỏi Phật giáo Việt Nam phải khẳng định bản sắc riêng.'
    },    {
      id: 'huyen-quang',
      name: 'Thiền sư Huyền Quang',
      era: 'Trần (1254-1334)',
      contribution: 'Tổ sư đời thứ 3 của Trúc Lâm',
      image: '/src/images/5.jpg',
      biography: 'Huyền Quang (1254-1334), tên thật là Lê Quý Ly, sinh ra trong một gia đình có truyền thống văn học và Phật học ở Thanh Hóa. Từ nhỏ đã thông minh và có năng khiếu đặc biệt về triết học, ông sớm theo học Phật pháp và trở thành đệ tử của thiền sư Pháp Loa. Với trí tuệ uyên thâm và khả năng nghiên cứu sâu sắc, Huyền Quang được chọn làm Tổ sư đời thứ ba của thiền phái Trúc Lâm. Ông không chỉ là một thiền sư tài năng mà còn là một học giả uyên bác, có nhiều đóng góp quan trọng cho việc hệ thống hóa và hoàn thiện giáo lý Trúc Lâm.',
      achievements: [
        'Hoàn thiện hệ thống tư tưởng thiền phái Trúc Lâm, tạo nên một bộ khung lý luận toàn diện và logic',
        'Viết tác phẩm "Tam tổ thực lục" - bộ sử liệu quan trọng ghi chép về ba đời Tổ sư Trúc Lâm và lịch sử phát triển tông phái',
        'Phát triển phương pháp tu tập "lý sự song tu" - kết hợp việc nghiên cứu lý thuyết với thực hành tu tập',
        'Đào tạo thế hệ đệ tử kế thừa, truyền bá thiền pháp Trúc Lâm đến các vùng xa của đất nước',
        'Thiết lập các thiền viện chi và mở rộng ảnh hưởng của Trúc Lâm đến tầng lớp tri thức và dân chúng',
        'Biên soạn nhiều bài kệ và tác phẩm hướng dẫn tu tập, trở thành kinh điển của tông phái'
      ],
      philosophy: 'Huyền Quang phát triển tư tưởng "tam học nhất thể" (giới-định-tuệ), nhấn mạnh việc tu tập phải toàn diện cả về đạo đức, thiền định và trí tuệ. Ông cho rằng ba yếu tố này không thể tách rời nhau và phải được tu tập đồng thời. Triết lý của ông tập trung vào "chân tâm tự tánh" - tìm hiểu bản chất chân thật của tâm thức để đạt đến giác ngộ. Ông cũng phát triển khái niệm "phương tiện thiện xảo", tức là sử dụng những phương pháp linh hoạt và phù hợp để truyền đạt Phật pháp cho từng đối tượng khác nhau. Đặc biệt, Huyền Quang nhấn mạnh việc kết hợp tu tập cá nhân với trách nhiệm xã hội.',
      historicalContext: 'Huyền Quang sống trong thời kỳ thiền phái Trúc Lâm đang phát triển mạnh mẽ và ảnh hưởng sâu rộng đến xã hội Đại Việt cuối thế kỷ 13, đầu thế kỷ 14. Đây là giai đoạn đất nước đã ổn định sau các cuộc kháng chiến chống Mông Cổ, nền kinh tế phục hồi và văn hóa phát triển. Thiền phái Trúc Lâm không còn chỉ là tông phái của hoàng gia mà đã lan tỏa sâu rộng trong dân chúng. Vai trò của Huyền Quang là củng cố nền tảng lý thuyết cho tông phái, đồng thời mở rộng ảnh hưởng của Phật giáo đến các tầng lớp xã hội. Ông cũng phải đối mặt với sự cạnh tranh từ các tông phái Phật giáo khác và ảnh hưởng của Nho giáo đang trỗi dậy.'
    },    {
      id: 'thich-tri-quang',
      name: 'Thích Trí Quang',
      era: 'Hiện đại (1923-2019)',
      contribution: 'Lãnh đạo Phật giáo Việt Nam thế kỷ 20',
      image: '/src/images/6.webp',
      biography: 'Thích Trí Quang (1923-2019), tên thật là Lê Đình Thám, sinh tại làng Hậu Lộc, tỉnh Thanh Hóa. Ông là một vị cao tăng có ảnh hưởng lớn đến Phật giáo Việt Nam hiện đại và là một trong những nhà lãnh đạo quan trọng nhất của Giáo hội Phật giáo Việt Nam. Từ nhỏ đã có thiên hướng về tôn giáo, ông xuất gia tu học từ năm 1940 và nhanh chóng nổi bật với tài năng lãnh đạo và tầm nhìn xa. Ông đã dành cả cuộc đời mình cho việc xây dựng và phát triển Phật giáo Việt Nam trong thời kỳ cận hiện đại, đặc biệt trong bối cảnh đất nước trải qua nhiều biến động chính trị - xã hội.',
      achievements: [
        'Góp phần quan trọng trong việc thành lập và lãnh đạo Giáo hội Phật giáo Việt Nam thống nhất (1981), tạo nên sự đoàn kết trong cộng đồng Phật tử toàn quốc',
        'Đấu tranh bền bỉ cho quyền tự do tôn giáo, dân chủ và nhân quyền, trở thành tiếng nói của lương tâm xã hội',
        'Tham gia tích cực vào các hoạt động xã hội, từ thiện, giáo dục, góp phần xây dựng đất nước trong thời kỳ đổi mới',
        'Đào tạo và hướng dẫn nhiều thế hệ tăng ni trẻ, tạo ra đội ngũ lãnh đạo Phật giáo có năng lực và tâm huyết',
        'Xây dựng nhiều chùa chiền, trường học, bệnh viện, trung tâm từ thiện phục vụ cộng đồng',
        'Thúc đẩy quan hệ Phật giáo quốc tế, nâng cao vị thế của Phật giáo Việt Nam trên trường quốc tế'
      ],
      philosophy: 'Triết lý của Thích Trí Quang tập trung vào việc Phật giáo phải tham gia tích cực vào đời sống xã hội, không tách rời khỏi thực tế cuộc sống. Ông tin rằng Phật giáo không chỉ là tôn giáo tu tâm cá nhân mà còn phải đấu tranh cho công lý, bảo vệ quyền con người và xây dựng một xã hội tốt đẹp hơn. Tư tưởng của ông nhấn mạnh tinh thần "tự lực, tự cường" của Phật giáo, khuyến khích cộng đồng Phật tử tự chủ trong tổ chức và hoạt động. Ông cũng chú trọng việc giáo dục và đào tạo, coi đây là nền tảng để Phật giáo phát triển bền vững trong thời đại mới.',      historicalContext: 'Thích Trí Quang sống và hoạt động trong thời kỳ đầy biến động của lịch sử Việt Nam - từ thời kỳ kháng chiến chống Pháp, chiến tranh Việt Nam, thống nhất đất nước đến thời kỳ đổi mới. Trong bối cảnh đó, Phật giáo Việt Nam cần có những nhà lãnh đạo có tầm nhìn và can đảm để dẫn dắt cộng đồng vượt qua khó khăn. Ông đã chứng kiến và tham gia vào quá trình xây dựng lại đất nước sau chiến tranh, đồng thời đấu tranh để Phật giáo có được vị thế xứng đáng trong xã hội. Thời kỳ này cũng đòi hỏi Phật giáo phải thích ứng với những thay đổi của xã hội hiện đại, từ công nghệ đến tư duy xã hội.'
    },
    {
      id: 'thich-quang-duc',
      name: 'Thích Quảng Đức',
      era: 'Hiện đại (1897-1963)',
      contribution: 'Biểu tượng đấu tranh cho tự do tôn giáo',
      image: '/src/images/7.jpg',
      biography: 'Thích Quảng Đức (1897-1963), tên thật là Lâm Văn Túc, sinh tại làng Hội Khánh, tỉnh An Giang. Ông là một vị cao tăng dũng cảm, nổi tiếng với hành động tự thiêu vì tự do tôn giáo tại Sài Gòn ngày 11/6/1963. Hành động hy sinh của ông đã làm chấn động thế giới và trở thành biểu tượng của sự đấu tranh bất bạo động cho công lý. Thích Quảng Đức không chỉ là một nhà sư tu hành mà còn là một nhà hoạt động xã hội, luôn quan tâm đến đời sống của dân chúng và đấu tranh cho quyền bình đẳng tôn giáo.',
      achievements: [
        'Trở thành biểu tượng toàn cầu của đấu tranh bất bạo động cho tự do tôn giáo và nhân quyền',
        'Hành động tự thiêu làm thay đổi dư luận quốc tế về chính sách tôn giáo ở Việt Nam Nam',
        'Khuyến khích phong trào đấu tranh dân chủ và tự do tôn giáo trong cộng đồng Phật tử',
        'Để lại di sản tinh thần về lòng dũng cảm và tinh thần hy sinh vì chính nghĩa',
        'Truyền cảm hứng cho các phong trào đấu tranh bất bạo động trên khắp thế giới',
        'Được tôn vinh như một vị thánh tử của Phật giáo Việt Nam'
      ],
      philosophy: 'Triết lý của Thích Quảng Đức thể hiện tinh thần "bất bạo động" và "từ bi" cao cả của Phật giáo. Ông tin rằng đôi khi phải hy sinh bản thân để bảo vệ chân lý và công lý. Tư tưởng của ông nhấn mạnh rằng Phật giáo không chỉ là tu tập cá nhân mà còn phải đấu tranh cho quyền lợi của cộng đồng. Ông thể hiện tinh thần "nhất tâm hướng Phật" thông qua việc sẵn sàng hy sinh tính mạng để bảo vệ đạo pháp. Triết lý này ảnh hưởng sâu sắc đến tư tưởng "Phật giáo nhập thế" sau này.',
      historicalContext: 'Thích Quảng Đức sống trong thời kỳ Việt Nam Nam được cai trị bởi chính quyền Ngô Đình Diệm (1955-1963), khi có nhiều chính sách phân biệt đối xử với Phật giáo. Các Phật tử bị cấm tổ chức lễ hội tôn giáo, treo cờ Phật giáo, và phải chịu nhiều hạn chế khác. Trong bối cảnh đó, cộng đồng Phật tử cần một hành động mạnh mẽ để thức tỉnh dư luận và chính quyền. Hành động tự thiêu của ông đã làm thay đổi cục diện chính trị tại Việt Nam Nam và góp phần vào sự sụp đổ của chính quyền Ngô Đình Diệm.'
    },
    {
      id: 'thich-minh-chau',
      name: 'Thích Minh Châu',
      era: 'Hiện đại (1918-2012)',
      contribution: 'Giáo sư Phật học và dịch thuật kinh điển',
      image: '/src/images/8.jpg',
      biography: 'Thích Minh Châu (1918-2012) là một trong những học giả Phật học xuất sắc nhất Việt Nam hiện đại. Ông có thâm niên hơn 70 năm trong việc nghiên cứu, giảng dạy và dịch thuật các kinh điển Phật giáo. Với khả năng thông thạo nhiều ngôn ngữ cổ đại như Phạn, Pali, Trung Hoa cổ, ông đã dịch thuật và chú giải hàng trăm tác phẩm Phật học quan trọng. Thích Minh Châu không chỉ là một nhà dịch thuật tài ba mà còn là một giáo sư uyên bác, đã đào tạo nhiều thế hệ nghiên cứu sinh Phật học.',
      achievements: [
        'Dịch thuật hơn 3000 trang kinh điển Phật giáo từ Phạn, Pali và Hán văn sang tiếng Việt',
        'Biên soạn bộ "Từ điển Phật học Anh-Pali-Việt" - công trình từ điển Phật học đầu tiên tại Việt Nam',
        'Giảng dạy tại Học viện Phật giáo Việt Nam hơn 50 năm, đào tạo hàng nghìn tăng ni và Phật tử',
        'Sáng lập và phát triển khoa Nghiên cứu Phật học tại nhiều trường đại học',
        'Viết hơn 200 bài báo và 50 cuốn sách về Phật học, triết học và văn hóa',
        'Được UNESCO công nhận là "Nhà giáo dục xuất sắc thế giới" năm 1995'
      ],
      philosophy: 'Triết lý giáo dục của Thích Minh Châu tập trung vào việc "học để hiểu, hiểu để tu, tu để giác ngộ". Ông tin rằng nghiên cứu Phật học không chỉ dừng lại ở việc tìm hiểu lý thuyết mà phải ứng dụng vào thực tế cuộc sống. Tư tưởng của ông nhấn mạnh tầm quan trọng của việc dịch thuật chính xác các kinh điển để bảo tồn và truyền bá đúng đắn giáo lý Phật. Ông cũng ủng hộ việc kết hợp phương pháp nghiên cứu hiện đại với truyền thống học thuật Phật giáo.',
      historicalContext: 'Thích Minh Châu sống qua nhiều giai đoạn lịch sử quan trọng của Việt Nam, từ thời Pháp thuộc, hai cuộc kháng chiến đến thời kỳ đổi mới. Trong bối cảnh Phật giáo Việt Nam cần hiện đại hóa và hội nhập quốc tế, công việc nghiên cứu và dịch thuật của ông đã cung cấp nguồn tài liệu học thuật quý giá. Thời kỳ này cũng đòi hỏi Phật giáo phải có những nghiên cứu sâu sắc để đối t화với các hệ tư tưởng khác và khẳng định giá trị của mình trong thế giới hiện đại.'
    }
  ];

  const philosophies = [
    {
      name: 'Thiền Trúc Lâm',
      period: 'Thế kỷ 13-14',
      description: 'Hòa quyện Thiền - Tịnh - Mật, gắn liền dân tộc',
    },
    {
      name: 'Phật giáo nhập thế',
      period: 'Thế kỷ 20-21',
      description: 'Phật giáo tham gia tích cực vào xã hội',
    },
    {
      name: 'Thiền chánh niệm',
      period: 'Đương đại',
      description: 'Sống tỉnh thức trong từng khoảnh khắc',
    },
  ];

  const monuments = [
    {
      name: 'Chùa Diên Hựu (Dâu)',
      location: 'Bắc Ninh',
      significance: 'Ngôi chùa cổ nhất Việt Nam',
      period: 'Thế kỷ 6',
    },
    {
      name: 'Núi Yên Tử',
      location: 'Quảng Ninh',
      significance: 'Cái nôi thiền phái Trúc Lâm',
      period: 'Thế kỷ 13',
    },
    {
      name: 'Chùa Thiên Mụ',
      location: 'Huế',
      significance: 'Biểu tượng cố đô, tháp Phước Duyên 7 tầng',
      period: 'Thế kỷ 17',
    },
    {
      name: 'Thiền viện Trúc Lâm',
      location: 'Đà Lạt',
      significance: 'Thiền viện hiện đại giữa thiên nhiên',
      period: 'Thế kỷ 20',
    },
  ];
  const tabs = [
    { id: 'journey' as Tab, label: 'Hành Trình', icon: Calendar },
    { id: 'figures' as Tab, label: 'Nhân vật', icon: Users },
    { id: 'philosophy' as Tab, label: 'Tư tưởng', icon: Lightbulb },
    { id: 'monuments' as Tab, label: 'Di tích', icon: MapPin },
    { id: 'theory' as Tab, label: 'Lý thuyết', icon: BookOpen },
    { id: 'comparison' as Tab, label: 'So sánh', icon: Scale },
    { id: 'folk-culture' as Tab, label: 'Văn hóa dân gian', icon: Sparkles },
    { id: 'dialogue' as Tab, label: 'Tư tưởng đối thoại', icon: MessageCircle },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              className="relative max-w-4xl w-full max-h-[80vh] bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-700 to-orange-700 p-6 border-b-4 border-amber-900">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-full p-3">
                      <Flame className="size-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Thư viện Tri thức</h2>
                      <p className="text-sm text-amber-100">Kho tài liệu Phật giáo Việt Nam</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                  >
                    <X className="size-6 text-white" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="mt-6">
                  <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      
                      return (
                        <motion.button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap flex-shrink-0 ${
                            isActive
                              ? 'bg-white text-amber-900 shadow-lg'
                              : 'bg-white/20 text-white hover:bg-white/30'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon className="size-4" />
                          <span>{tab.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
                <AnimatePresence mode="wait">
                  {activeTab === 'journey' && (
                    <motion.div
                      key="journey"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-amber-900 mb-2">Hành Trình Phát Triển Triết Học Phật Giáo Việt Nam</h3>
                        <p className="text-amber-700">
                          Đã mở khóa: {unlockedPeriods.length}/{philosophicalPeriods.length} giai đoạn
                        </p>
                        <div className="w-full bg-amber-200 rounded-full h-3 mt-2">
                          <div 
                            className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(unlockedPeriods.length / philosophicalPeriods.length) * 100}%` }}
                          />
                        </div>
                      </div>                      {/* Timeline with Accordion Style */}
                      <div className="space-y-4">
                        <h4 className="text-xl font-bold text-amber-800 mb-4">Hành Trình Các Giai Đoạn</h4>
                        {philosophicalPeriods.map((period) => {
                          const isUnlocked = unlockedPeriods.includes(period.id);
                          const isExpanded = selectedPeriod === period.id;
                          
                          return (
                            <div key={period.id} className="border-2 border-amber-200 rounded-xl overflow-hidden">
                              {/* Period Header - Clickable */}
                              <motion.div
                                className={`
                                  p-4 cursor-pointer transition-all
                                  ${isUnlocked 
                                    ? 'bg-gradient-to-r from-white to-amber-50 hover:from-amber-50 hover:to-amber-100' 
                                    : 'bg-gray-100 opacity-60 cursor-not-allowed'
                                  }
                                  ${isExpanded ? 'bg-amber-100 border-b-2 border-amber-300' : ''}
                                `}
                                onClick={() => isUnlocked && setSelectedPeriod(isExpanded ? null : period.id)}
                                whileHover={isUnlocked ? { scale: 1.01 } : {}}
                                whileTap={isUnlocked ? { scale: 0.99 } : {}}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div 
                                      className="w-5 h-5 rounded-full"
                                      style={{ backgroundColor: isUnlocked ? period.color : '#ccc' }}
                                    />
                                    <div>
                                      <h5 className={`font-bold text-lg ${isUnlocked ? 'text-amber-800' : 'text-gray-500'}`}>
                                        {period.name}
                                      </h5>
                                      <p className="text-sm text-gray-600 font-medium">
                                        {period.period}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {!isUnlocked && (
                                      <span className="text-xs bg-gray-500 text-white px-2 py-1 rounded flex items-center gap-1">
                                        🔒 Chưa mở khóa
                                      </span>
                                    )}
                                    {isUnlocked && (
                                      <span className={`text-2xl transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                                        ▼
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <p className={`text-sm mt-2 ${isUnlocked ? 'text-gray-700' : 'text-gray-400'}`}>
                                  {period.what.length > 120 ? period.what.substring(0, 120) + '...' : period.what}
                                </p>
                              </motion.div>

                              {/* Expanded Content - 5W1H */}
                              <AnimatePresence>
                                {isExpanded && isUnlocked && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden bg-white"
                                  >
                                    <div className="p-6 space-y-6">
                                      {/* Period Header */}
                                      <div className="text-center border-b border-amber-200 pb-4">
                                        <div className="flex items-center justify-center gap-3 mb-2">
                                          <div 
                                            className="w-6 h-6 rounded-full"
                                            style={{ backgroundColor: period.color }}
                                          />
                                          <h4 className="text-2xl font-bold text-amber-800">{period.name}</h4>
                                        </div>
                                        <p className="text-amber-600 font-semibold">{period.period}</p>
                                      </div>

                                      {/* 5W1H Content */}
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                          { 
                                            key: 'what', 
                                            label: 'Khái niệm / Nguồn gốc', 
                                            icon: '', 
                                            color: 'bg-blue-100 text-blue-800 border-blue-300',
                                            content: period.what
                                          },
                                          { 
                                            key: 'who', 
                                            label: 'Nhân Vật', 
                                            icon: '', 
                                            color: 'bg-green-100 text-green-800 border-green-300',
                                            content: period.who
                                          },
                                          { 
                                            key: 'why', 
                                            label: 'TẠI SAO', 
                                            icon: '', 
                                            color: 'bg-purple-100 text-purple-800 border-purple-300',
                                            content: period.why
                                          },
                                          { 
                                            key: 'how', 
                                            label: 'NHƯ THẾ NÀO', 
                                            icon: '', 
                                            color: 'bg-orange-100 text-orange-800 border-orange-300',
                                            content: period.how
                                          },
                                          { 
                                            key: 'when', 
                                            label: 'KHI NÀO', 
                                            icon: '', 
                                            color: 'bg-red-100 text-red-800 border-red-300',
                                            content: period.when
                                          }
                                        ].map(({ key, label, icon, color, content }) => (
                                          <motion.div
                                            key={key}
                                            className={`p-4 rounded-lg border-2 ${color}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                          >
                                            <div className="flex items-center gap-2 mb-3">
                                              <span className="text-lg">{icon}</span>
                                              <h5 className="font-bold text-base">{label}</h5>
                                            </div>
                                            {key === 'who' ? (
                                              <ul className="space-y-2">
                                                {(content as string[]).map((person, index) => (
                                                  <li key={index} className="flex items-start gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-current opacity-60 mt-1.5"></span>
                                                    <span className="text-sm leading-relaxed">{person}</span>
                                                  </li>
                                                ))}
                                              </ul>
                                            ) : (
                                              <p className="text-sm leading-relaxed">{content as string}</p>
                                            )}
                                          </motion.div>
                                        ))}
                                      </div>

                                      {/* Additional Info */}
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-4 border-t border-amber-200">
                                        <div>
                                          <h6 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                                            🏛️ Di tích quan trọng
                                          </h6>
                                          <ul className="space-y-2">
                                            {period.monuments.map((monument, index) => (
                                              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                                <span className="text-amber-600 mt-0.5">•</span>
                                                <span>{monument}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                        <div>
                                          <h6 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                                            💭 Tư tưởng & Triết lý chính
                                          </h6>
                                          <div className="flex flex-wrap gap-2">
                                            {period.philosophicalConcepts.map((concept, index) => (
                                              <span 
                                                key={index}
                                                className="text-xs bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full border border-amber-300"
                                              >
                                                {concept}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      </div>

                                      {/* Key Events */}
                                      <div className="pt-4 border-t border-amber-200">
                                        <h6 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                                          📅 Sự kiện quan trọng
                                        </h6>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                          {period.keyEvents.map((event, index) => (
                                            <div key={index} className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                                              <span className="text-sm text-gray-700 flex items-start gap-2">
                                                <span className="text-amber-600 mt-0.5">▸</span>
                                                {event}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}                  {activeTab === 'figures' && (
                    <motion.div
                      key="figures"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-amber-900 mb-2">Nhân Vật Quan Trọng</h3>
                        <p className="text-amber-700">Các bậc tiền bối có ảnh hưởng lớn đến Phật giáo Việt Nam</p>
                      </div>

                      {figures.map((figure, index) => {
                        const isExpanded = expandedFigureId === figure.id;
                        
                        return (
                          <div key={figure.id} className="border-2 border-amber-200 rounded-xl overflow-hidden bg-white shadow-md">
                            {/* Figure Header - Clickable */}
                            <motion.div
                              className={`
                                p-5 cursor-pointer transition-all
                                bg-gradient-to-r from-white to-amber-50 hover:from-amber-50 hover:to-amber-100
                                ${isExpanded ? 'bg-amber-100 border-b-2 border-amber-300' : ''}
                              `}
                              onClick={() => setExpandedFigureId(isExpanded ? null : figure.id)}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="flex items-center justify-between">                                <div className="flex items-center gap-4">                                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                    {figure.image.startsWith('/') ? (
                                      <>
                                        <img 
                                          src={figure.image} 
                                          alt={figure.name}
                                          className="w-full h-full object-cover"
                                          onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLSpanElement;
                                            fallback.style.display = 'inline';
                                          }}
                                        />
                                        <span className="text-4xl" style={{display: 'none'}}>👴</span>
                                      </>
                                    ) : (
                                      <span className="text-4xl">{figure.image}</span>
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="text-xl font-bold text-amber-900 mb-1">{figure.name}</h4>
                                    <p className="text-sm text-amber-700 font-medium mb-1">{figure.era}</p>
                                    <p className="text-sm text-gray-700">{figure.contribution}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`text-2xl transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                                    ▼
                                  </span>
                                </div>
                              </div>
                            </motion.div>

                            {/* Expanded Content - Biography & Details */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="overflow-hidden bg-gradient-to-b from-amber-50 to-white"
                                >
                                  <div className="p-6 space-y-6">
                                    {/* Biography */}
                                    <div>
                                      <h5 className="font-bold text-lg text-amber-800 mb-3 flex items-center gap-2">
                                        📜 Tiểu sử
                                      </h5>
                                      <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg border border-amber-200">
                                        {figure.biography}
                                      </p>
                                    </div>

                                    {/* Achievements */}
                                    <div>
                                      <h5 className="font-bold text-lg text-amber-800 mb-3 flex items-center gap-2">
                                        🏆 Thành tựu nổi bật
                                      </h5>
                                      <div className="bg-white rounded-lg border border-amber-200 p-4">
                                        <ul className="space-y-3">
                                          {figure.achievements.map((achievement, idx) => (
                                            <motion.li 
                                              key={idx} 
                                              className="flex items-start gap-3"
                                              initial={{ opacity: 0, x: -10 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              transition={{ delay: 0.1 + idx * 0.05 }}
                                            >
                                              <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                                                {idx + 1}
                                              </span>
                                              <span className="text-gray-700 leading-relaxed">{achievement}</span>
                                            </motion.li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>

                                    {/* Philosophy & Historical Context */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <div>
                                        <h5 className="font-bold text-lg text-amber-800 mb-3 flex items-center gap-2">
                                          💭 Tư tưởng chính
                                        </h5>
                                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                          <p className="text-gray-700 text-sm leading-relaxed">
                                            {figure.philosophy}
                                          </p>
                                        </div>
                                      </div>

                                      <div>
                                        <h5 className="font-bold text-lg text-amber-800 mb-3 flex items-center gap-2">
                                          🏛️ Bối cảnh lịch sử
                                        </h5>
                                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                          <p className="text-gray-700 text-sm leading-relaxed">
                                            {figure.historicalContext}
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Quick Info Tags */}
                                    <div>
                                      <h5 className="font-bold text-lg text-amber-800 mb-3">🏷️ Thẻ thông tin</h5>
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm border border-amber-300">
                                          {figure.era}
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm border border-blue-300">
                                          {figure.contribution}
                                        </span>
                                        {figure.id.includes('tran') && (
                                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm border border-green-300">
                                            Thiền phái Trúc Lâm
                                          </span>
                                        )}
                                        {figure.id === 'van-hanh' && (
                                          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm border border-purple-300">
                                            Quốc sư đầu tiên
                                          </span>
                                        )}
                                        {figure.id === 'thich-nhat-hanh' && (
                                          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm border border-orange-300">
                                            Thiền sư toàn cầu
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}

                  {activeTab === 'philosophy' && (
                    <motion.div
                      key="philosophy"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      {philosophies.map((philosophy, index) => (
                        <motion.div
                          key={philosophy.name}
                          className="bg-white rounded-lg p-6 border-2 border-purple-200 hover:border-purple-400 transition-colors shadow-md"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-full p-3">
                              <Lightbulb className="size-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-purple-900 mb-1">
                                {philosophy.name}
                              </h3>
                              <p className="text-sm text-purple-700 mb-2">{philosophy.period}</p>
                              <p className="text-gray-700">{philosophy.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'monuments' && (
                    <motion.div
                      key="monuments"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {monuments.map((monument, index) => (
                        <motion.div
                          key={monument.name}
                          className="bg-white rounded-lg p-5 border-2 border-green-200 hover:border-green-400 transition-colors shadow-md"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-full p-2">
                              <MapPin className="size-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-green-900">{monument.name}</h3>
                              <p className="text-sm text-green-700">{monument.location}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{monument.significance}</p>
                          <p className="text-xs text-gray-600 italic">{monument.period}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'theory' && (
                    <motion.div
                      key="theory"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      {eraRegions.map((era, eraIndex) => {
                        const eraCheckpoints = checkpoints.slice(
                          era.startCheckpoint,
                          era.endCheckpoint + 1
                        ).filter((cp) => cp.theory);
                        if (eraCheckpoints.length === 0) return null;
                        return (
                          <div key={era.name}>
                            <h3
                              className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2"
                              style={{ color: era.color }}
                            >
                              <span>{era.icon}</span>
                              {era.name} ({era.period})
                            </h3>
                            <div className="space-y-3">
                              {eraCheckpoints.map((cp) => (
                                <div key={cp.id}>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setExpandedTheoryId(expandedTheoryId === cp.id ? null : cp.id)
                                    }
                                    className="w-full text-left flex items-center justify-between gap-2 p-3 rounded-lg bg-white border-2 border-amber-200 hover:border-amber-400 transition-colors"
                                  >
                                    <span className="font-semibold text-amber-900">{cp.title}</span>
                                    <span className="text-amber-600">
                                      {expandedTheoryId === cp.id ? '▼ Thu gọn' : '▶ Đọc'}
                                    </span>
                                  </button>
                                  <AnimatePresence>
                                    {expandedTheoryId === cp.id && cp.theory && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="mt-2 overflow-hidden"
                                      >
                                        <TheoryCard theory={cp.theory} />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}

                  {activeTab === 'comparison' && (
                    <motion.div
                      key="comparison"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <PhilosophicalComparison />
                    </motion.div>
                  )}
                  {activeTab === 'folk-culture' && (
                    <motion.div
                      key="folk-culture"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <FolkCultureSection />
                    </motion.div>
                  )}
                  {activeTab === 'dialogue' && (
                    <motion.div
                      key="dialogue"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <PhilosophicalDialogue />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

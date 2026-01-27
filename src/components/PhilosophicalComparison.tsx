import { philosophicalComparison } from '../data/philosophicalComparisonData';

export function PhilosophicalComparison() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-amber-900 mb-1">
          So sánh Phật giáo Ấn Độ – Trung Hoa – Việt Nam
        </h3>
        <p className="text-sm text-amber-700">
          Nhấn mạnh điểm sáng tạo và Việt hóa của Phật giáo Việt Nam
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-amber-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-amber-50">
              <th className="px-4 py-3 text-left text-amber-900 font-semibold w-1/4">
                Tiêu chí
              </th>
              <th className="px-4 py-3 text-left text-gray-800 font-semibold w-1/4">
                Ấn Độ (Gốc)
              </th>
              <th className="px-4 py-3 text-left text-gray-800 font-semibold w-1/4">
                Trung Hoa
              </th>
              <th className="px-4 py-3 text-left font-semibold w-1/4 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900">
                Việt Nam (Sáng tạo)
              </th>
            </tr>
          </thead>
          <tbody>
            {philosophicalComparison.map((row) => (
              <tr key={row.category} className="border-t border-amber-100 align-top">
                <td className="px-4 py-3 font-semibold text-amber-900 bg-amber-50/60 text-sm">
                  {row.category}
                </td>
                <td className="px-4 py-3 text-gray-800">
                  <p className="leading-snug">{row.india}</p>
                </td>
                <td className="px-4 py-3 text-gray-800">
                  <p className="leading-snug">{row.china}</p>
                </td>
                <td className="px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900">
                  <p className="leading-snug font-medium">{row.vietnam}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-600">
        Gợi ý luận điểm: Phật giáo Việt Nam không chỉ tiếp thu mà còn tái sáng tạo, gắn chặt với
        lý tưởng hộ quốc – an dân, nhập thế và toàn cầu hóa chánh niệm.
      </p>
    </div>
  );
}


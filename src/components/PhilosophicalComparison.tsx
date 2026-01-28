import { philosophicalComparison } from '../data/philosophicalComparisonData';

export function PhilosophicalComparison() {
  return (
    <div className="space-y-3">
      <div className="text-center mb-3">
        <h3 className="text-xl font-bold text-amber-900 mb-1">
          So sánh Phật giáo Ấn Độ – Trung Hoa – Việt Nam
        </h3>
        <p className="text-xs text-amber-700">
          Nhấn mạnh điểm sáng tạo và Việt hóa của Phật giáo Việt Nam
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-amber-200 bg-white shadow-sm">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="bg-amber-50">
              <th className="px-3 py-2 text-left text-amber-900 font-semibold w-1/4 text-xs">
                Tiêu chí
              </th>
              <th className="px-3 py-2 text-left text-gray-800 font-semibold w-1/4 text-xs">
                Ấn Độ (Gốc)
              </th>
              <th className="px-3 py-2 text-left text-gray-800 font-semibold w-1/4 text-xs">
                Trung Hoa
              </th>
              <th className="px-3 py-2 text-left font-semibold w-1/4 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 text-xs">
                Việt Nam (Sáng tạo)
              </th>
            </tr>
          </thead>
          <tbody>
            {philosophicalComparison.map((row) => (
              <tr key={row.category} className="border-t border-amber-100 align-top">
                <td className="px-3 py-2 font-semibold text-amber-900 bg-amber-50/60 text-xs">
                  {row.category}
                </td>
                <td className="px-3 py-2 text-gray-800">
                  <p className="leading-tight text-xs">{row.india}</p>
                </td>
                <td className="px-3 py-2 text-gray-800">
                  <p className="leading-tight text-xs">{row.china}</p>
                </td>
                <td className="px-3 py-2 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900">
                  <p className="leading-tight text-xs font-medium">{row.vietnam}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-600 text-center">
        Gợi ý luận điểm: Phật giáo Việt Nam không chỉ tiếp thu mà còn tái sáng tạo, gắn chặt với
        lý tưởng hộ quốc – an dân, nhập thế và toàn cầu hóa chánh niệm.
      </p>
    </div>
  );
}


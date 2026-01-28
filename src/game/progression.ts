import type { EraName } from './eras';
import { isEraName } from './eras';

export type PracticeLevel = 'Nhập đạo' | 'Khai Thông' | 'Giác ngộ' | 'Viên mãn';

export function getPracticeLevelForEra(eraName: string): PracticeLevel {
  const normalized: EraName = isEraName(eraName) ? eraName : 'Lý - Trần';

  switch (normalized) {
    case 'Lý - Trần':
      return 'Nhập đạo';
    case 'Tây Sơn':
      return 'Khai Thông';
    case 'Cận đại':
      return 'Giác ngộ';
    case 'Hiện đại':
      return 'Viên mãn';
  }
}


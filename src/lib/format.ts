/**
 * 通用格式化工具
 */

/**
 * 格式化届数（入学年份 2 位）
 * 例：2017 → "17级"
 */
export function formatYear(year: number): string {
  if (year < 100) return `${year}级`;
  return `${String(year).slice(-2)}级`;
}

/**
 * 格式化届数范围（届期）
 * 例：start=2017, end=2019 → "2017—2019 届"
 */
export function formatTenure(start: number, end?: number): string {
  return end ? `${start}—${end} 届` : `${start} 届`;
}

/**
 * 首字母大写
 */
export function titleCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * 部门中文名
 */
export function departmentName(dept: 'tech' | 'operate'): string {
  return dept === 'tech' ? '技术部' : '运营部';
}

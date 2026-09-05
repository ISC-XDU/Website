/**
 * 成员数据查询辅助
 */
import membersData from '@data/members.json';

export interface Member {
  name: string;
  year: number;
  avatar: string;
  email: string | null;
  bio: string | null;
  source: string;
}

/** 全部成员（按届期升序、同届按姓名） */
export const members: Member[] = membersData as Member[];

/** 按届期分组：{ 2017: Member[], 2018: Member[], ... } */
export function groupByYear(): Record<number, Member[]> {
  return members.reduce<Record<number, Member[]>>((acc, m) => {
    (acc[m.year] ||= []).push(m);
    return acc;
  }, {});
}

/** 所有届期（降序：年份最大的新一届在最前） */
export function getYears(): number[] {
  return Array.from(new Set(members.map((m) => m.year))).sort((a, b) => b - a);
}

/** 成员总数 */
export function getCount(): number {
  return members.length;
}

/**
 * 从 bio 中提取主要身份（如"主席"、"技术部部长"、"秘书长"）。
 * bio 以"西电浪潮俱乐部XXXX-XXXX届XX"开头，兼容多届连任无身份的写法
 * （如"2017-2018届、2018-2019届主席"）。提取失败返回 null（不显示徽章）。
 */
export function getRole(m: Member): string | null {
  if (!m.bio) return null;
  const match = m.bio.match(
    /西电浪潮俱乐部(?:\d{4}-?\d{4}届[、，])*\d{4}-?\d{4}届([^，。、\s]+?)(?:[，。、]|$)/
  );
  if (!match) return null;
  const role = match[1].trim();
  if (!role || role.length > 12) return null;
  return role;
}

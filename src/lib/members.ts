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

/** 所有届期（升序） */
export function getYears(): number[] {
  return Array.from(new Set(members.map((m) => m.year))).sort((a, b) => a - b);
}

/** 成员总数 */
export function getCount(): number {
  return members.length;
}

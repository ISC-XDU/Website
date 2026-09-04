#!/usr/bin/env node
/**
 * 一次性迁移脚本：解析 ../Website/member.html → src/data/members.json
 *
 * 用法：
 *   node scripts/migrate-members.mjs
 *
 * 工作方式：
 *   1. 读 ../Website/member.html（GBK 编码）
 *   2. 扫描所有 <h3>...届...</h3> 标记届数
 *   3. 扫描每个 member card：
 *      - <img src="img/inspur/xxx.png"> → avatar
 *      - <h4>姓名</h4> → name
 *      - <a href="mailto:xxx"> → email
 *      - <div class="modal-body">...</div> → bio
 *   4. 输出 src/data/members.json
 *
 * 输出 schema：
 *   { name, year (number), role?, avatar, email?, bio, source: "legacy-2023" }
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');
const legacyHtmlPath = resolve(projectRoot, '..', 'Website', 'member.html');
const outputPath = join(projectRoot, 'src', 'data', 'members.json');

if (!existsSync(legacyHtmlPath)) {
  console.error(`❌ 找不到旧 member.html: ${legacyHtmlPath}`);
  console.error('   请确认 ../Website/member.html 存在');
  process.exit(1);
}

// 读文件（UTF-8 编码，无 BOM）
let html;
try {
  html = readFileSync(legacyHtmlPath, 'utf-8');
} catch (err) {
  console.error(`❌ 读取失败: ${err.message}`);
  process.exit(1);
}

console.log(`✓ 读取 ${legacyHtmlPath}（${html.length} 字符）`);

// 提取年份分组：扫描 <h3>...X届...</h3>
// 届数标记里可能带 ★ 等装饰字符：&#9733; / &#10031; 等，需要先去掉
const yearHeaderRe = /<h3[^>]*>([\s\S]*?)<\/h3>/g;
const yearRanges = [];
let match;
while ((match = yearHeaderRe.exec(html)) !== null) {
  // 去掉 HTML 实体（避免 &#9733 / &#9733; 里的 9733 被误认为年份）
  const inner = match[1].replace(/&#\d+;?/g, '').replace(/&[a-z]+;/gi, '');
  const years = [...inner.matchAll(/(\d{4})/g)].map((m) => parseInt(m[1], 10));
  if (years.length >= 2) {
    yearRanges.push({ start: years[0], end: years[1], index: match.index });
  }
}

if (yearRanges.length === 0) {
  console.error('❌ 没找到任何届数标记（<h3>...届...</h3>）');
  process.exit(1);
}

console.log(`✓ 识别到 ${yearRanges.length} 个届数分组: ${yearRanges.map((r) => r.start).join(', ')}`);

// 给定一个成员 card 的 index，确定它属于哪个届数
function findYearRange(idx) {
  let result = yearRanges[yearRanges.length - 1];
  for (const r of yearRanges) {
    if (r.index <= idx) result = r;
    else break;
  }
  return result;
}

// 提取成员 card：扫描包含 <img> + <h4> 的 div 块
// 简化策略：逐个匹配每个头像 <img>，再向后找 <h4> + email + modal
const memberImgRe = /<img\s+src="img\/inspur\/([^"]+)"[^>]*class="[^"]*rounded-circle[^"]*"[^>]*>/g;
const members = [];
const seen = new Set();

while ((match = memberImgRe.exec(html)) !== null) {
  const avatarFile = match[1];
  const blockStart = match.index;
  const blockEnd = html.indexOf('</div>\n                </div>\n                </div>', blockStart);
  // 退化：用 chunk 长度（取其后 4000 字符作为该 card 的范围）
  const searchRange = html.slice(blockStart, blockStart + 4000);

  // 提取姓名
  const nameMatch = searchRange.match(/<h4[^>]*>([^<]+)<\/h4>/);
  if (!nameMatch) continue;
  const name = nameMatch[1].trim();
  if (!name || seen.has(name)) continue;

  // 提取邮箱
  const emailMatch = searchRange.match(/mailto:([^"]+)"/);
  const email = emailMatch ? emailMatch[1] : undefined;

  // 提取 bio（modal-body 内容）
  const bioMatch = searchRange.match(/<div class="modal-body">([\s\S]*?)<\/div>\s*<div class="modal-footer">/);
  let bio = '';
  if (bioMatch) {
    bio = bioMatch[1]
      .replace(/<[^>]+>/g, '') // 去 HTML 标签
      .replace(/&emsp;/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const yearRange = findYearRange(blockStart);
  const tenureStart = yearRange.start;

  members.push({
    name,
    year: tenureStart, // 用届期起始年份作为主 year
    avatar: `/img/inspur/${avatarFile}`,
    email: email ?? null,
    bio: bio || null,
    source: 'legacy-2023',
  });
  seen.add(name);
}

console.log(`✓ 解析出 ${members.length} 名成员`);

// 排序：按 year 升序，同年按 name 拼音/笔划（简单按字符）
members.sort((a, b) => {
  if (a.year !== b.year) return a.year - b.year;
  return a.name.localeCompare(b.name, 'zh-CN');
});

writeFileSync(outputPath, JSON.stringify(members, null, 2) + '\n', 'utf-8');
console.log(`✓ 写入 ${outputPath}`);
console.log(`\n统计：`);
const byYear = members.reduce((acc, m) => {
  acc[m.year] = (acc[m.year] || 0) + 1;
  return acc;
}, {});
Object.entries(byYear).forEach(([year, count]) => {
  console.log(`  ${year} 届：${count} 人`);
});

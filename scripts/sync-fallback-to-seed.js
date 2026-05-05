#!/usr/bin/env node
// fallback (components-data.js)의 풀버전 preview_html을 DB UPDATE SQL로 자동 변환
// 출력: server/db/blocks-preview-update.sql
// 캡틴 Supabase SQL Editor에서 1회 실행하면 카탈로그 미리보기 정상화

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src', 'js', 'components-data.js');
const OUT = path.join(ROOT, 'server', 'db', 'blocks-preview-update.sql');

// fallback 모듈 직접 require 못 함 (브라우저 글로벌). eval로 추출.
const code = fs.readFileSync(SRC, 'utf8');
// 헤더 주석 제거 + window. 글로벌 → const 로 임시 변환
const wrapped = code.replace(/window\.MERGEUI_COMPONENTS_FALLBACK\s*=/, 'const ITEMS =') + '\nmodule.exports = ITEMS;';
const tmp = path.join(ROOT, '.tmp-fallback.js');
fs.writeFileSync(tmp, wrapped);
const items = require(tmp);
fs.unlinkSync(tmp);

console.log('[sync] Found ' + items.length + ' fallback items');

function escapeSqlString(s) {
  return String(s || '').replace(/'/g, "''");
}

const lines = [
  '-- ============================================',
  '-- preview_html 풀버전 sync (fallback → DB)',
  '-- 작성: 메인 자동 변환 (scripts/sync-fallback-to-seed.js)',
  '-- 작성일: ' + new Date().toISOString(),
  '-- 적용: Supabase SQL Editor에서 1회 실행',
  '-- 효과: 카탈로그 미리보기 unstyled 결함 해소',
  '-- ============================================',
  ''
];

items.forEach(function(item, i) {
  if (!item.slug || !item.preview_html) return;
  lines.push('-- ' + (i + 1) + ') ' + item.slug + ' (' + item.category + ')');
  lines.push("UPDATE public.components SET preview_html = '" + escapeSqlString(item.preview_html) + "' WHERE slug = '" + escapeSqlString(item.slug) + "';");
  lines.push('');
});

lines.push('-- 완료. ' + items.length + '개 row preview_html 갱신됨.');
lines.push('-- 검증: SELECT slug, length(preview_html) FROM components ORDER BY slug;');

fs.writeFileSync(OUT, lines.join('\n'));
console.log('[sync] Wrote ' + OUT);
console.log('[sync] Open Supabase SQL Editor → paste contents → Run.');

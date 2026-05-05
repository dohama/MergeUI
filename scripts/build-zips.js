#!/usr/bin/env node
// MergeUi 다운로드 ZIP 빌드 스크립트
// 출력: landing/downloads/{slug}.zip (Vercel이 정적 자산으로 서빙)
// 호출: node scripts/build-zips.js  (npm run build:zips)

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'landing', 'downloads');

// ─────────────────────────────────────────────
// 빌드 대상: { 출력 ZIP slug, 소스 폴더, README 추가 여부 }
// ─────────────────────────────────────────────
const TARGETS = [
  {
    slug: 'bi_v1',
    sourceDir: path.join(ROOT, 'templates', 'bi_v1'),
    description: 'MergeUi BI Analytics theme — production-ready dashboard'
  },
  {
    slug: 'mergeui-blocks-v1',
    sourceDir: path.join(ROOT, 'templates', 'blocks'),
    description: 'MergeUi 24 component blocks (buttons / cards / tables / forms / charts / feedback / navigation)'
  }
];

function ensureOutDir() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    console.log('[build-zips] Created output dir:', OUT_DIR);
  }
}

function buildZip(target) {
  return new Promise((resolve, reject) => {
    const outPath = path.join(OUT_DIR, target.slug + '.zip');
    const output = fs.createWriteStream(outPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      const sizeKB = (archive.pointer() / 1024).toFixed(1);
      console.log('[build-zips] ✓ ' + target.slug + '.zip — ' + sizeKB + ' KB');
      resolve({ slug: target.slug, sizeKB, path: outPath });
    });
    archive.on('warning', (err) => { if (err.code === 'ENOENT') console.warn(err); else reject(err); });
    archive.on('error', reject);

    archive.pipe(output);

    // 소스 폴더 전체를 ZIP에 추가 (slug/ 하위로)
    if (!fs.existsSync(target.sourceDir)) {
      reject(new Error('Source directory not found: ' + target.sourceDir));
      return;
    }
    archive.directory(target.sourceDir, target.slug);

    // 라이선스 + 메타 정보 README 추가 (Pro 고객용)
    const readme = [
      '# ' + target.slug,
      '',
      target.description,
      '',
      '## License',
      '',
      'Commercial license. See https://mergeui.com/legal/terms for full terms.',
      '',
      '## Support',
      '',
      'support@mergeui.com',
      '',
      '## Build',
      '',
      'Built: ' + new Date().toISOString(),
      'Source: https://mergeui.com',
      ''
    ].join('\n');
    archive.append(readme, { name: target.slug + '/MERGEUI-LICENSE.md' });

    archive.finalize();
  });
}

async function main() {
  console.log('[build-zips] Output dir:', OUT_DIR);
  ensureOutDir();

  const results = [];
  for (const target of TARGETS) {
    try {
      const result = await buildZip(target);
      results.push(result);
    } catch (e) {
      console.error('[build-zips] ✗ ' + target.slug + ' failed:', e.message);
      process.exit(1);
    }
  }

  console.log('');
  console.log('[build-zips] ━━━ Summary ━━━');
  results.forEach((r) => console.log('  ' + r.slug + ': ' + r.sizeKB + ' KB'));
  console.log('[build-zips] Done. ' + results.length + ' ZIP(s) built.');
}

main();

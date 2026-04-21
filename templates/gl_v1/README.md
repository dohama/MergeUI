# Aurora SaaS (gl_v1)

> White Glassmorphism · 파스텔 그라디언트 메쉬 SaaS 어드민 대시보드
> 디자인 스펙: [`design/themes/gl_v1-design-system.md`](../../design/themes/gl_v1-design-system.md)

## 시그니처
- 파스텔 그라디언트 메쉬 배경 (라벤더·피치·민트 3개 오브 fixed blur 40px)
- 하얀 프로스트 유리 카드 (backdrop-filter 24px saturate 1.4)
- 플로팅 사이드바 (가장자리 16px gap, radius 20px)
- Aurora Purple → Cherry Blossom 그라디언트 CTA
- Plus Jakarta Sans 전면 사용

## Quick Start
1. 폴더 다운로드 → 브라우저에서 `index.html` 열기
2. 또는 HTTP 서버: `npx serve` (필수 — file:// 는 CDN 경로에 따라 이슈 있을 수 있음)

## 커스터마이징
- **컬러 변경**: `css/gl-tokens.css`의 `--gl-primary`, `--gl-sub`, `--gl-third` 수정
- **액센트 프리셋 전환**: tokens.css 하단 주석된 프리셋 중 하나를 주석 해제
- **데이터 변경**: `js/data.js`의 `GL_DATA` 객체 수정

## File Structure
```
gl_v1/
├── index.html          # Overview Dashboard
├── workspaces.html     # 워크스페이스 관리 (준비 중)
├── team.html           # 팀·권한 (준비 중)
├── integrations.html   # 통합 (준비 중)
├── settings.html       # 설정 (준비 중)
├── css/
│   ├── gl-tokens.css   # 디자인 토큰 ⭐ 커스터마이징 여기
│   └── gl-theme.css    # 전체 스타일
├── js/
│   ├── gl-theme.js     # 인터랙션·렌더
│   └── data.js         # ⭐ 더미 데이터
└── README.md
```

## 의존성
- Chart.js 4 (CDN)
- Google Fonts — Plus Jakarta Sans (CDN)

## 라이선스
© 2026 MergeUi. Commercial license included (Pro plan).

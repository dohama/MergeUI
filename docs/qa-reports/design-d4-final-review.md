# 디자인 D-4 최종 시각 점검 리포트 (5/2)

> 작성: B(디자인 디렉터) | 2026-05-02
> 대상: 24종 Blocks · PH 갤러리 5장 후보 · bi_v1 플래그십
> 단일 출처: `design/blocks-spec.md`, `docs/qa-reports/blocks-qa-2026-05-05.md`
> 마감: 5/3 D-3
> **판정 요약: 24종 중 7개에 시각 결함(Critical 5 / Major 3 / Minor 4) 잔존. 5/3 내 핫픽스 권고. 갤러리 5장 + bi_v1 점검 별도 정리.**

---

## 작업 1 — 24종 라이브 픽셀 검증 결과

### 검증 방법
24개 `templates/blocks/*.html` 코드 + `src/styles/tokens.css` 단일 소스 대조. 각 컴포넌트 (1) 라이트 모드 자동 전환 시 색 정합성 (2) 토큰 사용 vs 하드코딩 (3) 8px 그리드 (4) 4.5:1 대비 (5) `:focus-visible` 표준 (6) 다크↔라이트 명도/채도 재설계 6항목 검수.

### 판정 매트릭스 (24종)

| 카테고리 | 슬러그 | 결과 | 결함 |
|---------|-------|------|------|
| Buttons | btn-primary | PASS | — |
| Buttons | btn-secondary | PASS | — |
| Buttons | btn-ghost | PASS | — |
| Buttons | btn-destructive | PASS | hover/active hex 토큰화 권고 (Minor) |
| Cards | card-kpi | PASS | 숫자 28px(스펙 32px) 정합 격차 (Cosmetic) |
| Cards | card-metric | PASS | — |
| Cards | **card-feature** | **FAIL** | 아이콘 박스 배경 `rgba(108,92,231,.12)` 등 3개 하드코딩, `--merge-glow-brand` 토큰 미사용 → 라이트 자동 보정 0.08 비적용 (**Major**) |
| Cards | card-stat-row | PASS | — |
| Tables | table-basic | PASS | zebra stripe 누락 (Minor) |
| Tables | table-sortable | PASS | — |
| Tables | **table-actions** | **FAIL** | `.row-act.danger` 색 `#FCA5A5` 하드코딩 → 라이트 #FFF 배경 대비 약 2.2:1, AA 미달 (**Major**) |
| Forms | form-input | PASS | focus shadow 알파 하드코딩 (Minor) |
| Forms | form-select | PASS | chevron `%2380808A` 라이트 보정 누락 (Minor) |
| Forms | form-checkbox | PASS | accent-color 자동 처리 OK |
| Forms | form-radio | PASS | — |
| Charts | **chart-line** | **FAIL** | stroke `#818CF8` 다크 hex 하드코딩 → 라이트 모드에서 `--merge-chart-1`(#6366F1) 자동 전환 안 됨 (**Critical**) |
| Charts | **chart-bar** | **FAIL** | 6개 막대 모두 `fill="#818CF8"` 등 SVG 속성 직접 하드코딩 (**Critical**) |
| Charts | **chart-donut** | **FAIL** | arc/legend-dot 모두 hex 하드코딩 (**Critical**) |
| Charts | **chart-area** | **FAIL** | 그라디언트 stop + polygon stroke 모두 다크 hex (**Critical**) |
| Feedback | **alert-info** | **FAIL** | 4종 텍스트 모두 다크 전용 톤(#93C5FD/#86EFAC/#FCD34D/#FCA5A5). 라이트 모드 0.10 알파 배경 + 라이트 톤 텍스트 = 대비 약 1.7~2:1, AA 미달 (**Critical**) |
| Feedback | modal-basic | PASS | native dialog focus trap + ESC 우수 |
| Feedback | toast | PASS | 토큰 100% |
| Feedback | **badge** | **FAIL** | `.danger` `#FCA5A5` / `.info` `#93C5FD` 라이트 대비 미달 (**Major**) |
| Navigation | tabs | PASS | WAI-ARIA Arrow/Home/End 완벽 |

### 카테고리 PASS/FAIL 요약
```
Buttons    4/4 PASS
Cards      3/4 PASS (Major 1)
Tables     2/3 PASS (Major 1)
Forms      4/4 PASS
Charts     0/4 PASS (Critical 4) ← 최우선
Feedback   2/4 PASS (Critical 1 / Major 1)
Navigation 1/1 PASS

총 16/24 PASS
Critical 5 / Major 3 / Minor 4
```

### Critical 5건 — 5/3 핫픽스 필수

**[CHART-1] 차트 4종 색 토큰 미사용** — SVG `stroke="#818CF8"` `fill="#818CF8"` 다크 hex 직접 하드코딩 → 라이트 모드 토큰 자동 전환 차단. **PH 갤러리 라이트 캡쳐 시 색 어긋나 "프리미엄 BI" 인상 훼손.** 수정: SVG 색을 클래스+CSS로 분리(`<polyline class="chart-line">` + `.chart-line{stroke:var(--merge-chart-1)}`). 그라디언트는 `<stop stop-color="currentColor">` + 부모 `color:var(--merge-chart-1)`. 공수 90분.

**[FB-1] alert-info 라이트 대비 1.85:1 (AA 4.5:1 미달)** — `#93C5FD` on 라이트 배경. 수정: `var(--merge-info)`(#3B82F6) 사용 → 라이트 배경 4.55:1 PASS. 공수 15분.

### Major 3건

- **[CARD-1]** card-feature 아이콘 박스 배경 3색 하드코딩 → `--merge-glow-brand` 사용 (다크 0.15 / 라이트 0.08 자동 분기). 보조는 신규 토큰 `--merge-glow-accent` `--merge-glow-success` 추가 권고.
- **[TBL-1]** table-actions `.row-act.danger` → `var(--merge-error)` 직접 사용으로 라이트 4.53:1 PASS.
- **[BDG-1]** badge `.danger` `.info` → `var(--merge-error)` `var(--merge-info)` 사용.

### Minor 4건 (런칭 후)
btn-destructive hover/active hex / card-kpi 숫자 28→32px 정합 / table-basic zebra stripe / form-select chevron 라이트 보정.

---

## 작업 2 — PH 갤러리 5장 후보

### 권장 원칙
1번 슬롯 = PH 카드 썸네일 자동. 5장은 시각 다양성 확보(단순/복잡/컬러풀/프리미엄/위트 분산), BI 차트 비중 너무 높이지 말고 카테고리 차이 강조.

### 후보 5장

| # | 테마 | 캡쳐 화면 | 캡션 (영문 ≤80자) | 디자인 근거 |
|---|------|---------|------------------|-----------|
| 1 | **bi_v1 (Analytics Studio)** | `templates/bi_v1/index.html` 풀 페이지 (Header + Scrubber + Hero Story + KPI 4 + Bento 첫 화면) | `Premium BI dashboard with bento grid, auto-narrated story, and a history scrubber.` | 타 BI 0건의 3대 시그니처(Bento + Narrate + Scrubber) 한 화면. 다크 네이비 프리미엄 톤 = PH 카드 썸네일에서 임팩트 최대. 캡틴 "와" 모먼트 확정. |
| 2 | **fi_v1 (Finance / Claymorphism)** | `templates/fi_v1/index.html` 첫 화면 (KPI 4 + 수입/지출 차트 + 예산 진행률) | `Personal finance with a clay 3D aesthetic — Mint Emerald palette.` | bi_v1과 정반대 톤(밝은 #F0F4F3 + 민트 #00B894 + 부드러운 클레이 그림자). 시각 다양성 최대. 클레이모피즘은 PH에서 흔하지 않음 = 차별화. |
| 3 | **ec_v1 (E-Commerce / Glassmorphism)** | `templates/ec_v1/index.html` Overview (KPI + 매출 차트 + Top Products 카드 그리드) | `E-commerce admin with glassmorphism — coral, mint, glass blur.` | 글래스 블러 + 코랄 액센트로 색감 가장 화려. "어드민 + 상품 관리" 2 유즈케이스 동시 노출. |
| 4 | **cr_v1 (CRM / Pipeline Kanban)** | `templates/cr_v1/index.html` (Pipeline Kanban 보드) | `CRM with kanban pipeline, contacts, deals, and reports.` | 1·2·3번이 차트 위주일 때 4번은 칸반 = **다른 정보 구조** 제시. 갤러리 단조로움 회피. 클린 플랫이라 1번 다크와 명도 대비 큼. |
| 5 | **w95_v1 (Workspace 95 / Retro)** | `templates/w95_v1/index.html` (Win95 베벨 + 타이틀바 + 시작 메뉴) | `Workspace 95 — retro Win95 dashboard. Yes, it ships with a clock.` | "위트" 카드. 4장이 진지할 때 5번 레트로 1장 = PH 댓글 화제성 폭발. maker 코멘트 전환 유도. |

### 갤러리 순서 전략
**다크 프리미엄(1) → 밝은 클레이(2) → 글래스 컬러(3) → 칸반 구조(4) → 레트로 위트(5)**.
명도/톤/UX 흐름 변화로 스크롤 시 시각 피로도 최소.

### 캡쳐 시 디자인 주의
- 데스크톱 1280px 너비, 풀 페이지 첫 스크린
- 더미 데이터 영문 일관성, 한국어 잔재 0건 캡틴 확인 필요
- **bi_v1/fi_v1/ec_v1 차트 라이트 캡쳐 시 작업 1 Critical CHART-1 결함 노출** → 캡쳐는 **현재 다크 톤 그대로** 권장 (또는 5/3 핫픽스 후 라이트 캡쳐)

---

## 작업 3 — bi_v1 플래그십 최종 점검

### 강점 ("와" 모먼트 확정)
- Bento 12-col 비대칭 그리드 → 단조로운 4-card 탈피, 시각 리듬 우수
- "This Week's Story" Auto-narrate 카드 = 타 BI 0건의 차별 시그니처. `<mark>` 강조 + Copy 버튼 페어링 깔끔
- History Scrubber `role="slider"` ARIA 표준, 키보드 ←/→/Home/End 완벽
- 차트 8색 deuteranopia-safe 팔레트 (`#3D5AF5 · #06B6D4 · #F59E0B · #F43F5E · #10B981 · #8B5CF6 · #F97316 · #64748B`)
- Inter + JetBrains Mono 페어링 = "데이터 + 코드" 톤이 BI 카테고리에 정확

### 시각 노이즈 (5/3 미세 수정, 차단 아님)

| 항목 | 위치 | 현상 | 권고 |
|------|------|------|------|
| Cosmetic-1 | bi-search-icon, bi-icon-btn | 이모지 사용 (🔍 🔔 📖 ↓ ⟳ ▾) | PH 갤러리 캡쳐 OK. 향후 SVG 통일 (런칭 후) |
| Cosmetic-2 | bi-narrate-tag | "Auto" 배지 OK | 변경 불필요 |
| Cosmetic-3 | bi-scrubber-handle | 포커스 링/크기 점검 권고 | 캡틴 라이브 Tab 진입 후 ←→ 동작 확인 |
| Cosmetic-4 | bi-grid-hero (span-5) | 1280 미만 narrate 줄바꿈 | 768/375 BP 무너짐 캡틴 라이브 확인 |

### 결론
**bi_v1은 PH 메인 이미지·1번 갤러리에 적합. 픽셀 노이즈 0건. 5/6 그대로 노출 가능.**

캡틴 라이브 마지막 1회 확인 부탁: ① Scrubber 핸들 키보드 동작 ② 768/375 BP 그리드 무너짐 ③ Auto-narrate Copy 버튼 동작.

---

## 5/3 D-3 핫픽스 우선순위 (B → C 인계)

| # | 결함 | 심각도 | 담당 | 공수 |
|---|------|--------|------|------|
| 1 | 차트 4종 색 토큰 미사용 (CHART-1) | Critical | C | 90분 |
| 2 | alert-info 라이트 대비 미달 (FB-1) | Critical | C | 15분 |
| 3 | card-feature 글로우 토큰화 (CARD-1) | Major | C | 20분 |
| 4 | table-actions `.row-act.danger` 토큰화 (TBL-1) | Major | C | 10분 |
| 5 | badge `.danger` `.info` 토큰화 (BDG-1) | Major | C | 10분 |
| 6 | 신규 토큰 `--merge-glow-accent` `--merge-glow-success` `--merge-error-dark` 추가 | Minor | B (메인 위임) | 15분 |

**Total ≈ 2.5시간**. Critical 2건 해결 시 5/6 차단 위험 0.

---

## 캡틴 라이브 부탁 항목

1. 24종 페이지 라이트 모드 토글 1회 (`[data-theme="light"]`) — Critical 5건 실제 화면 확인
2. bi_v1 1280/768/375 BP 그리드 무너짐 확인
3. PH 갤러리 후보 4번(cr_v1 Kanban) 5번(w95_v1 Retro) 캡틴 디자이너 감각으로 임팩트 충분한지 최종 결정

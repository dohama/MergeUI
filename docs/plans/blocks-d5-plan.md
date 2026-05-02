`# Blocks D-5 풀가동 명세서

> **작성일**: 2026-05-01 (D-5)
> **결정**: 캡틴 직접 승인 (B안 — 핵심 20–25개 풀가동 + 카피 "20+ growing weekly" 정직화)
> **마감**: 5/5 (D-1) 까지 QA 통과, 5/6 (D-day) 런칭 시 활성화
> **단일 출처**: 이 파일이 Blocks 풀가동의 모든 명세. 다른 곳 보지 말 것

---

## 🎯 목표

5/6 런칭 시점에 **20–25개 핵심 컴포넌트가 실제로 작동**하는 Blocks 라이브러리 활성화.

**활성화 정의**:
- `pages/public/components.html` 그리드에 20+ 카드 노출
- 각 카드 클릭 → `components-detail.html` 라이브 미리보기 + HTML/CSS 코드 복사 동작
- Pro 플랜 가입자는 모든 코드 보기 가능, Free는 5개만 (Free/Pro 배지로 구분)
- DB(`components` 테이블)에서 로드 — 정적 fallback 포함

---

## 📦 컴포넌트 카탈로그 (24종 목표)

### 1. Buttons (4종)
| Slug | 이름 | 배지 | 설명 |
|------|------|------|------|
| btn-primary | Primary Button | Free | 메인 CTA용 솔리드 버튼 |
| btn-secondary | Secondary Button | Free | 보조 동작 (outline) |
| btn-ghost | Ghost Button | Free | 텍스트형 미세 버튼 |
| btn-destructive | Destructive Button | Pro | 삭제·취소 등 위험 동작 |

### 2. Cards (4종)
| Slug | 이름 | 배지 | 설명 |
|------|------|------|------|
| card-kpi | KPI Card | Free | 큰 숫자 + 변화율 (대시보드 핵심) |
| card-metric | Metric Card | Pro | KPI + 미니 차트 |
| card-feature | Feature Card | Pro | 아이콘 + 제목 + 설명 |
| card-stat-row | Stat Row Card | Pro | 4 칸 통계 한 줄 |

### 3. Tables (3종)
| Slug | 이름 | 배지 | 설명 |
|------|------|------|------|
| table-basic | Basic Table | Free | 단순 헤더 + 행 |
| table-sortable | Sortable Table | Pro | 컬럼 정렬 가능 |
| table-actions | Actions Table | Pro | 행별 편집/삭제 버튼 |

### 4. Forms (4종)
| Slug | 이름 | 배지 | 설명 |
|------|------|------|------|
| form-input | Text Input | Free | 라벨 + 입력 + 도움말 |
| form-select | Select | Pro | 드롭다운 |
| form-checkbox | Checkbox Group | Pro | 다중 선택 |
| form-radio | Radio Group | Pro | 단일 선택 |

### 5. Charts (4종) — Chart.js 래퍼
| Slug | 이름 | 배지 | 설명 |
|------|------|------|------|
| chart-line | Line Chart | Pro | 시계열 데이터 |
| chart-bar | Bar Chart | Pro | 카테고리 비교 |
| chart-donut | Donut Chart | Pro | 분포 |
| chart-area | Area Chart | Pro | 누적 시계열 |

### 6. Feedback (4종)
| Slug | 이름 | 배지 | 설명 |
|------|------|------|------|
| alert-info | Alert / Info | Free | 안내 배너 (success/warning/error 4종 색) |
| modal-basic | Modal | Pro | 오버레이 다이얼로그 |
| toast | Toast | Pro | 우상단 알림 (자동 사라짐) |
| badge | Badge | Pro | 상태/카운트 표시 |

### 7. Navigation (1종)
| Slug | 이름 | 배지 | 설명 |
|------|------|------|------|
| tabs | Tabs | Pro | 키보드 탐색 가능 탭 |

**총 24종** (Free 5 / Pro 19) → 캡틴 카피 "20+ Components" 만족

---

## 🎨 B(디자인) 풀가동 명세 — 마감 5/2

### 산출물
1. `design/blocks-spec.md` — 24종 시각 명세서 (각 컴포넌트당 1섹션)
   - 토큰 사용 (`--merge-color-*`, `--merge-space-*`, `--merge-radius-*`)
   - 라이트/다크 동시 설계
   - 상태별 (default/hover/active/focus/disabled) 시각 차이
   - 8px 그리드 준수, 4.5:1 대비 이상

2. `design/blocks-preview-figma.md` (선택) — Figma 링크 또는 이미지 시안

### 핵심 원칙
- **각 카테고리 내부는 시각 일관성** (Buttons 4종은 같은 톤)
- **카테고리 간은 약간의 차별성** OK (Charts는 컬러 풍부, Feedback은 미니멀)
- 모든 컴포넌트 토큰 기반. 하드코딩 컬러 0건
- 다크모드 단순 색반전 금지 — 명도/채도 재설계

### 체크리스트
- [ ] WCAG AA (4.5:1) 모든 텍스트
- [ ] 8px 그리드 (4의 배수만)
- [ ] 24px×24px 아이콘 + 1.5px stroke
- [ ] 라이트/다크 동시 검증
- [ ] 키보드 포커스 링 명세
- [ ] 모바일 (375px / 768px / 1280px+) 동작 명세

---

## 💻 C(프론트) 풀가동 명세 — 마감 5/4

### 산출물
1. `pages/public/components.html` 정적 fallback 카드 24개 + DB 로드 분기
   - DB 비면 정적 시드 보여줌 (현재처럼 "No components yet" 빈 상태 금지)
   - 카드는 `comp-card` 클래스 재사용 (`feedback_component_reuse.md` 메모리)
   - Free/Pro 배지 명확히 구분

2. `pages/public/components-detail.html` 동작화
   - 4/29 F-04 지적: HTML/CSS 탭 전환 + Copy 버튼 + 파일명 불일치 처리
   - 4/29 C-9 지적: preview-toggle 핸들러 정의
   - 4/29 C-2 지적: 카테고리 active 갱신
   - 라이브 미리보기 iframe 또는 인라인 렌더링

3. `templates/blocks/{category}/{slug}.html` 24개 (각 컴포넌트 단독 HTML)
   - 의존성 최소: tokens.css만 import
   - 코드 복사 시 그대로 작동하는 형태
   - Chart.js는 CDN OR 정적 (4/29 C-13 — 외부 의존 줄이기 시도)

4. `src/js/components-loader.js` — DB 우선, 정적 fallback 로직 분리

### 체크리스트
- [ ] 정적 fallback 24개 모두 노출
- [ ] DB 시드 후 동적 데이터 우선 노출 (정적은 fallback)
- [ ] HTML/CSS 탭 전환 핸들러 작동
- [ ] Copy 버튼 클립보드 복사 + 토스트 알림
- [ ] Free 카드는 모든 코드 노출, Pro는 비로그인 시 "Sign up to unlock"
- [ ] 검색·카테고리 필터 동작 (4/29 C-11 키보드 접근성 포함)
- [ ] 반응형 (375/768/1280) 정상

---

## 🔍 E(QA) 풀가동 명세 — 마감 5/5

### 산출물
1. `docs/qa-reports/blocks-qa-2026-05-05.md` — 24종 검증 리포트

### 체크리스트 (각 컴포넌트당)
- [ ] 라이트/다크 모드 시각 정상
- [ ] 반응형 3 BP 정상
- [ ] 키보드 네비게이션 (Tab/Enter/Space/Arrow)
- [ ] 접근성 (ARIA 라벨, 포커스 링, 스크린리더)
- [ ] Copy 버튼 클릭 시 클립보드 복사 작동
- [ ] HTML/CSS 탭 전환 정상
- [ ] Pro/Free 배지 노출 정확
- [ ] 코드 복사 후 별도 환경에서 그대로 작동 (의존성 누락 0건)

### E2E 시나리오
1. 비로그인 → components.html → 카드 클릭 → Free는 코드 노출, Pro는 가입 유도
2. 가입 후 Free 플랜 → Pro 카드 클릭 → "Upgrade to unlock" CTA
3. Pro 플랜 → 모든 카드 코드 노출 + 복사 작동

---

## ⚙️ D(백엔드) 풀가동 명세 — 마감 5/5

### 산출물
1. `server/db/blocks-seed.sql` — 24종 INSERT 문
   - `components` 테이블 컬럼: slug / name / category / badge / description / preview_html / code_html / code_css / created_at
   - Free/Pro RLS 정책 검토 (Free는 누구나, Pro는 인증된 활성 구독자만)

2. `api/v1/components.js` — 컴포넌트 목록·상세 API (필요 시)
   - 또는 클라이언트에서 Supabase SDK로 직접 조회

### 체크리스트
- [ ] 24개 INSERT 무사 적용
- [ ] RLS 정책 Free/Pro 차등
- [ ] components.html에서 정상 로드

---

## 📅 일정 (D-5 → D-day)

| 일자 | 작업 | 담당 | 산출물 |
|------|------|------|--------|
| 5/1 (오늘) | 명세서 작성, 카피 정직화, master-todo 갱신 | A(메인) | 이 문서 |
| 5/2 | 24종 시각 명세 작성 | B | `design/blocks-spec.md` |
| 5/3~5/4 | 24종 HTML/CSS 코드 변환, components.html/detail.html 동작화 | C | 24개 HTML + 페이지 동작 |
| 5/5 | 24종 QA 검증 + DB 시드 적용 | E + D | QA 리포트 + 시드 SQL |
| 5/6 | 런칭 시 활성화 | 캡틴 | 라이브 |

**리스크 관리**:
- 양 욕심으로 퀄리티 무너지면 즉시 양 줄임 (24 → 20 → 18 순)
- B 시각 명세 5/2 마감 못 맞추면 C가 토큰 기반으로 자율 진행
- E QA에서 Critical 발견 시 D-1까지 핫픽스 우선

---

## 🚨 캡틴 명령 (절대 원칙)

1. "**런칭 후로 미루지 말 것**" — 약속 vs 실제 갭은 즉시 메우기 (메모리 `feedback_dont_defer_to_post_launch.md`)
2. "**와 수준 퀄리티**" — 양 욕심으로 퀄리티 무너지면 양 줄임 (메모리 `feedback_theme_quality.md`)
3. "**컴포넌트 재사용**" — 새 클래스 만들지 말고 기존 활용 (메모리 `feedback_component_reuse.md`)
4. "**합동 검증**" — 메인 종합 후 6명 합동 검증 거쳐야 캡틴 보고 (메모리 `feedback_qa_review.md`)

---

## 📎 참조

- 캡틴 카피 정직화 결과: `landing/index.html` Bento card "20+ Components" + Pro 플랜 "20+ components, growing weekly"
- 메모리: `project_blocks_product.md` (방향), `feedback_dont_defer_to_post_launch.md` (원칙), `feedback_theme_quality.md` (품질)
- 4/29 검증 리포트: `docs/qa-reports/launch-readiness-2026-04-29.md` (C-1, C-2, C-9, C-11 컴포넌트 결함)
- 마스터 TODO: `docs/plans/master-todo.md` (Blocks D-5 풀가동 1순위 섹션)

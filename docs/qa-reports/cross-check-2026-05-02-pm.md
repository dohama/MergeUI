# A(PM) 합동 검증 리포트 — 5/2 D-4

## 0. Executive Summary

| 심각도 | 본인 영역 (MD) | F 단일 출처 | E 일자 정합 | 합계 |
|--------|---------------|------------|------------|------|
| 🔴 Critical | 0 | 0 | 0 | **0** |
| 🟡 Major | 4 | 2 | 2 | **8** |
| 🟢 Minor | 6 | 3 | 1 | **10** |

**5/3~5/5 핫픽스 권고 5건**. 런칭 차단급 0건. GO 유지.

---

## 1. 본인 영역 (6개 MD) 자기 검증

| # | 파일 | 결함 | 등급 |
|---|------|------|------|
| A-01 | `master-todo.md` 99~128행 | "현재 상태 요약" 표가 4/29 D-7 시점 그대로. 5/2 처리분(BC-1~BC-5 해결, Admin UX 8건, JSON-LD, SEO 30건) 미반영. Critical/Major/Minor 카운트가 실제 상태와 불일치 | Major |
| A-02 | `master-todo.md` 410~411행 | "업데이트 이력" 표 마지막 항목이 2026-04-19. 4/21·4/29·5/1·5/2 4건 누락. **단일 출처 원칙 자체 위반** | Major |
| A-03 | `master-todo.md` 192~288행 | F-04(컴포넌트 상세 탭), F-07(OAuth) 등 5/2에 처리된 항목이 ❌ 미착수로 남아있음. C-1~C-13(4/29 발견)도 master-todo 본문에 통합 안 됨 | Major |
| A-04 | `ia-sitemap.md` 83행, 143~150행 | "전체 진행 현황 (2026-04-14 기준)" 표기가 본문에 그대로. 실제는 5/2 기준이고 about/refund 추가됨. 변경 이력 마지막이 4/14. **5/1·5/2 갱신 전혀 없음** | Major |
| A-05 | `ia-sitemap.md` 18행 | Nav 설명에 about 빠짐. 공개 페이지 라인업 18개 표기는 정합하나 사이트맵 트리 라인 35에서만 표기 | Minor |
| A-06 | `launch-plan-506.md` 696~716행 | "캡틴 즉시 결정 필요 6개" 중 4건은 이미 결정됨(가격, 홈페이지 범위, AI 공개, Hunter). 4/22 시점 미처리 표기 그대로 — 캡틴 혼동 위험 | Major |
| A-07 | `launch-plan-506.md` 654~683행 | "분야별 실행 순서" 4/27/5/1/5/4 일정이 4/22 작성 시점 그대로. **D-4 기준 갱신 0** | Minor |
| A-08 | `launch-plan-506.md` 720~724행 | 참조 문서에 `pricing-strategy.md` 링크 — 4/29 검증에서 가격 불일치 결함(A-5/A-6) 지적된 파일. 갱신 없이 인용 유지 | Minor |
| A-09 | `blocks-d5-plan.md` 1행 | 파일 첫 줄에 백틱(`) 1개가 잘못 들어가 있음 (마크다운 렌더링 깨짐) | Minor |
| A-10 | `blocks-d5-plan.md` 178~191행 | 일정표가 "5/3~5/4 C 작업, 5/5 E QA" 그대로. **실제로는 5/2에 모두 완료**(3일 앞당김). 본문 결과 미반영 | Minor |
| A-11 | `CLAUDE.md` 파일 구조 섹션 | 실제 파일 트리와 다수 불일치. about.html / refund.html / blocks-seed.sql / launch-prep-migration.sql / api/v1/_lib/csrf.js / src/js/sidebar-mobile.js·components-data.js·components-loader.js·admin-modal.js / templates/blocks/ 미반영 | Minor |
| A-12 | `project-history.md` | 4/29·5/1·5/2 일자별 기록 누락 없음. **합격** | — |

**핵심 관찰**: project-history.md만 정상. master-todo와 launch-plan은 4/29 검증 리포트(79건) 결과를 반영하지 않은 채 4/19~4/22 스냅샷이 그대로. 캡틴이 "잔여 P1/P2/P3"을 master-todo 단일 출처로 답변하기에 부적합 상태.

---

## 2. F 마케팅 단일 출처 위반 (CLAUDE.md 규칙 11)

| # | 결함 | 등급 |
|---|------|------|
| F-CC-01 | **PH 발사 시각 불일치** — product-hunt-launch-post / d-day-runbook / launch-social-posts 3개 일치 (KST 16:01). `launch-plan-506.md:483` Runbook은 "08:00 PH 업로드" 표기 잔존 (4/22 초안). master-todo도 캡틴 액션 P3 "5/6 KST 4pm~10pm" — **운영 윈도와 발사 시각 충돌 우려** | Major |
| F-CC-02 | **컴포넌트 수치 일치성** — 5개 마케팅 .md 모두 "20+ Components, growing weekly"로 통일 ✅. 단, `copy-package-2026-04-29.md:280` About 페이지 카피에 **"50 core components" 잔존**(이미 about.html에 적용됨). landing 정직화(20+)와 about(50) 충돌. **거짓 광고 리스크 재발** | Major |
| F-CC-03 | 가격 일치성 — Pro $19/mo · $149/yr · Early Bird $99/yr (50명) 5개 .md 모두 일치 ✅ | — |
| F-CC-04 | **PH 슬러그 미확정** — `launch-social-posts.md` `[PH_LINK]` 6곳 placeholder. d-day-runbook도 동일. 5/5 D-1 작업 명시는 있으나 master-todo 캡틴 액션에 누락 | Minor |
| F-CC-05 | `copy-package-2026-04-29.md:32~62`(F-1) testimonial 교체본과 실제 `landing/index.html` 적용 여부 본 검증에서 미확인. 카피 패키지 단독 출처 — 적용 결과 동기화 필요 | Minor |
| F-CC-06 | `launch-marketing-plan.md`(기존)와 5개 신규 .md 사이 Q&A 중복 점검 미실시 | Minor |

---

## 3. E QA 일자 정합성

| # | 결함 | 등급 |
|---|------|------|
| E-CC-01 | **파일명 vs 실제 작성일 불일치** — `blocks-qa-2026-05-05.md` 파일명은 5/5인데 본문 헤더 "작성 시작 2026-05-01 (D-5 베이스라인)" + 5절 "5/2 (D-4) E QA 검증 결과" + 6절 "5/2 D-4 최종 판정 GO". **실제 작성·갱신은 5/1~5/2에 완료**, 파일명만 D-1 마감일 기준 | Major |
| E-CC-02 | **launch-readiness-2026-04-29.md 79 결함 5/2 잔존 카운트 미갱신** — Critical 17건 중 D-2/D-3/D-4/D-5/D-9/D-10/C-1/C-3/C-4/E-1/E-3/E-9/B-1/E-4/E-6/F-1/F-2 모두 5/1~5/2 처리됨. 그러나 launch-readiness 본문은 4/29 시점 그대로 | Major |
| E-CC-03 | `blocks-qa-2026-05-05.md:201~205` "캡틴 잔여 액션" — Supabase SQL 실행은 master-todo P1에서 [x] 2026-05-02 완료로 표기됨. E QA 리포트는 미완 표기 잔존 | Minor |

---

## 4. 의견 충돌 (다른 에이전트 검증 시 충돌 예상)

1. **E vs A 컴포넌트 잔존 결함 카운트** — E는 5/2 GO 판정(blocks-qa), A는 master-todo Major 22건 잔존 표기. 캡틴 결정 필요
2. **F vs A "50 core components" 카피** — about.html은 F가 "50 core components" 카피로 신설(F-2). landing은 "20+ growing weekly" 정직화. F 내부 카피 충돌

---

## 5. 5/3~5/5 핫픽스 권고 (P1~P3)

**P1 (5/3 안에) — Major 5건**
1. `master-todo.md` 5/2 진행 반영: BC-1~BC-5, Admin UX 8건, F SEO 30건, F 마케팅 4 .md 신설을 본문 반영 + Critical/Major/Minor 표 5/2 기준 재집계 + 업데이트 이력에 4/21·4/29·5/1·5/2 4건 추가 (A 30분)
2. `launch-readiness-2026-04-29.md` 79건 → 5/2 잔존 카운트 갱신 (E 또는 A 20분). 또는 본문 상단에 "5/2 기준 갱신본은 blocks-qa-2026-05-05.md + project-history.md 5/1~5/2 항목 참조" 단일 출처 포인터 명시
3. `ia-sitemap.md` 진행 현황 표·변경 이력에 5/1·5/2 추가, "2026-04-14 기준" → "2026-05-02 기준" (A 10분)
4. `launch-plan-506.md` "캡틴 즉시 결정 6개" 중 4건 [x] 처리, 분야별 실행 순서 D-4 기준 재정렬 (A 20분)
5. **`copy-package-2026-04-29.md` about.html 카피 "50 core components" → "20+ components, growing weekly" 통일. 동시에 about.html 본문도 동일 교체** (F→C 10분). **거짓 광고 리스크 직결**

**P2 (5/4 안에) — Minor**
6. `blocks-qa-2026-05-05.md` 본문 첫 줄에 "이 파일은 5/1 작성·5/2 검증·5/5 라이브 픽셀 확정 예정" 명시 + 캡틴 잔여 액션 [x] 동기화
7. `CLAUDE.md` 파일 구조 섹션 5/2 실제 파일 반영 (A 15분)
8. `blocks-d5-plan.md` 1행 백틱 제거 + 일정표 5/2 완료 표기 (A 5분)

**P3 (5/5 안에) — 보강**
9. `launch-social-posts.md` `[PH_LINK]` 6곳 + d-day-runbook.md 슬러그 치환 절차를 master-todo 캡틴 P3에 신규 항목으로 추가 (A 5분)
10. `launch-plan-506.md` Runbook 발사 시각 "08:00 PH 업로드" → "16:01 KST PH 발사 (PST 0:01)" 4개 마케팅 .md와 통일 (A 5분)

---

## 종합 판정

- 런칭 차단급 Critical 0건 — 5/6 GO 유지에 영향 없음
- MD 정합성 자체는 Major 8건 / Minor 10건으로 불량
- **단일 출처라 자처한 master-todo가 정작 4/19 스냅샷에 머물러 있음**
- F 마케팅 4 .md 자체는 정합하나, **about.html "50 core components" vs landing "20+" 거짓 광고 리스크 1건**은 5/3 안에 즉시 조치 권고
- E QA 리포트 파일명-내용 일자 불일치는 캡틴이 파일명만 보고 답할 때 오답 위험

# MergeUi 랜딩페이지 — 전환 분석 & 체크리스트

> F(그로스 마케터) 작성 | 2026-04-16
> 분석 대상: landing/index.html

---

## 현재 상태 분석

### Above-the-fold (Hero 섹션)

| 요소 | 있음 | 품질 | 비고 |
|------|------|------|------|
| 헤드라인 | O | 좋음 | 명확한 가치 제안 |
| 서브헤드라인 | O | 좋음 | 개발자 페인포인트 직접 언급 |
| Primary CTA | O | 좋음 | "Get Started — Free" — 진입 장벽 낮춤 |
| Secondary CTA | O | 좋음 | "Browse Themes" — 탐색 경로 |
| 소셜 프루프 배지 | △ | 개선 필요 | "Now available — v1.0 launched" → 소셜 프루프 아님 |
| 시각적 데모 | O | 좋음 | 인터랙티브 대시보드 프리뷰 |
| 신뢰 지표 | X | 부재 | 사용자 수, 스타 수, 로고 바 없음 |

### 가격표 섹션

| 요소 | 있음 | 비고 |
|------|------|------|
| Free 티어 | O | $0 forever — 좋은 앵커 |
| Pro 강조 | O | "Most Popular" 뱃지 |
| 연간 가격 | X | 월간만 표시. 연간 할인 미노출 |
| 환불 보증 | △ | FAQ에만 언급, 가격표 근처에 없음 |

### GA4 이벤트 트래킹 누락

| 요소 | data-track | 상태 |
|------|-----------|------|
| Hero "Get Started — Free" | X | **누락** — 최고 가치 클릭 |
| Hero "Browse Themes" | X | **누락** |
| Nav "Get Started" | X | **누락** |
| Pricing Free CTA | O | 정상 |
| Pricing Pro CTA | O | 정상 |
| Final CTA 섹션 | X | **누락** |
| FAQ 아코디언 클릭 | X | **누락** |
| 테마 스와이퍼 인터랙션 | X | **누락** |

---

## 개선 권고사항

### P0 — Critical (런칭 전 필수)

1. **Hero CTA에 data-track 추가**: "Get Started — Free"와 "Browse Themes"에 GA4 이벤트 트래킹 필수
2. **Final CTA 섹션 트래킹 추가**: 하단 반복 CTA도 미추적
3. **og-image.png 파일 존재 확인**: OG 태그가 참조하는 이미지. 없으면 소셜 공유 시 깨짐
4. **연간 가격 토글 추가**: Monthly/Yearly 전환으로 연간 할인(35% 절약) 노출

### P1 — High (런칭 첫 주 내)

5. **Hero 배지를 실제 소셜 프루프로 교체**: "v1.0 launched" → "200+ developers signed up" 등
6. **가격표 근처에 14일 환불 보증 표시**: FAQ에만 있으면 구매 결정 시점에 영향력 없음
7. **JSON-LD 구조화 데이터 추가**: Product + FAQ 스키마로 구글 리치 스니펫 확보
8. **Nav CTA 트래킹 추가**: 모든 스크롤 위치에서 보이는 CTA

### P2 — Medium (런칭 첫 달 내)

9. **실제 고객/회사 로고 추가**: 프레임워크 마키 대신 사용 기업 로고
10. **Hero에 데모 영상/GIF 추가**: 다크모드 전환 등 동적 프리뷰
11. **연간 절약률 표시**: "Save 35%" 라벨
12. **FAQ 클릭 트래킹**: 방문자 이의 사항 파악 가능
13. **Footer 소셜 링크 수정**: 현재 모두 `#`(플레이스홀더)

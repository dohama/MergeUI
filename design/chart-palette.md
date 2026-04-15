# MergeUi 차트 팔레트 — Deuteranopia-Safe 8색

> B(디자인 디렉터) 작성 | 2026-04-16
> 색약(특히 적록 색약) 대응, 명도 차이 + 색조 간격 극대화

---

## 라이트 모드

| # | Name | HEX | RGB | 용도 |
|---|------|-----|-----|------|
| 1 | Indigo | `#6366F1` | 99, 102, 241 | Primary data series |
| 2 | Cyan | `#06B6D4` | 6, 182, 212 | Secondary data |
| 3 | Amber | `#F59E0B` | 245, 158, 11 | Comparison / highlight |
| 4 | Rose | `#F43F5E` | 244, 63, 94 | Alert / negative |
| 5 | Emerald | `#10B981` | 16, 185, 129 | Positive / growth |
| 6 | Violet | `#8B5CF6` | 139, 92, 246 | Tertiary data |
| 7 | Orange | `#F97316` | 249, 115, 22 | Supplementary |
| 8 | Slate | `#64748B` | 100, 116, 139 | Neutral / baseline |

## 다크 모드 (채도 +10%, 명도 +5% 보정)

| # | Name | HEX | RGB |
|---|------|-----|-----|
| 1 | Indigo | `#818CF8` | 129, 140, 248 |
| 2 | Cyan | `#22D3EE` | 34, 211, 238 |
| 3 | Amber | `#FBBF24` | 251, 191, 36 |
| 4 | Rose | `#FB7185` | 251, 113, 133 |
| 5 | Emerald | `#34D399` | 52, 211, 153 |
| 6 | Violet | `#A78BFA` | 167, 139, 250 |
| 7 | Orange | `#FB923C` | 251, 146, 60 |
| 8 | Slate | `#94A3B8` | 148, 163, 184 |

---

## 색약 대응 원리

- 인접 색상 간 명도(luminance) 차이 최소 15% 확보
- 적(Red)과 녹(Green)을 직접 인접 배치하지 않음
- Indigo-Cyan-Amber 3색만으로도 구분 가능 (핵심 데이터용)
- 패턴(점선/대시) 병용 권장: 색상만으로 구분이 어려운 사용자 대비

## CSS 변수

```css
:root {
  --pulse-chart-1: #6366F1;
  --pulse-chart-2: #06B6D4;
  --pulse-chart-3: #F59E0B;
  --pulse-chart-4: #F43F5E;
  --pulse-chart-5: #10B981;
  --pulse-chart-6: #8B5CF6;
  --pulse-chart-7: #F97316;
  --pulse-chart-8: #64748B;
}

[data-theme="dark"] {
  --pulse-chart-1: #818CF8;
  --pulse-chart-2: #22D3EE;
  --pulse-chart-3: #FBBF24;
  --pulse-chart-4: #FB7185;
  --pulse-chart-5: #34D399;
  --pulse-chart-6: #A78BFA;
  --pulse-chart-7: #FB923C;
  --pulse-chart-8: #94A3B8;
}
```

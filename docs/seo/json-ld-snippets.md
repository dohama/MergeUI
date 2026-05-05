# JSON-LD 구조화 데이터 스니펫

- **작성**: F(그로스) · 2026-04-29
- **목적**: 검색엔진(Google, Bing)이 MergeUi의 제품/가격/소프트웨어 정보를 리치 결과로 표시하도록 함
- **적용 대상**: C(프론트)가 각 페이지 `<head>` 영역 마지막에 `<script type="application/ld+json">` 형태로 삽입
- **검증**: 배포 후 [Google Rich Results Test](https://search.google.com/test/rich-results)로 통과 여부 확인 필수

---

## 1) SoftwareApplication — 전체 사이트 (랜딩페이지 `landing/index.html`)

> **삽입 위치**: `<head>` 끝 (기존 OG 태그 바로 아래)
> **목적**: "MergeUi"라는 소프트웨어 제품 자체를 정의. 사이트 메인에만 1회 삽입.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "MergeUi",
  "applicationCategory": "DeveloperApplication",
  "applicationSubCategory": "UI Templates",
  "operatingSystem": "Web",
  "description": "Production-ready dashboard templates in pure HTML, CSS, and Tailwind. Framework-agnostic. Dark mode and full responsive support included.",
  "url": "https://mergeui.com/",
  "image": "https://mergeui.com/assets/og-image.png",
  "author": {
    "@type": "Organization",
    "name": "MergeUi",
    "url": "https://mergeui.com/"
  },
  "offers": {
    "@type": "Offer",
    "price": "19.00",
    "priceCurrency": "USD",
    "priceValidUntil": "2027-04-29",
    "availability": "https://schema.org/InStock",
    "url": "https://mergeui.com/pages/public/pricing.html"
  },
  "softwareVersion": "1.0",
  "datePublished": "2026-05-06"
}
</script>
```

---

## 2) Product + Offer — 가격표 페이지 (`pages/public/pricing.html`)

> **삽입 위치**: 가격표 페이지 `<head>` 끝
> **목적**: Pro 플랜의 월간/연간 가격을 검색 결과에 가격 정보로 노출
> **참고**: Early Bird($99/yr 50명 한정)는 한정 수량이므로 정식 Offer로 등록하지 않고 랜딩 카피로만 노출

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "MergeUi Pro",
  "description": "All dashboard themes, components growing weekly, all accent color presets, monthly new themes, and priority support. Commercial license included.",
  "brand": {
    "@type": "Brand",
    "name": "MergeUi"
  },
  "image": "https://mergeui.com/assets/og-image.png",
  "offers": [
    {
      "@type": "Offer",
      "name": "Pro Monthly",
      "price": "19.00",
      "priceCurrency": "USD",
      "url": "https://mergeui.lemonsqueezy.com/checkout/buy/b9d4acab-7b2d-42c7-9bbd-ed4f745769ca",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "19.00",
        "priceCurrency": "USD",
        "billingDuration": "P1M",
        "billingIncrement": 1
      }
    },
    {
      "@type": "Offer",
      "name": "Pro Annual",
      "price": "149.00",
      "priceCurrency": "USD",
      "url": "https://mergeui.com/pages/public/pricing.html",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "149.00",
        "priceCurrency": "USD",
        "billingDuration": "P1Y",
        "billingIncrement": 1
      }
    }
  ]
}
</script>
```

---

## 3) Product (Theme) — 테마 상세 페이지 (`pages/themes/detail.html`)

> **삽입 위치**: 테마 상세 페이지 `<head>` 끝
> **목적**: 각 테마(Business Intelligence, E-Commerce 등)를 개별 Product로 등록 → 테마별 검색 노출
> **C 작업 시 주의**: 아래 `{{ }}` 자리표시자는 페이지 데이터에서 동적으로 치환

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{ THEME_NAME }}",
  "description": "{{ THEME_DESCRIPTION }}",
  "image": "{{ THEME_PREVIEW_IMAGE_URL }}",
  "brand": {
    "@type": "Brand",
    "name": "MergeUi"
  },
  "category": "Dashboard Template",
  "url": "{{ THEME_DETAIL_URL }}",
  "offers": {
    "@type": "Offer",
    "price": "19.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://mergeui.com/pages/public/pricing.html",
    "seller": {
      "@type": "Organization",
      "name": "MergeUi"
    }
  }
}
</script>
```

**자리표시자 예시 (bi_v1 기준)**:
- `THEME_NAME`: "Business Intelligence Dashboard"
- `THEME_DESCRIPTION`: "Data-rich BI dashboard template with charts, KPIs, and analytics widgets. Dark mode included."
- `THEME_PREVIEW_IMAGE_URL`: `https://mergeui.com/templates/bi_v1/preview.png`
- `THEME_DETAIL_URL`: `https://mergeui.com/pages/themes/detail.html?slug=bi_v1`

---

## 4) Organization — 푸터/About 페이지

> **삽입 위치**: About 페이지 `<head>` 끝 (1회만)
> **목적**: 브랜드 엔티티 등록 → 검색 결과 사이드 패널(Knowledge Panel) 후보

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MergeUi",
  "url": "https://mergeui.com/",
  "logo": "https://mergeui.com/assets/logo.png",
  "description": "Dashboard UI templates for developers who ship.",
  "sameAs": [
    "https://twitter.com/mergeui",
    "https://github.com/mergeui"
  ]
}
</script>
```

---

## 검증 체크리스트 (E에게 전달)

- [ ] 각 스니펫을 [Schema Markup Validator](https://validator.schema.org/)에서 통과
- [ ] [Rich Results Test](https://search.google.com/test/rich-results)에서 "Eligible for rich results" 표시 확인
- [ ] `priceValidUntil` 날짜는 1년 후로 갱신 필요 (런칭 후 자동화 권장)
- [ ] 테마 상세 페이지의 `{{ }}` 자리표시자가 모두 실제 값으로 치환되었는지 확인
- [ ] 한 페이지에 같은 `@type` 스니펫 중복 금지 (Google이 무시함)

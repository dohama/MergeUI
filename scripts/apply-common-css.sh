#!/bin/bash
# OozeUi — 공통 CSS/JS 링크 삽입 스크립트
# 각 HTML 파일의 <style> 태그 바로 앞에 외부 CSS 링크를 추가하고
# </body> 앞에 auth.js를 추가합니다.

BASE="c:/Users/ekdma/OneDrive/바탕화~1-DESIGN-PC1-8560127/Claude/Agent_Test"

# Auth pages (tokens + reset only, no nav, no auth.js)
AUTH_PAGES=(
  "pages/auth/login.html"
  "pages/auth/signup.html"
  "pages/auth/forgot-password.html"
  "pages/auth/reset-password.html"
  "pages/auth/verify-email.html"
)

# Checkout pages (tokens + reset + nav + auth.js)
CHECKOUT_PAGES=(
  "pages/checkout/success.html"
  "pages/checkout/cancel.html"
)

# Public pages with nav (tokens + reset + nav + auth.js)
PUBLIC_PAGES=(
  "landing/index.html"
  "pages/themes/index.html"
  "pages/themes/detail.html"
  "pages/themes/download.html"
  "pages/public/components.html"
  "pages/public/components-detail.html"
  "pages/public/pricing.html"
  "pages/public/docs.html"
  "pages/public/changelog.html"
  "pages/public/contact.html"
  "pages/public/404.html"
  "pages/public/500.html"
  "pages/public/maintenance.html"
  "pages/legal/terms.html"
  "pages/legal/privacy.html"
)

# Preview page (tokens + reset only, no nav)
PREVIEW_PAGES=(
  "pages/themes/preview.html"
)

# Subscriber pages (tokens + reset + sidebar + auth.js)
SUBSCRIBER_PAGES=(
  "pages/subscriber/dashboard.html"
  "pages/subscriber/library.html"
  "pages/subscriber/downloads.html"
  "pages/subscriber/settings.html"
  "pages/subscriber/billing.html"
)

# Admin pages (tokens + reset + sidebar + auth.js)
ADMIN_PAGES=(
  "pages/admin/dashboard.html"
  "pages/admin/subscribers.html"
  "pages/admin/orders.html"
  "pages/admin/themes.html"
  "pages/admin/components.html"
  "pages/admin/releases.html"
  "pages/admin/inquiries.html"
  "pages/admin/analytics.html"
  "pages/admin/settings.html"
)

echo "=== OozeUi CSS/JS Link Injection ==="
echo ""

# Function to add CSS links before <style> tag
add_css_links() {
  local file="$1"
  shift
  local links="$@"

  # Check if already has tokens.css
  if grep -q "tokens.css" "$file"; then
    echo "  SKIP (already has tokens.css): $file"
    return
  fi

  # Insert before first <style> tag
  sed -i "0,/<style>/s|<style>|${links}\n  <style>|" "$file"
  echo "  CSS added: $file"
}

# Function to add auth.js before </body>
add_auth_js() {
  local file="$1"
  local path="$2"

  # Check if already has auth.js
  if grep -q "auth.js" "$file"; then
    echo "  SKIP auth.js (already exists): $file"
    return
  fi

  sed -i "s|</body>|<script src=\"${path}src/js/auth.js\"></script>\n</body>|" "$file"
  echo "  auth.js added: $file"
}

echo "--- Auth pages (tokens + reset) ---"
for f in "${AUTH_PAGES[@]}"; do
  fp="$BASE/$f"
  links='<link rel="stylesheet" href="../../src/styles/tokens.css">\n  <link rel="stylesheet" href="../../src/styles/reset.css">'
  add_css_links "$fp" "$links"
done

echo ""
echo "--- Checkout pages (tokens + reset + nav + auth.js) ---"
for f in "${CHECKOUT_PAGES[@]}"; do
  fp="$BASE/$f"
  links='<link rel="stylesheet" href="../../src/styles/tokens.css">\n  <link rel="stylesheet" href="../../src/styles/reset.css">\n  <link rel="stylesheet" href="../../src/styles/nav.css">'
  add_css_links "$fp" "$links"
  add_auth_js "$fp" "../../"
done

echo ""
echo "--- Public pages (tokens + reset + nav + auth.js) ---"
for f in "${PUBLIC_PAGES[@]}"; do
  fp="$BASE/$f"
  if [[ "$f" == "landing/index.html" ]]; then
    links='<link rel="stylesheet" href="src/styles/tokens.css">\n  <link rel="stylesheet" href="src/styles/reset.css">\n  <link rel="stylesheet" href="src/styles/nav.css">'
    add_css_links "$fp" "$links"
    add_auth_js "$fp" ""
  else
    links='<link rel="stylesheet" href="../../src/styles/tokens.css">\n  <link rel="stylesheet" href="../../src/styles/reset.css">\n  <link rel="stylesheet" href="../../src/styles/nav.css">'
    add_css_links "$fp" "$links"
    add_auth_js "$fp" "../../"
  fi
done

echo ""
echo "--- Preview page (tokens + reset only) ---"
for f in "${PREVIEW_PAGES[@]}"; do
  fp="$BASE/$f"
  links='<link rel="stylesheet" href="../../src/styles/tokens.css">\n  <link rel="stylesheet" href="../../src/styles/reset.css">'
  add_css_links "$fp" "$links"
done

echo ""
echo "--- Subscriber pages (tokens + reset + sidebar + auth.js) ---"
for f in "${SUBSCRIBER_PAGES[@]}"; do
  fp="$BASE/$f"
  links='<link rel="stylesheet" href="../../src/styles/tokens.css">\n  <link rel="stylesheet" href="../../src/styles/reset.css">\n  <link rel="stylesheet" href="../../src/styles/sidebar.css">'
  add_css_links "$fp" "$links"
  add_auth_js "$fp" "../../"
done

echo ""
echo "--- Admin pages (tokens + reset + sidebar + auth.js) ---"
for f in "${ADMIN_PAGES[@]}"; do
  fp="$BASE/$f"
  links='<link rel="stylesheet" href="../../src/styles/tokens.css">\n  <link rel="stylesheet" href="../../src/styles/reset.css">\n  <link rel="stylesheet" href="../../src/styles/sidebar.css">'
  add_css_links "$fp" "$links"
  add_auth_js "$fp" "../../"
done

echo ""
echo "=== Done! ==="

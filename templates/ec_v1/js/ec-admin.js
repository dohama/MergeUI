/* ============================================
   E-Commerce Admin v1 - Interactions
   ============================================ */

(function () {
  "use strict";

  /* ── Mobile Menu ── */
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".mobile-menu .close-btn");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function () {
      mobileMenu.classList.add("open");
    });
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
      });
    }
    mobileMenu.addEventListener("click", function (e) {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove("open");
      }
    });
  }

  /* ── Filter Buttons ── */
  document.querySelectorAll(".filters").forEach(function (filterGroup) {
    var buttons = filterGroup.querySelectorAll(".filter-btn");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var filter = btn.getAttribute("data-filter");
        applyFilter(filter);
      });
    });
  });

  function applyFilter(filter) {
    var rows = document.querySelectorAll("[data-status]");
    rows.forEach(function (row) {
      if (filter === "all" || row.getAttribute("data-status") === filter) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });

    var cards = document.querySelectorAll("[data-category]");
    cards.forEach(function (card) {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  /* ── Search ── */
  var searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      var query = searchInput.value.toLowerCase();
      var rows = document.querySelectorAll(".glass-table tbody tr");
      rows.forEach(function (row) {
        var text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? "" : "none";
      });
    });
  }

  /* ── Populate KPI Cards ── */
  function populateKPI() {
    var kpiCards = document.querySelectorAll("[data-kpi]");
    kpiCards.forEach(function (card) {
      var key = card.getAttribute("data-kpi");
      var kpi = EC_DATA.kpi[key];
      if (!kpi) return;
      var valueEl = card.querySelector(".kpi-value");
      var changeEl = card.querySelector(".kpi-change");
      if (valueEl) valueEl.textContent = kpi.value;
      if (changeEl) {
        changeEl.textContent = kpi.change;
        changeEl.className = "kpi-change " + kpi.direction;
      }
    });
  }

  /* ── Populate Tables ── */
  function populateOrdersTable() {
    var tbody = document.querySelector("#orders-table-body");
    if (!tbody) return;
    tbody.innerHTML = "";
    EC_DATA.orders.forEach(function (order) {
      var statusClass = {
        "Delivered": "badge-success",
        "Shipped": "badge-info",
        "Processing": "badge-warning",
        "Cancelled": "badge-error"
      }[order.status] || "badge-info";

      var tr = document.createElement("tr");
      tr.setAttribute("data-status", order.status.toLowerCase());
      tr.innerHTML =
        "<td>" + order.id + "</td>" +
        "<td>" + order.customer + "</td>" +
        "<td>" + order.amount + "</td>" +
        "<td><span class=\"badge " + statusClass + "\">" + order.status + "</span></td>" +
        "<td>" + order.date + "</td>";
      tbody.appendChild(tr);
    });
  }

  function populateCustomersTable() {
    var tbody = document.querySelector("#customers-table-body");
    if (!tbody) return;
    tbody.innerHTML = "";
    EC_DATA.customers.forEach(function (c) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" + c.name + "</td>" +
        "<td>" + c.email + "</td>" +
        "<td>" + c.orders + "</td>" +
        "<td>" + c.spent + "</td>" +
        "<td>" + c.joined + "</td>";
      tbody.appendChild(tr);
    });
  }

  /* ── Populate Product Cards ── */
  function populateProducts() {
    var grid = document.querySelector("#product-grid");
    if (!grid) return;
    grid.innerHTML = "";
    EC_DATA.products.forEach(function (p) {
      var card = document.createElement("article");
      card.className = "glass-card product-card";
      card.setAttribute("data-category", p.category.toLowerCase());
      card.innerHTML =
        "<div class=\"product-img\" aria-hidden=\"true\">" + p.emoji + "</div>" +
        "<div class=\"product-name\">" + p.name + "</div>" +
        "<div class=\"product-category\">" + p.category + "</div>" +
        "<div class=\"product-meta\">" +
          "<span class=\"product-price\">" + p.price + "</span>" +
          "<span class=\"product-stock\">" + p.stock + " in stock</span>" +
        "</div>";
      grid.appendChild(card);
    });
  }

  /* ── Populate Rank List ── */
  function populateRankList() {
    var list = document.querySelector("#top-products-list");
    if (!list) return;
    list.innerHTML = "";
    EC_DATA.topProducts.forEach(function (p, i) {
      var li = document.createElement("li");
      li.className = "rank-item";
      li.innerHTML =
        "<span class=\"rank-num\">" + (i + 1) + "</span>" +
        "<span class=\"rank-name\">" + p.name + "</span>" +
        "<span class=\"rank-value\">" + p.sales + " sold</span>";
      list.appendChild(li);
    });
  }

  /* ── Init ── */
  populateKPI();
  populateOrdersTable();
  populateCustomersTable();
  populateProducts();
  populateRankList();

})();

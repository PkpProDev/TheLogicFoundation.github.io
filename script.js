/* =========================================================================
   CONFIG — replace every value in this block with your own details.
   Nothing below this block needs to change for basic customisation.
========================================================================= */
const CONFIG = {
  upiId: "yourname@upi",           // e.g. "roshnifoundation@okhdfcbank"
  orgNameForUpi: "Roshni Foundation",

  usdtTrc20: "TXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  btcAddress: "bc1qxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  ethAddress: "0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  binancePayId: "123456789",

  peopleReached: "12,400+",
};

/* =========================================================================
   ARTICLES — add, remove, or edit entries here. Each one becomes a card
   and a modal automatically. "body" accepts basic HTML (paragraphs, etc).
========================================================================= */
const ARTICLES = [
  {
    id: "school-kits-2026",
    category: "Education",
    title: "620 school kits delivered before the monsoon",
    date: "August 2026",
    excerpt: "How we timed distribution around the exam calendar in three districts.",
    body: `
      <p>Between June and August we delivered 620 school kits — notebooks,
      a geometry box, and a raincoat — to children across three districts.
      Timing mattered more than we expected: delivering before the monsoon
      meant fewer kits ruined on the walk to school.</p>
      <p>Total spend: ₹4,10,000. Cost per kit: ₹661, including transport.
      Full receipts are in the public ledger linked from the donate section.</p>
    `
  },
  {
    id: "midday-meal-audit",
    category: "Nutrition",
    title: "What a surprise kitchen audit actually looks like",
    date: "July 2026",
    excerpt: "We visited five kitchens unannounced. Here's what we found.",
    body: `
      <p>Unannounced visits are the only way to see a programme as it
      actually runs, not as it's described in a report. Across five
      kitchens, four met our hygiene checklist on first visit; one didn't,
      and we've since replaced the water filter there.</p>
      <p>We're publishing this partly to hold ourselves accountable, and
      partly because we think more nonprofits should show the messy middle,
      not just the good photos.</p>
    `
  },
  {
    id: "why-we-publish-ledger",
    category: "Transparency",
    title: "Why every donation gets logged in public",
    date: "May 2026",
    excerpt: "The case for showing donors exactly where their money went.",
    body: `
      <p>Most nonprofits publish an annual report. We publish a running
      ledger instead — updated whenever a donation comes in and again when
      it's spent. It's more work, but it means a ₹500 UPI donation is just
      as visible as a large grant.</p>
    `
  },
  {
    id: "winter-drive-recap",
    category: "Nutrition",
    title: "The winter nutrition drive, in numbers",
    date: "February 2026",
    excerpt: "1,180 families, 40 days, one supply chain problem we didn't see coming.",
    body: `
      <p>We budgeted for 1,000 families and ended up reaching 1,180, partly
      because a local mill donated wheat flour at cost once they heard what
      we were doing. The bottleneck wasn't funding — it was storage space.</p>
    `
  },
  {
    id: "volunteer-onboarding",
    category: "Education",
    title: "Redesigning volunteer onboarding after it kept failing",
    date: "January 2026",
    excerpt: "Three iterations later, retention past week one finally improved.",
    body: `
      <p>Our first onboarding process lost most new volunteers within a
      week. We rebuilt it around one principle: give people a real task on
      day one, not a slideshow. Retention past week one went from roughly
      30% to 70%.</p>
    `
  },
  {
    id: "crypto-donations-explainer",
    category: "Transparency",
    title: "Why we started accepting crypto donations",
    date: "November 2025",
    excerpt: "A plain explanation for donors who've never sent USDT before.",
    body: `
      <p>A portion of our international donors found bank transfers slow
      and PayPal's fees high. Accepting USDT and BTC directly cut both the
      delay and the cut taken before funds reach us. If you've never sent
      crypto before, our Telegram is the fastest way to ask questions.</p>
    `
  },
];

/* =========================================================================
   RENDER: category bar + article grid
========================================================================= */
const grid = document.getElementById("articleGrid");
const catBar = document.getElementById("categoryBar");
const categories = ["All", ...new Set(ARTICLES.map(a => a.category))];

function renderCategoryBar(active){
  catBar.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "cat-btn" + (cat === active ? " active" : "");
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      renderCategoryBar(cat);
      renderGrid(cat);
    });
    catBar.appendChild(btn);
  });
}

function renderGrid(filter){
  grid.innerHTML = "";
  const list = filter === "All" ? ARTICLES : ARTICLES.filter(a => a.category === filter);
  list.forEach(article => {
    const card = document.createElement("article");
    card.className = "article-card";
    card.innerHTML = `
      <p class="article-cat">${article.category}</p>
      <h3>${article.title}</h3>
      <p class="article-excerpt">${article.excerpt}</p>
      <p class="article-meta">${article.date}</p>
    `;
    card.addEventListener("click", () => openArticle(article));
    grid.appendChild(card);
  });
}

renderCategoryBar("All");
renderGrid("All");

document.getElementById("statPeople").textContent = CONFIG.peopleReached;
document.getElementById("statArticles").textContent = ARTICLES.length;
document.getElementById("year").textContent = new Date().getFullYear();

/* =========================================================================
   ARTICLE MODAL
========================================================================= */
const modal = document.getElementById("articleModal");
const modalClose = document.getElementById("modalClose");

function openArticle(article){
  document.getElementById("modalCategory").textContent = article.category;
  document.getElementById("modalTitle").textContent = article.title;
  document.getElementById("modalMeta").textContent = article.date;
  document.getElementById("modalBody").innerHTML = article.body;

  // Tell giscus which article thread to load, so each article gets its
  // own comment section instead of sharing one global thread.
  const giscusScript = document.querySelector(".giscus-script");
  if (giscusScript) giscusScript.setAttribute("data-term", article.id);

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeArticle(){
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeArticle);
modal.addEventListener("click", e => { if (e.target === modal) closeArticle(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeArticle(); });

/* =========================================================================
   MOBILE NAV
========================================================================= */
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
navToggle.addEventListener("click", () => mainNav.classList.toggle("open"));
mainNav.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => mainNav.classList.remove("open"))
);

/* =========================================================================
   DONATE TABS
========================================================================= */
const donateTabs = document.querySelectorAll(".donate-tab");
donateTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    donateTabs.forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected","false"); });
    document.querySelectorAll(".donate-panel").forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    tab.setAttribute("aria-selected","true");
    document.getElementById("panel-" + tab.dataset.target).classList.add("active");
  });
});

/* =========================================================================
   QR CODES — generated on the fly via a free QR-image API, so you never
   have to create or upload a QR image yourself. Just fill in CONFIG above.
========================================================================= */
function qrUrl(data, size = 220){
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
}

const upiUri = `upi://pay?pa=${CONFIG.upiId}&pn=${encodeURIComponent(CONFIG.orgNameForUpi)}&cu=INR`;
document.getElementById("qrUPI").src = qrUrl(upiUri);
document.getElementById("upiIdText").textContent = CONFIG.upiId;

document.getElementById("qrUSDT").src = qrUrl(CONFIG.usdtTrc20, 180);
document.getElementById("usdtAddrText").textContent = CONFIG.usdtTrc20;

document.getElementById("qrBTC").src = qrUrl(CONFIG.btcAddress, 180);
document.getElementById("btcAddrText").textContent = CONFIG.btcAddress;

document.getElementById("qrETH").src = qrUrl(CONFIG.ethAddress, 180);
document.getElementById("ethAddrText").textContent = CONFIG.ethAddress;

document.getElementById("binancePayText").textContent = CONFIG.binancePayId;

/* =========================================================================
   COPY BUTTONS
========================================================================= */
document.querySelectorAll(".copy-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.copy);
    navigator.clipboard.writeText(target.textContent.trim()).then(() => {
      const original = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = original), 1500);
    });
  });
});

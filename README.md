# Roshni Foundation Website — Setup Guide

3 files hain: `index.html`, `style.css`, `script.js`. Teeno ek hi folder mein rakhna, order matter nahi karta.

## Step 1 — GitHub par daalo (GitHub Pages)

1. github.com par naya **public** repo banao (e.g. `myfoundation-site`).
2. Teeno files (`index.html`, `style.css`, `script.js`) us repo mein upload kar do — GitHub web UI pe "Add file → Upload files" se bhi ho jayega, terminal ki zaroorat nahi.
3. Repo ke **Settings → Pages** mein jao. Source mein "Deploy from a branch" chuno, branch = `main`, folder = `/root`. Save.
4. 1-2 minute mein site live ho jayegi is URL par: `https://yourusername.github.io/myfoundation-site/`

## Step 2 — Apni details daalo (script.js file kholo)

File ke top par `CONFIG` object hai. Ye values replace karo:

- `upiId` → apna UPI ID (e.g. `foundation@okhdfcbank`)
- `usdtTrc20`, `btcAddress`, `ethAddress` → apne crypto wallet addresses
- `binancePayId` → Binance app → Wallet → Pay se milega
- `peopleReached` → koi bhi number jo dikhana chahte ho

UPI aur crypto ke QR codes **apne aap ban jayenge** — koi QR banane ki zaroorat nahi, script khud generate karta hai address se.

## Step 3 — Articles add/edit karo (script.js file mein hi)

`ARTICLES` array mein har article ek object hai:
```js
{
  id: "unique-id-no-spaces",
  category: "Education",
  title: "...",
  date: "...",
  excerpt: "...",
  body: `<p>Full article HTML yahan</p>`
}
```
Naya article add karna ho to bas ek naya object array mein add kar do, comma ke saath. Category apne aap filter bar mein aa jayegi.

## Step 4 — Comments on karo (giscus — GitHub Discussions)

1. Apne repo ke **Settings → General → Features** mein "Discussions" ka checkbox on karo.
2. https://giscus.app par jao. Apna repo name daalo, ek Discussion category chuno (e.g. "Comments" naam se naya bana lo).
3. Site niche ek `<script>` tag generate karegi jisme tumhare real `data-repo`, `data-repo-id`, `data-category-id` values honge.
4. `index.html` mein niche wala block dhundo aur poora replace kar do us naye script tag se:
```html
<div id="giscusContainer">
  <script class="giscus-script" ... ></script>
</div>
```
Bas itna karne se har article ka apna alag comment thread ban jayega automatically.

## Step 5 — Email subscribe on karo (Formspree)

1. https://formspree.io par free account banao, naya form create karo.
2. Wo tumhe ek Form ID dega (e.g. `xdkopqrs`).
3. `index.html` mein `YOUR_FORM_ID` dhundo (subscribe form ke andar) aur replace kar do.

## Step 6 — Telegram DM link

`index.html` mein 2 jagah `YOUR_TELEGRAM_USERNAME` likha hai (find-and-replace kar dena) — ek contact section mein, ek floating button (✈) mein niche-right corner.

## Step 7 — International donation links

`index.html` ke Donate section mein:
- PayPal: `https://paypal.me/yourorg` → apna asli PayPal.me link daalo (paypal.me par free banta hai).
- Stripe: `https://donate.stripe.com/your-link` → Stripe account se Payment Link bana kar daalo. Agar Stripe nahi chahiye to poora block hata sakte ho.

## Step 8 (optional) — Public donation ledger

Donate section ke niche "public ledger" link hai — isko kisi Google Sheet (published as web link) ya Notion page se jod sakte ho jisme donations aur spending track karo. Transparency ke liye accha hai, especially donors ke liye.

---

Bas. Koi backend/server/database nahi chahiye — pura static hai, GitHub Pages free mein host kar dega.

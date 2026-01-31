# SONECA DROPS

E-commerce site for **SONECA DROPS** – Specialty Coffee. Priced like your supermarket trash!

Built with Next.js (Pages Router) and Stripe Checkout. Dark neon / brutalist design. EN/FR. France shipping only.

---

## Quick start

```bash
npm install
cp .env.local.example .env.local
# Edit .env.local with your Stripe keys (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables (Stripe)

Create `.env.local` from `.env.local.example` and set:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | For webhooks (optional) |
| `STRIPE_SHIPPING_PRICE_ID` | **Optional.** Stripe Price ID for 5€ shipping. If set, shipping is added when cart subtotal &lt; 40€. |

**Do not commit `.env.local`.** It is in `.gitignore`.

---

## How to add a new product

Edit **one file**: `products.js`.

1. Duplicate an existing product object.
2. Set:
   - `slug` – URL path (e.g. `my-new-drop`)
   - `name` – e.g. `DROP #004 – My New Drop`
   - `shortDescription`, `longDescription`
   - `tags` – array, e.g. `['espresso', 'chocolatey']`
   - `pricing` – object with `size_250`, `size_500`, `size_1000`. Each has:
     - `priceId` – your **Stripe Price ID** for that size
     - `amount` – price in **cents** (EUR)
   - `currency` – `'EUR'`
   - `subscriptionEnabled` – `true` or `false`
3. Optional: `image`, `origin`, `cooperative`, `variety`, `process`, `altitude`, `tastingNotes`.

**Stripe:** Create a Product in Stripe, then create 3 Prices (250g, 500g, 1kg). Paste each Price ID into `pricing.size_250.priceId`, etc.

No database. No API. Just edit `products.js` and redeploy.

---

## How to change text content

- **UI strings (EN/FR):** Edit `lib/translations.js`. Keys are used in components via `t('key')`. Add or change entries in both `en` and `fr` objects.
- **Slogan / brand:** Update `slogan` in `lib/translations.js` (and any hardcoded brand text if you add it).
- **Legal placeholders:** Edit `pages/legal/terms.js`, `pages/legal/privacy.js`, `pages/legal/mentions.js` and replace `[Company Name]`, `[Address]`, `[Contact email]` with your details.

---

## Email capture (Netlify Forms)

The **Drop alerts** form on the home page uses **Netlify Forms**.

1. **Deploy to Netlify** (drag & drop the `out` folder after `npm run build` and `npm run export`, or connect the repo).
2. In Netlify, the form `name="drop-alerts"` is auto-detected. No extra config needed for basic capture.
3. To see submissions: Netlify dashboard → **Forms** → `drop-alerts`.
4. **Spam:** A honeypot field `bot` is included; Netlify can add reCAPTCHA in Form settings if needed.

If you host elsewhere (e.g. Vercel), you’ll need another solution (e.g. serverless function writing to a list, or a third-party form service). The form still submits via `POST`; you can point `action` to your own endpoint and handle it there.

---

## Shipping (France only)

- **5€** shipping.
- **Free** shipping when cart subtotal ≥ **40€**.
- Shipped within **48h** (display only; configure your fulfillment separately).
- At checkout (cart page), user chooses **Home delivery** or **Pickup point**. If Pickup, they can add notes (e.g. preferred relay). These are sent as Stripe Checkout metadata.

To add the 5€ shipping line in Stripe when subtotal &lt; 40€, create a Stripe Price for “Shipping – 5€” and set `STRIPE_SHIPPING_PRICE_ID` in `.env.local`.

---

## Build & deploy

```bash
npm run build
npm run start
```

For static export (e.g. Netlify):

- Next.js is in default SSR mode; for full static export you’d need `output: 'export'` in `next.config.js` (and no API routes on the same host, or handle them via serverless). The repo is set up for Node deployment (Vercel, Netlify Functions, etc.) so that `/api/checkout_sessions` and `/api/checkout_sessions/[id]` work.

---

## License

MIT.

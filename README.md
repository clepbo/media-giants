# Media Giants Digital Academy

Landing page for the **Social Media Ads Masterclass**, the training arm of [Media Giants Enterprise](https://mediagiantsenterprise.com/).

Plain HTML, CSS and JavaScript. There is no build step and nothing to install, so it deploys to Vercel as-is and is easy to port to WordPress later.

## Editing common things

Most day-to-day changes are in **`assets/js/config.js`**:

| Setting | What it does |
| --- | --- |
| `nextCohort` | Start date for the countdown. The countdown hides itself once the date passes. |
| `whatsapp` | WhatsApp number used by every "WhatsApp" button and the contact form. |
| `communityLink` | Your WhatsApp community invite link. Until it's set, "Join community" opens a WhatsApp chat asking to be added. |
| `paymentLinks.live` / `.recorded` | Paystack or Flutterwave payment-page links. Until they're set, the enroll buttons open WhatsApp with a prefilled enrolment message. |

Page text is in `index.html`; styles and brand colours are in `assets/css/styles.css` (the `:root` tokens at the top).

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy on Vercel

1. In Vercel, choose **Add New → Project** and import this GitHub repo.
2. Framework preset: **Other**. Leave the build command and output directory empty.
3. Deploy. Every push to the production branch redeploys automatically.

### Custom domain

To use a subdomain such as `academy.mediagiantsenterprise.com`:

1. Vercel → Project → **Settings → Domains** → add the subdomain.
2. At your DNS provider (wherever mediagiantsenterprise.com's DNS is managed), add the `CNAME` record Vercel shows you (usually `academy` → `cname.vercel-dns.com`).

The main WordPress site on the root domain is not affected.

If you choose a different domain, update it in `index.html` (canonical, `og:url`, `og:image`), `robots.txt` and `sitemap.xml`.

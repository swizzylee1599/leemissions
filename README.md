# Lee Missions

A responsive static website for the Lee family's ministry in Cambodia, based on the supplied version 5 preview. Original photos, ministry copy, and giving destinations are retained.

## Run locally

From `/workspace/leemissions`, run:

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

No build step or package installation is required. Serve `index.html`, `styles.css`, `script.js`, and `assets/` together on any static website host. Google Fonts and YouTube thumbnails use external services; local font and photo fallbacks keep the page usable without them.

## Edit

Content and giving links are in `index.html`; styling is in `styles.css`; mobile navigation and the copy button are in `script.js`. Photos are optimized WebP assets. Donation processing remains on the linked providers' websites.

## Dedicated donation page

`donate/index.html` is served at `/donate/`. Use your published website domain followed by `/donate/` for Mailchimp donation buttons. The homepage links to this page; its existing `#give` anchor still lands on a giving introduction. Deploy the `donate/` directory with the other site files. Giving destinations and instructions live in `donate/index.html`.

## Latest updates

Edit `updates.js` to add a personal update at the start of `window.leeUpdates`. Each item has `category`, `title`, `text`, and optional `date` (YYYY-MM-DD), `url` (HTTPS), and `linkText`. The channel displays every entry, sorted newest first by date. Each entry also has a unique `id`, an `author`, and optional `image` and `imageAlt` fields. Save and deploy to publish. This is a static site; there is no browser admin editor yet.

The Facebook Page Plugin is loaded only after clicking “Show Facebook posts.” Facebook determines whether this page and viewer can use the embed; login, privacy, or browser restrictions may prevent posts from displaying. A direct Facebook link is always available. Live Facebook retrieval has not been verified in the cloud environment. Do not represent the manually edited updates as an automatic feed.

## Languages and contact

Both pages default to English and offer French and Korean. `i18n.js` contains reviewed-in-code translation strings and preserves the user's language choice between pages. New update text needs entries in this dictionary to appear in French/Korean; otherwise it remains in its original language. Proper names and the payment providers' required account labels remain unchanged. External donation providers and Facebook posts are not translated by this website. Browser checks cover switching, returning to English, cross-page persistence and responsive layout; translations have not had independent native-speaker review.

Contact details are in the homepage's `#contact` section. WhatsApp uses `https://wa.me/85569911705`; email uses a mailto link. KakaoTalk is displayed as supplied (+213 5009676), with no invented chat URL. The shared feed/database/admin project has been deferred at the owner's request; current updates are file-based, and Facebook is an optional embed.

The current channel is a read-only chronological feed published with the static site. New posts appear after a deployment; it is not a realtime backend or automatic Facebook import. Facebook is linked separately. The first draft post is dated 12 October 2026.

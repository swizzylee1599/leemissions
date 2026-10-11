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

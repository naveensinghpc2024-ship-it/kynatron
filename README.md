# Kynatron Technologies — Website

Production-ready website for Kynatron Technologies, an industrial automation company manufacturing data loggers, monitoring systems, and control solutions. Based in Hyderabad, India.

## Live Site Structure
```
kynatron/
├── index.html          Home — hero, trust signals, why us, featured product, dashboard demo
├── about.html          Company story, mission, values, certifications
├── products.html       GM-DL Pro (flagship), GM-SCADA platform, product grid
├── services.html       6 service areas + industries served
├── contact.html        Email, phone, address + inquiry CTA
├── dashboard-demo.html Interactive SCADA dashboard (Highcharts, live data simulation)
├── css/style.css       Complete responsive stylesheet
├── js/main.js          Mobile menu, scroll animations, back-to-top
└── images/             Product photos, datasheet pages, logo
    ├── gm-dl-pro.jpg
    ├── gm-dl-lite.png
    ├── gm-plc.png
    ├── gm-scada-gateway.png
    ├── gm-dl-pro-datasheet-p1.png
    ├── gm-dl-pro-datasheet-p2.png
    └── logo.jpg
```

## Deployment
1. Push to GitHub → Enable GitHub Pages (Settings → Pages → Source: main branch)
2. Link GoDaddy domain:
   - A records → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - CNAME (www) → yourusername.github.io
3. Add custom domain in GitHub Pages settings
4. Wait for HTTPS certificate (auto-provisioned)

## Tech Stack
- Pure HTML/CSS/JS — no build step, no dependencies
- Highcharts (CDN) for dashboard charts
- Font Awesome (CDN) for icons
- Responsive design, works on all devices
- Print-optimized for spec sheets

## Contact
contact@kynatron.com

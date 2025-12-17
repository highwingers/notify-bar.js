# notify-bar.js
A lightweight, dependency-free JavaScript notification banner.  Designed for announcements, promotions, and alerts — with optional icons, animations, and weighted rotation.
# notify-bar.js

A lightweight, dependency-free JavaScript notification banner  
Designed for announcements, promotions, and alerts — with optional icons, animations, and weighted rotation.

---

## ✨ Features

- ✅ Zero dependencies (DOMPurify optional)
- ✅ Vanilla JS — no frameworks
- ✅ Weighted random message rotation
- ✅ Forward / backward navigation
- ✅ Font Awesome icon support
- ✅ Auto-injected CSS (no setup required)
- ✅ XSS-safe (when DOMPurify is present)
- ✅ Drop-in usage

---

## 📸 Demo

👉 Live Demo: **https://highwingers.github.io/notify-bar/](https://highwingers.github.io/notify-bar.js/demo.html**  
---

## 🚀 Quick Start

### 1. Add a container
```html
<div id="notify-bar"></div>

<script>
window.SmartAzanNotification = {
    container: "notify-bar",
    data: [
        {
            text: "Follow us on Instagram",
            link: "https://instagram.com",
            icon: "fa-instagram",
            iconClass: "social-instagram",
            weight: 3
        },
        {
            text: "Watch setup tutorials on YouTube",
            link: "https://youtube.com",
            icon: "fa-youtube",
            iconClass: "social-youtube",
            weight: 1
        }
    ]
};
</script>

<script src="notify-bar.js"></script>

🔐 Security & HTML Sanitization

notify-bar.js automatically detects DOMPurify if it’s available.

✔ If DOMPurify is present → HTML is sanitized

✔ If not → plugin still works normally

Optional (Recommended)
<script src="https://unpkg.com/dompurify@3.0.6/dist/purify.min.js"></script>

🎨 Icons & Styling

Uses Font Awesome (optional)

Includes default animation & hover effects

You can override styles freely via CSS


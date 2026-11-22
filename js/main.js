// ===== KYNATRON TECHNOLOGIES - Professional JavaScript =====
// Launch-ready: animations, interactions, scroll reveals

document.addEventListener("DOMContentLoaded", function() {

    // --- Scroll progress bar ---
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const ratio = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
            progressBar.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
        };
        updateProgress();
        window.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress);
    }

    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.getElementById("nav-links");
    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", function() {
            navLinks.classList.toggle("show");
            this.innerHTML = navLinks.classList.contains("show") ? "&#10005;" : "&#9776;";
        });
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("show");
                menuBtn.innerHTML = "&#9776;";
            });
        });
    }

    // --- Active Nav Link ---
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    // --- Navbar scroll effect ---
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        let lastScroll = 0;
        window.addEventListener("scroll", () => {
            if (window.scrollY > 20) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
            lastScroll = window.scrollY;
        }, { passive: true });
    }

    // --- Back to Top Button ---
    const backBtn = document.getElementById("back-to-top");
    if (backBtn) {
        window.addEventListener("scroll", () => {
            backBtn.style.display = window.scrollY > 500 ? "flex" : "none";
        }, { passive: true });
        backBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // --- Scroll Reveal ---
    const revealElements = document.querySelectorAll(".reveal, .stagger-children");
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -60px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // --- Counter animation for stats ---
    const statNumbers = document.querySelectorAll(".stat-number");
    if (statNumbers.length > 0) {
        const animateCounter = (el) => {
            const text = el.textContent.trim();
            const suffix = text.replace(/[\d.,]+/, '');
            const numStr = text.replace(/[^\d.]/g, '');
            const target = parseFloat(numStr);
            
            if (isNaN(target)) return;
            
            const duration = 1800;
            const start = performance.now();
            
            const step = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(target * eased);
                
                if (target >= 1000) {
                    el.textContent = current.toLocaleString() + suffix;
                } else if (text.includes('.')) {
                    el.textContent = (target * eased).toFixed(1) + suffix;
                } else {
                    el.textContent = current + suffix;
                }
                
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = text; // Restore original
                }
            };
            
            requestAnimationFrame(step);
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => statsObserver.observe(el));
    }

    // --- Smooth anchor scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // --- Product image detail dialog ---
    const productDialog = document.querySelector(".product-detail-dialog");
    if (productDialog) {
        const detailImage = productDialog.querySelector(".product-detail-image img");
        const detailTitle = productDialog.querySelector("#product-detail-title");
        const detailCategory = productDialog.querySelector(".product-detail-category");
        const detailSubtitle = productDialog.querySelector(".product-detail-info .subtitle");
        const detailDescription = productDialog.querySelector(".product-detail-description");
        const detailHighlights = productDialog.querySelector(".product-detail-info ul");
        const detailEnquiryLink = productDialog.querySelector(".product-detail-info .product-link");

        document.querySelectorAll(".product-image-trigger").forEach(trigger => {
            trigger.addEventListener("click", () => {
                const productCard = trigger.closest(".product-card");
                const productInfo = productCard && productCard.querySelector(".product-info");
                const productImage = trigger.querySelector("img");
                if (!productInfo || !productImage) return;

                detailImage.src = productImage.currentSrc || productImage.src;
                detailImage.alt = productImage.alt;
                detailTitle.textContent = productInfo.querySelector("h3").textContent;
                detailCategory.textContent = productInfo.querySelector(".product-category").textContent;
                detailSubtitle.textContent = productInfo.querySelector(".subtitle").textContent;
                detailDescription.textContent = Array.from(productInfo.children)
                    .find(element => element.tagName === "P" && !element.classList.contains("subtitle")).textContent;
                detailHighlights.replaceChildren(...Array.from(
                    productInfo.querySelectorAll("ul li"),
                    highlight => highlight.cloneNode(true)
                ));
                detailEnquiryLink.setAttribute("aria-label", `Enquire about ${detailTitle.textContent}`);
                detailEnquiryLink.firstChild.textContent = `Enquire about ${detailTitle.textContent} `;
                productDialog.showModal();
            });
        });

        productDialog.querySelector(".product-detail-close").addEventListener("click", () => {
            productDialog.close();
        });

        productDialog.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                event.preventDefault();
                productDialog.close();
            }
        });

        productDialog.addEventListener("click", event => {
            if (event.target === productDialog) productDialog.close();
        });
    }

});

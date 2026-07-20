const dateElement = document.getElementById("currentDate");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const filterButtons = document.querySelectorAll("[data-filter]");
const filterTargets = document.querySelectorAll("[data-category]");
const aboutDialog = document.querySelector("[data-about-dialog]");
const aboutOpenButton = document.querySelector("[data-about-open]");
const aboutCloseButton = document.querySelector("[data-about-close]");
const lightboxImages = document.querySelectorAll(
    ".detail-page .article-hero figure img, .detail-page .gallery-grid img, .detail-page .feature-gallery img, .detail-page .timeline-gallery img"
);

if (dateElement) {
    dateElement.textContent = new Date().toLocaleDateString("de-DE");
}

if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement) {
            navLinks.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
        }
    });
}

if (aboutDialog && aboutOpenButton && aboutCloseButton) {
    aboutOpenButton.addEventListener("click", () => aboutDialog.showModal());
    aboutCloseButton.addEventListener("click", () => aboutDialog.close());
    aboutDialog.addEventListener("click", (event) => {
        if (event.target === aboutDialog) {
            aboutDialog.close();
        }
    });

    const aboutTeaser = document.querySelector(".about-teaser");
    const footer = document.querySelector(".footer");

    if (aboutTeaser && footer) {
        let positionFrame;
        const updateAboutPosition = () => {
            window.cancelAnimationFrame(positionFrame);
            positionFrame = window.requestAnimationFrame(() => {
                const footerTop = footer.getBoundingClientRect().top;
                const clearance = Math.max(0, window.innerHeight - footerTop + 12);
                aboutTeaser.style.setProperty("--footer-clearance", `${clearance}px`);
            });
        };

        updateAboutPosition();
        window.addEventListener("scroll", updateAboutPosition, { passive: true });
        window.addEventListener("resize", updateAboutPosition);
    }
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((item) => item.classList.remove("is-active"));
        button.classList.add("is-active");

        filterTargets.forEach((target) => {
            target.classList.toggle(
                "is-hidden",
                filter !== "all" && target.dataset.category !== filter
            );
        });
    });
});

if (lightboxImages.length) {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.innerHTML = `
        <button class="lightbox-close" type="button" aria-label="Bild schliessen">Schliessen</button>
        <figure class="lightbox-frame">
            <img src="" alt="">
            <figcaption></figcaption>
        </figure>
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector("img");
    const lightboxCaption = lightbox.querySelector("figcaption");
    const closeButton = lightbox.querySelector(".lightbox-close");

    const closeLightbox = () => {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("has-lightbox");
    };

    const openLightbox = (image) => {
        const caption = image.closest("figure")?.querySelector("figcaption")?.textContent.trim();

        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt || "Vergroessertes Bild";
        lightboxCaption.textContent = caption || image.alt || "";
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("has-lightbox");
        closeButton.focus();
    };

    lightboxImages.forEach((image) => {
        if (image.closest(".waves-logo-wrap")) {
            return;
        }

        image.classList.add("is-zoomable");
        image.tabIndex = 0;
        image.setAttribute("role", "button");
        image.setAttribute("aria-label", "Bild vergroessern");

        image.addEventListener("click", () => openLightbox(image));
        image.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLightbox(image);
            }
        });
    });

    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
            closeLightbox();
        }
    });
}

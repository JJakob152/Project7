const dateElement = document.getElementById("currentDate");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const filterButtons = document.querySelectorAll("[data-filter]");
const posts = document.querySelectorAll("[data-category]");
const newsletterForm = document.querySelector("[data-newsletter-form]");
const formMessage = document.querySelector("[data-form-message]");

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

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((item) => item.classList.remove("is-active"));
        button.classList.add("is-active");

        posts.forEach((post) => {
            post.classList.toggle(
                "is-hidden",
                filter !== "all" && post.dataset.category !== filter
            );
        });
    });
});

if (newsletterForm && formMessage) {
    newsletterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        newsletterForm.reset();
        formMessage.textContent = "Danke, der Newsletter-Platzhalter funktioniert.";
    });
}

const navigationEntry = performance.getEntriesByType("navigation")[0];

if (navigationEntry?.type === "reload") {
    history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    window.addEventListener(
        "pageshow",
        () => {
            window.setTimeout(() => {
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                window.requestAnimationFrame(() => {
                    history.scrollRestoration = "auto";
                });
            }, 0);
        },
        { once: true }
    );
}

const CONTACT_EMAIL = "guilhermetaveiros@hotmail.com";

const emailLabel = document.querySelector("#email-label");

if (CONTACT_EMAIL) {
    emailLabel.textContent = `${CONTACT_EMAIL} ↗`;
}

const header = document.querySelector("#header");
const menuToggle = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#navigation");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Abrir menu" : "Fechar menu"
    );

    navigation.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
});

navigation.querySelectorAll("a").forEach(link =>
    link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");

        navigation.classList.remove("open");
        document.body.classList.remove("menu-open");
    })
);

let ticking = false;

const updateScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 24);
    ticking = false;
};

window.addEventListener(
    "scroll",
    () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScroll);
            ticking = true;
        }
    },
    { passive: true }
);

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(
        entries =>
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            }),
        { threshold: 0.12 }
    );

    revealItems.forEach(item => revealObserver.observe(item));
} else {
    revealItems.forEach(item => item.classList.add("is-visible"));
}
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.querySelector("[data-copy]")?.addEventListener("click", async (event) => {
  const citation = document.querySelector("#citation")?.textContent ?? "";
  try {
    await navigator.clipboard.writeText(citation);
    event.currentTarget.textContent = "Copied";
    setTimeout(() => (event.currentTarget.textContent = "Copy"), 1800);
  } catch {
    event.currentTarget.textContent = "Select text";
  }
});

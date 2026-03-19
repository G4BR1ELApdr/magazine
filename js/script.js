function loadLanguageFile(lang) {
  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById("lang-script");

    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.src = `./js/lang/${lang}.js`;
    script.id = "lang-script";

    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`No se pudo cargar ./js/lang/${lang}.js`));

    document.body.appendChild(script);
  });
}

function applyLanguage() {
  const t = window.lang;
  const currentLang = localStorage.getItem("language") || "es";

  document.documentElement.lang = currentLang;

  document.getElementById("brand").textContent = t.brand;

  document.getElementById("nav-home").textContent = t.nav.home;
  document.getElementById("nav-about").textContent = t.nav.about;
  document.getElementById("nav-news").textContent = t.nav.news;
  document.getElementById("nav-contact").textContent = t.nav.contact;
  document.getElementById("nav-cta").textContent = t.nav.cta;

  document.getElementById("hero-title").textContent = t.hero.title;
  document.getElementById("hero-text").textContent = t.hero.text;
  document.getElementById("hero-meta").textContent = t.hero.meta;

  document.getElementById("featured-tag").textContent = t.featured.tag;
  document.getElementById("featured-title").textContent = t.featured.title;
  document.getElementById("featured-text").textContent = t.featured.text;
  document.getElementById("featured-meta").textContent = t.featured.meta;

  document.getElementById("stories-section-title").textContent = t.storiesSection.title;

  t.stories.forEach((story, index) => {
    document.getElementById(`story-${index}-tag`).textContent = story.tag;
    document.getElementById(`story-${index}-title`).textContent = story.title;
    document.getElementById(`story-${index}-date`).textContent = story.date;
  });

  document.getElementById("popular-title").textContent = t.popularSection.title;

  t.popularSection.items.forEach((item, index) => {
    document.getElementById(`popular-${index}`).textContent = item;
  });

  document.getElementById("newsletter-title").textContent = t.newsletter.title;
  document.getElementById("newsletter-text").textContent = t.newsletter.text;
  document.getElementById("newsletter-input").placeholder = t.newsletter.placeholder;
  document.getElementById("newsletter-button").textContent = t.newsletter.button;

  document.getElementById("footer-copy").textContent = t.footer.copy;
  document.getElementById("footer-instagram").textContent = t.footer.instagram;
  document.getElementById("footer-behance").textContent = t.footer.behance;
  document.getElementById("footer-linkedin").textContent = t.footer.linkedin;

  document.getElementById("language-switcher").textContent = currentLang === "es" ? "EN" : "ES";
}

async function setLanguage(lang) {
  localStorage.setItem("language", lang);
  await loadLanguageFile(lang);
  applyLanguage();
}

document.addEventListener("DOMContentLoaded", async () => {
  const savedLanguage = localStorage.getItem("language") || "es";
  await setLanguage(savedLanguage);

  document.getElementById("language-switcher").addEventListener("click", async () => {
    const currentLang = document.documentElement.lang;
    const nextLang = currentLang === "es" ? "en" : "es";
    await setLanguage(nextLang);
  });
});
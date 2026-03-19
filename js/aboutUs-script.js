function loadLanguageFile(lang) {
  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById("lang-script");
    if (existingScript) existingScript.remove();

    const script = document.createElement("script");
    script.src = `./js/lang/${lang}.js`;
    script.id = "lang-script";

    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`No se pudo cargar ./js/lang/${lang}.js`));

    document.body.appendChild(script);
  });
}

function renderAbout() {
  const t = window.lang;
  const currentLang = localStorage.getItem("language") || "es";

  document.documentElement.lang = currentLang;

  document.getElementById("brand").textContent = t.brand;
  document.getElementById("nav-home").textContent = t.nav.home;
  document.getElementById("nav-about").textContent = t.nav.about;
  document.getElementById("nav-news").textContent = t.nav.news;
  document.getElementById("nav-contact").textContent = t.nav.contact;
  document.getElementById("nav-cta").textContent = t.nav.cta;

  document.getElementById("about-tag").textContent = t.aboutPage.tag;
  document.getElementById("about-title").textContent = t.aboutPage.title;
  document.getElementById("about-text").textContent = t.aboutPage.text;

  t.aboutPage.cards.forEach((card, index) => {
    document.getElementById(`about-card-${index}-number`).textContent = card.number;
    document.getElementById(`about-card-${index}-title`).textContent = card.title;
    document.getElementById(`about-card-${index}-text`).textContent = card.text;
  });

  document.getElementById("about-highlight-tag").textContent = t.aboutPage.highlight.tag;
  document.getElementById("about-highlight-title").textContent = t.aboutPage.highlight.title;
  document.getElementById("about-highlight-text-1").textContent = t.aboutPage.highlight.text1;
  document.getElementById("about-highlight-text-2").textContent = t.aboutPage.highlight.text2;

  document.getElementById("footer-copy").textContent = t.footer.copy;
  document.getElementById("footer-instagram").textContent = t.footer.instagram;
  document.getElementById("footer-behance").textContent = t.footer.behance;
  document.getElementById("footer-linkedin").textContent = t.footer.linkedin;

  document.getElementById("language-switcher").textContent = currentLang === "es" ? "EN" : "ES";
}

async function setLanguage(lang) {
  localStorage.setItem("language", lang);
  await loadLanguageFile(lang);
  renderAbout();
}

document.addEventListener("DOMContentLoaded", async () => {
  const savedLanguage = localStorage.getItem("language") || "es";
  await setLanguage(savedLanguage);

  document.getElementById("language-switcher").addEventListener("click", async () => {
    const nextLang = document.documentElement.lang === "es" ? "en" : "es";
    await setLanguage(nextLang);
  });
});
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

function renderNews() {
  const t = window.lang;
  const currentLang = localStorage.getItem("language") || "es";

  document.documentElement.lang = currentLang;

  document.getElementById("brand").textContent = t.brand;
  document.getElementById("nav-home").textContent = t.nav.home;
  document.getElementById("nav-about").textContent = t.nav.about;
  document.getElementById("nav-news").textContent = t.nav.news;
  document.getElementById("nav-contact").textContent = t.nav.contact;
  document.getElementById("nav-cta").textContent = t.nav.cta;

  document.getElementById("news-tag").textContent = t.newsPage.tag;
  document.getElementById("news-title").textContent = t.newsPage.title;
  document.getElementById("news-text").textContent = t.newsPage.text;

  document.getElementById("news-featured-tag").textContent = t.posts["featured-0"].category;
  document.getElementById("news-featured-title").textContent = t.posts["featured-0"].title;
  document.getElementById("news-featured-date").textContent = t.posts["featured-0"].date;

  for (let i = 0; i < 5; i++) {
    const post = t.posts[`story-${i}`];
    document.getElementById(`news-story-${i}-tag`).textContent = post.category;
    document.getElementById(`news-story-${i}-title`).textContent = post.title;
    document.getElementById(`news-story-${i}-date`).textContent = post.date;
  }

  document.getElementById("footer-copy").textContent = t.footer.copy;
  document.getElementById("footer-instagram").textContent = t.footer.instagram;
  document.getElementById("footer-behance").textContent = t.footer.behance;
  document.getElementById("footer-linkedin").textContent = t.footer.linkedin;

  document.getElementById("language-switcher").textContent = currentLang === "es" ? "EN" : "ES";
}

async function setLanguage(lang) {
  localStorage.setItem("language", lang);
  await loadLanguageFile(lang);
  renderNews();
}

document.addEventListener("DOMContentLoaded", async () => {
  const savedLanguage = localStorage.getItem("language") || "es";
  await setLanguage(savedLanguage);

  document.getElementById("language-switcher").addEventListener("click", async () => {
    const nextLang = document.documentElement.lang === "es" ? "en" : "es";
    await setLanguage(nextLang);
  });
});
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

function renderContact() {
  const t = window.lang;
  const currentLang = localStorage.getItem("language") || "es";

  document.documentElement.lang = currentLang;

  document.getElementById("brand").textContent = t.brand;
  document.getElementById("nav-home").textContent = t.nav.home;
  document.getElementById("nav-about").textContent = t.nav.about;
  document.getElementById("nav-news").textContent = t.nav.news;
  document.getElementById("nav-contact").textContent = t.nav.contact;
  document.getElementById("nav-cta").textContent = t.nav.cta;

  document.getElementById("contact-tag").textContent = t.contactPage.tag;
  document.getElementById("contact-title").textContent = t.contactPage.title;
  document.getElementById("contact-text").textContent = t.contactPage.text;
  document.getElementById("contact-info-title").textContent = t.contactPage.infoTitle;
  document.getElementById("contact-form-title").textContent = t.contactPage.formTitle;

  document.getElementById("contact-label-email").textContent = t.contactPage.labels.email;
  document.getElementById("contact-label-instagram").textContent = t.contactPage.labels.instagram;
  document.getElementById("contact-label-linkedin").textContent = t.contactPage.labels.linkedin;
  document.getElementById("contact-label-schedule").textContent = t.contactPage.labels.schedule;

  document.getElementById("contact-value-email").textContent = t.contactPage.values.email;
  document.getElementById("contact-value-instagram").textContent = t.contactPage.values.instagram;
  document.getElementById("contact-value-linkedin").textContent = t.contactPage.values.linkedin;
  document.getElementById("contact-value-schedule").textContent = t.contactPage.values.schedule;

  document.getElementById("contact-name").placeholder = t.contactPage.form.name;
  document.getElementById("contact-email").placeholder = t.contactPage.form.email;
  document.getElementById("contact-subject").placeholder = t.contactPage.form.subject;
  document.getElementById("contact-message").placeholder = t.contactPage.form.message;
  document.getElementById("contact-button").textContent = t.contactPage.form.button;

  document.getElementById("footer-copy").textContent = t.footer.copy;
  document.getElementById("footer-instagram").textContent = t.footer.instagram;
  document.getElementById("footer-behance").textContent = t.footer.behance;
  document.getElementById("footer-linkedin").textContent = t.footer.linkedin;

  document.getElementById("language-switcher").textContent = currentLang === "es" ? "EN" : "ES";
}

async function setLanguage(lang) {
  localStorage.setItem("language", lang);
  await loadLanguageFile(lang);
  renderContact();
}

document.addEventListener("DOMContentLoaded", async () => {
  const savedLanguage = localStorage.getItem("language") || "es";
  await setLanguage(savedLanguage);

  document.getElementById("language-switcher").addEventListener("click", async () => {
    const nextLang = document.documentElement.lang === "es" ? "en" : "es";
    await setLanguage(nextLang);
  });
});
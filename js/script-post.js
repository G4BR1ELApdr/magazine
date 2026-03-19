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

function renderPost() {
  const t = window.lang;
  const currentLang = localStorage.getItem("language") || "es";
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");
  const post = t.posts?.[postId];

  document.documentElement.lang = currentLang;

  document.getElementById("brand").textContent = t.brand;
  document.getElementById("nav-home").textContent = t.nav.home;
  document.getElementById("nav-about").textContent = t.nav.about;
  document.getElementById("nav-news").textContent = t.nav.news;
  document.getElementById("nav-contact").textContent = t.nav.contact;
  document.getElementById("nav-cta").textContent = t.nav.cta;

  document.getElementById("footer-copy").textContent = t.footer.copy;
  document.getElementById("footer-instagram").textContent = t.footer.instagram;
  document.getElementById("footer-behance").textContent = t.footer.behance;
  document.getElementById("footer-linkedin").textContent = t.footer.linkedin;

  const postCategory = document.getElementById("post-category");
  const postTitle = document.getElementById("post-title");
  const postDate = document.getElementById("post-date");
  const postReadTime = document.getElementById("post-read-time");
  const postAuthor = document.getElementById("post-author");
  const postExcerpt = document.getElementById("post-excerpt");
  const postImage = document.getElementById("post-image");
  const postContent = document.getElementById("post-content");

  if (post) {
    document.title = `${post.title} | Magazine Web`;

    postCategory.textContent = post.category;
    postTitle.textContent = post.title;
    postDate.textContent = post.date;
    postReadTime.textContent = post.readTime;
    postAuthor.textContent = `${t.postLabels.by} ${post.author}`;
    postExcerpt.textContent = post.excerpt;
    postImage.src = post.image;
    postImage.alt = post.title;
    postImage.style.display = "block";
    postContent.innerHTML = post.content;
  } else {
    document.title = t.postLabels.notFound;

    postCategory.textContent = "";
    postTitle.textContent = t.postLabels.notFound;
    postDate.textContent = "";
    postReadTime.textContent = "";
    postAuthor.textContent = "";
    postExcerpt.textContent = "";
    postImage.removeAttribute("src");
    postImage.alt = "";
    postImage.style.display = "none";
    postContent.innerHTML = `<p>${t.postLabels.notFoundText}</p>`;
  }

  document.getElementById("language-switcher").textContent = currentLang === "es" ? "EN" : "ES";
}

async function setLanguage(lang) {
  localStorage.setItem("language", lang);
  await loadLanguageFile(lang);
  renderPost();
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
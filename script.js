const greetingMap = new Map([
  ["af", "Hallo"],
  ["ar", "\u0645\u0631\u062d\u0628\u0627"],
  ["bn", "\u09a8\u09ae\u09b8\u09cd\u0995\u09be\u09b0"],
  ["de", "Hallo"],
  ["en", "Hello"],
  ["es", "Hola"],
  ["fr", "Bonjour"],
  ["hi", "\u0928\u092e\u0938\u094d\u0924\u0947"],
  ["id", "Halo"],
  ["it", "Ciao"],
  ["ja", "\u3053\u3093\u306b\u3061\u306f"],
  ["ko", "\uc548\ub155\ud558\uc138\uc694"],
  ["ms", "Halo"],
  ["nl", "Hallo"],
  ["pl", "Czesc"],
  ["pt", "Ola"],
  ["ru", "\u041f\u0440\u0438\u0432\u0435\u0442"],
  ["sv", "Hej"],
  ["th", "\u0e2a\u0e27\u0e31\u0e2a\u0e14\u0e35"],
  ["tr", "Merhaba"],
  ["uk", "\u0412\u0456\u0442\u0430\u044e"],
  ["ur", "\u0633\u0644\u0627\u0645"],
  ["vi", "Xin chao"],
  ["zh", "\u4f60\u597d"],
]);

const regionGreetingMap = new Map([
  ["zh-TW", "\u4f60\u597d"],
  ["zh-HK", "\u4f60\u597d"],
  ["pt-BR", "Ola"],
  ["pt-PT", "Ola"],
]);

function normalizeLocale(locale) {
  return String(locale || "")
    .trim()
    .replace("_", "-");
}

function resolveGreeting(locales) {
  for (const rawLocale of locales) {
    const locale = normalizeLocale(rawLocale);
    const exact = regionGreetingMap.get(locale);

    if (exact) {
      return exact;
    }

    const language = locale.split("-")[0].toLowerCase();
    const greeting = greetingMap.get(language);

    if (greeting) {
      return greeting;
    }
  }

  return "Hello";
}

const preferredLocales = navigator.languages && navigator.languages.length
  ? navigator.languages
  : [navigator.language];
const greeting = resolveGreeting(preferredLocales);
const title = document.getElementById("hero-title");
const localGreeting = document.getElementById("localGreeting");

if (title && localGreeting) {
  document.documentElement.lang = normalizeLocale(preferredLocales[0]) || "en";
  localGreeting.textContent = greeting;
  title.dataset.size = greeting.length > 6 ? "long" : greeting.length > 3 ? "medium" : "short";
}

const articleToc = document.querySelector(".article-toc");
const tocToggle = document.querySelector(".toc-toggle");
const tocPanel = document.querySelector(".toc-panel");
const tocDots = document.querySelector(".toc-dots");

if (articleToc && tocPanel) {
  const headings = document.querySelectorAll(".article-body h2[id], .article-body h3[id], .article-body h4[id]");

  tocPanel.replaceChildren();

  if (tocDots) {
    tocDots.replaceChildren();
  }

  headings.forEach((heading) => {
    const link = document.createElement("a");
    const level = Number(heading.tagName.slice(1));

    link.className = level === 2 ? "toc-item toc-item-large" : "toc-item toc-item-small";
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    tocPanel.append(link);

    if (tocDots) {
      const dot = document.createElement("span");
      dot.className = level === 2 ? "toc-dot toc-dot-large" : "toc-dot toc-dot-small";
      tocDots.append(dot);
    }
  });
}

if (articleToc && tocToggle) {
  tocToggle.addEventListener("click", () => {
    const isCollapsed = articleToc.classList.toggle("is-collapsed");
    tocToggle.setAttribute("aria-expanded", String(!isCollapsed));
  });
}

const scrollTopButton = document.querySelector(".scroll-top-button");

if (scrollTopButton) {
  const updateScrollTopButton = () => {
    scrollTopButton.classList.toggle("is-visible", window.scrollY > 320);
  };

  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  updateScrollTopButton();
  window.addEventListener("scroll", updateScrollTopButton, { passive: true });
}

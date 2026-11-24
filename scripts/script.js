'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const setInputModality = function (modality) {
  document.documentElement.setAttribute("data-input-modality", modality);
};

setInputModality("pointer");
document.addEventListener("pointerdown", function () { setInputModality("pointer"); }, true);
document.addEventListener("keydown", function (e) {
  if (e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta") return;
  setInputModality("keyboard");
}, true);



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
// const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
// const modalContainer = document.querySelector("[data-modal-container]");
// const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
// const overlay = document.querySelector("[data-overlay]");

// modal variable
// const modalImg = document.querySelector("[data-modal-img]");
// const modalTitle = document.querySelector("[data-modal-title]");
// const modalText = document.querySelector("[data-modal-text]");

// // modal toggle function
// const testimonialsModalFunc = function () {
//   modalContainer.classList.toggle("active");
//   overlay.classList.toggle("active");
// }

// add click event to all modal items
// for (let i = 0; i < testimonialsItem.length; i++) {

//   testimonialsItem[i].addEventListener("click", function () {

//     modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
//     modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
//     modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
//     modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

//     testimonialsModalFunc();

//   });

// }

// add click event to modal close button
// modalCloseBtn.addEventListener("click", testimonialsModalFunc);
// overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    // let selectedValue = this.innerText.toLowerCase();
    // selectValue.innerText = this.innerText;
    // elementToggleFunc(select);
    // filterFunc(selectedValue);

    // Получаем стабильный ключ фильтра из атрибута data-filter-key
    let selectedKey = this.getAttribute("data-filter-key");
    // Обновляем отображаемое значение селекта по ключу перевода
    selectValue.innerText = i18next.t(this.getAttribute("data-i18n-text"));
    elementToggleFunc(select);
    filterFunc(selectedKey);

  });
}

// Элементы, которые нужно фильтровать (например, элементы проектов)
const filterItems = document.querySelectorAll("[data-filter-item]");

// изменения для фильтров

// const filterFunc = function (selectedValue) {

//   for (let i = 0; i < filterItems.length; i++) {

//     if (selectedValue === "все") {
//       filterItems[i].classList.add("active");
//     } else if (selectedValue === filterItems[i].dataset.category) {
//       filterItems[i].classList.add("active");
//     } else {
//       filterItems[i].classList.remove("active");
//     }

//   }

// }

// конец изменений

// Функция фильтрации: сравниваем выбранный стабильный ключ с ключом каждого элемента,
// который хранится в data-category-key.
const filterFunc = function (selectedKey) {
  for (let i = 0; i < filterItems.length; i++) {
    const itemKey = filterItems[i].getAttribute("data-category-key");
    if (selectedKey === "projects_all" || selectedKey === itemKey) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
// let lastClickedBtn = filterBtn[0];
// for (let i = 0; i < filterBtn.length; i++) {

//   filterBtn[i].addEventListener("click", function () {

//     let selectedValue = this.innerText.toLowerCase();
//     selectValue.innerText = this.innerText;
//     filterFunc(selectedValue);

//     lastClickedBtn.classList.remove("active");
//     this.classList.add("active");
//     lastClickedBtn = this;

//   });

// }

// Обработка кликов по кнопкам фильтра для больших экранов.
// Аналогичным способом получаем стабильные ключи.
let lastClickedBtn = filterBtn[0];
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedKey = this.getAttribute("data-filter-key");
    selectValue.innerText = i18next.t(this.getAttribute("data-i18n-text"));
    filterFunc(selectedKey);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}



// contact form variables
// const form = document.querySelector("[data-form]");
// const formInputs = document.querySelectorAll("[data-form-input]");
// const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
// for (let i = 0; i < formInputs.length; i++) {
//   formInputs[i].addEventListener("input", function () {

//     // check form validation
//     if (form.checkValidity()) {
//       formBtn.removeAttribute("disabled");
//     } else {
//       formBtn.setAttribute("disabled", "");
//     }

//   });
// }



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Показывает вкладку по имени (значение атрибута data-page).
// Возвращает false, если такой вкладки нет.
const showPage = function (pageName, scrollToTop) {
  const activePage = document.querySelector('[data-page="' + pageName + '"]');
  if (!activePage) return false;

  pages.forEach(function (page) {
    page.classList.toggle("active", page === activePage);
  });
  navigationLinks.forEach(function (link) {
    const isActive = link.getAttribute("data-page-target") === pageName;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  if (scrollToTop) window.scrollTo(0, 0);
  return true;
};

// Адреса (hash), которые понимает сайт:
//   (пусто) или #resume          - вкладка "Резюме" (по умолчанию)
//   #portfolio                   - вкладка "Портфолио"
//   #portfolio/project_r         - "Портфолио" с открытой модалкой проекта project_r
//   #project_r                   - модалка project_r поверх текущей вкладки; прямой переход открывает CV
// Ключ проекта - значение атрибута data-modal-target. После публикации ссылок его лучше не менять.
const DEFAULT_PAGE = "about";
const PAGE_BY_SLUG = { resume: "about", about: "about", portfolio: "portfolio" };
const SLUG_BY_PAGE = { about: "resume", portfolio: "portfolio" };

// Меняет адрес без перезагрузки страницы: push - новая запись истории, иначе замена текущей.
// Если history API недоступен, откатываемся на location.hash.
const setRoute = function (hash, state, push) {
  const baseUrl = location.pathname + location.search;
  const url = hash ? baseUrl + hash : baseUrl;
  try {
    if (push) history.pushState(state, "", url);
    else history.replaceState(state, "", url);
  } catch (e) {
    if (push) location.hash = hash;
    else location.replace(hash || "#");
  }
};

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function (e) {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;

    const pageName = this.getAttribute("data-page-target");
    if (!showPage(pageName, true)) return;

    e.preventDefault();
    setRoute(this.getAttribute("href"), null, false);
  });
}



// project modal

const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalOverlay = document.querySelector("[data-project-modal-overlay]");
const projectModalBody = document.querySelector("[data-project-modal-body]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalIcon = document.querySelector("[data-project-modal-icon]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close]");
const projectModalContents = document.querySelectorAll("[data-modal-content]");

let currentProjectModalKey = null;
let currentProjectModalOrigin = null;
let currentProjectModalHistoryId = null;
let nextProjectModalHistoryId = 0;
const projectModalOrigins = new Map();

const configureProjectVideo = function (video) {
  video.controls = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = "none";
  video.setAttribute("controlsList", "nodownload noremoteplayback");
  video.setAttribute("disablePictureInPicture", "");
};

const unloadProjectVideo = function (video) {
  video.pause();
  video.currentTime = 0;
  video.removeAttribute("src");
  video.load();
};

projectModalContainer.querySelectorAll(".pm-demo-video").forEach(configureProjectVideo);

// если иконка не загрузилась (например, нет файла), просто прячем её
projectModalIcon.addEventListener("error", function () { projectModalIcon.hidden = true; });

// Поиск по значению атрибута. Ключ может прийти из адреса, поэтому
// не подставляем его в querySelector, а сравниваем напрямую.
const findByAttr = function (nodes, attr, value) {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].getAttribute(attr) === value) return nodes[i];
  }
  return null;
};
const findProjectModalContent = function (key) { return findByAttr(projectModalContents, "data-modal-content", key); };
const findPageNavigationLink = function (pageName) {
  for (let i = 0; i < navigationLinks.length; i++) {
    if (navigationLinks[i].getAttribute("data-page-target") === pageName) return navigationLinks[i];
  }
  return null;
};

const refreshActiveProjectVideos = function () {
  if (!currentProjectModalKey || !projectModalContainer.classList.contains("active")) return;

  const content = findProjectModalContent(currentProjectModalKey);
  if (!content) return;

  content.querySelectorAll("video[data-i18n-data-src]").forEach(function (video) {
    const source = video.getAttribute("data-src");
    if (!source) return;

    video.pause();
    video.currentTime = 0;
    if (video.getAttribute("src") === source) return;

    video.src = source;
    video.load();
  });
};

const hasOwn = function (obj, key) { return Object.prototype.hasOwnProperty.call(obj, key); };

const parseRoute = function (hash) {
  const routeHash = typeof hash === "string" ? hash : location.hash;
  const parts = routeHash.replace(/^#\/?/, "").split("/");
  const slug = parts[0].toLowerCase();

  if (hasOwn(PAGE_BY_SLUG, slug)) {
    const page = PAGE_BY_SLUG[slug];
    const modal = parts[1] && findProjectModalContent(parts[1]) ? parts[1] : null;
    return { page: page, modal: modal, pageSpecified: true };
  }

  const projectKey = parts.length === 1 && findProjectModalContent(parts[0]) ? parts[0] : null;
  return { page: DEFAULT_PAGE, modal: projectKey, pageSpecified: false };
};

// Открывает модалку (только интерфейс, адрес не трогает). Возвращает false, если проекта нет.
const openProjectModal = function (key, trigger) {
  const content = findProjectModalContent(key);

  if (!content) {
    console.warn("Нет блока контента для модалки:", key);
    return false;
  }

  // эта модалка уже открыта (например, сработали и popstate, и hashchange)
  if (currentProjectModalKey === key && projectModalContainer.classList.contains("active")) return true;

  // показываем только нужный блок
  projectModalContents.forEach(function (c) {
    c.classList.toggle("active", c === content);
  });
  projectModalBody.scrollTop = 0;

  // Шапка не зависит от того, есть ли у проекта карточка в портфолио.
  const modalTitle = content.getAttribute("data-modal-title");
  const titleElem = trigger ? trigger.querySelector(".project-title") : null;
  projectModalTitle.textContent = modalTitle || (titleElem ? titleElem.textContent : trigger ? trigger.textContent.trim() : "");

  const iconSrc = content.getAttribute("data-modal-icon");
  if (iconSrc) {
    projectModalIcon.hidden = false;
    projectModalIcon.src = iconSrc;
  } else {
    projectModalIcon.hidden = true;
  }

  // Не загружаем ролики из предыдущего проекта.
  projectModalContainer.querySelectorAll("video").forEach(function (video) {
    if (!content.contains(video)) unloadProjectVideo(video);
  });

  // Назначаем src только роликам активной модалки.
  content.querySelectorAll("video[data-src]").forEach(function (video) {
    configureProjectVideo(video);
    const source = video.getAttribute("data-src");
    if (video.getAttribute("src") !== source) {
      video.src = source;
      video.load();
    }
  });

  projectModalContainer.classList.add("active");
  projectModalContainer.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  currentProjectModalKey = key;
  projectModalCloseBtn.focus({ preventScroll: true });
  return true;
};

// Закрывает модалку (только интерфейс, адрес не трогает).
const closeProjectModal = function (restoreOrigin) {
  const origin = currentProjectModalOrigin;

  projectModalContainer.classList.remove("active");
  projectModalContainer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  projectModalContainer.querySelectorAll("video").forEach(unloadProjectVideo);

  currentProjectModalKey = null;
  currentProjectModalOrigin = null;
  currentProjectModalHistoryId = null;

  if (restoreOrigin && origin) {
    window.requestAnimationFrame(function () {
      window.scrollTo(origin.scrollX, origin.scrollY);
      if (origin.trigger && document.documentElement.contains(origin.trigger)) {
        origin.trigger.focus({ preventScroll: true });
      }
    });
  }
};

// Закрытие по действию пользователя (крестик, оверлей, Esc).
const requestCloseProjectModal = function () {
  if (!projectModalContainer.classList.contains("active")) return;

  const origin = currentProjectModalOrigin;
  if (origin &&
      currentProjectModalHistoryId !== null &&
      history.state &&
      history.state.projectModalId === currentProjectModalHistoryId) {
    // модалку открыли кликом (запись в историю добавили мы): шаг назад,
    // а саму модалку закроет обработчик popstate
    history.back();
  } else {
    // У прямой ссылки нет исходной позиции; оставляем пользователя на базовом URL её раздела.
    const route = parseRoute();
    const returnPage = origin ? origin.page : route.page;
    const baseHash = returnPage === DEFAULT_PAGE
      ? (route.pageSpecified ? "#" + SLUG_BY_PAGE[returnPage] : "")
      : "#" + SLUG_BY_PAGE[returnPage];
    if (origin) showPage(origin.page, false);
    setRoute(baseHash, null, false);
    closeProjectModal(Boolean(origin));
    if (!origin) {
      const navigationLink = findPageNavigationLink(returnPage);
      if (navigationLink) navigationLink.focus({ preventScroll: true });
    }
  }
};

document.addEventListener("click", function (e) {
  const trigger = e.target.closest ? e.target.closest("[data-modal-target]") : null;
  if (!trigger || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;

  const href = trigger.getAttribute("href");
  if (!href || href.charAt(0) !== "#") return;

  const key = trigger.getAttribute("data-modal-target");
  const route = parseRoute(href);
  if (route.modal !== key || !findProjectModalContent(key)) return;

  e.preventDefault();

  const activePage = document.querySelector("[data-page].active");
  const origin = {
    page: activePage ? activePage.getAttribute("data-page") : DEFAULT_PAGE,
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    trigger: trigger
  };
  const targetPage = route.pageSpecified ? route.page : origin.page;
  if (!showPage(targetPage, false)) return;

  const historyId = ++nextProjectModalHistoryId;
  projectModalOrigins.set(historyId, origin);
  currentProjectModalOrigin = origin;
  currentProjectModalHistoryId = historyId;

  if (openProjectModal(key, trigger)) {
    setRoute(href, { projectModal: true, projectModalId: historyId }, true);
  } else {
    projectModalOrigins.delete(historyId);
    currentProjectModalOrigin = null;
    currentProjectModalHistoryId = null;
  }
});

projectModalCloseBtn.addEventListener("click", requestCloseProjectModal);
projectModalOverlay.addEventListener("click", requestCloseProjectModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") requestCloseProjectModal();
});



// routing: состояние сайта (вкладка + модалка) берётся из адреса

// opts.modal  - применять ли часть адреса про модалку
// opts.scroll - прокручивать ли страницу вверх при смене вкладки
const applyRoute = function (opts) {
  const route = parseRoute();

  const activePage = document.querySelector("[data-page].active");
  if (!activePage || activePage.getAttribute("data-page") !== route.page) {
    showPage(route.page, opts.scroll);
  }

  if (!opts.modal) return;

  if (route.modal) {
    const historyState = history.state;
    const historyId = historyState && historyState.projectModalId;
    const origin = historyId ? projectModalOrigins.get(historyId) : null;

    if (origin) {
      currentProjectModalOrigin = origin;
      currentProjectModalHistoryId = historyId;
    } else if (!projectModalContainer.classList.contains("active")) {
      currentProjectModalOrigin = null;
      currentProjectModalHistoryId = historyId || null;
    }

    openProjectModal(route.modal, currentProjectModalOrigin ? currentProjectModalOrigin.trigger : null);
  } else if (projectModalContainer.classList.contains("active")) {
    closeProjectModal(Boolean(opts.restoreOrigin));
  }
};

// кнопки "Назад"/"Вперёд" и ручное изменение адреса
window.addEventListener("popstate", function () { applyRoute({ modal: true, scroll: false, restoreOrigin: true }); });
window.addEventListener("hashchange", function () { applyRoute({ modal: true, scroll: true, restoreOrigin: false }); });

// При загрузке сразу показываем нужную вкладку (переводы ей не нужны),
// а модалку откроем после загрузки переводов - см. колбэк i18next.init ниже.
applyRoute({ modal: false, scroll: false });



// Автоматический рассчёт времени

const allOtherWorkExperience = 1;
const experienceDateStart = new Date('2024-01-15');
// const currentDate = new Date(); // сегодняшняя дата
const currentDate = new Date('2026-06-15');

function getFullMonthDifference(startDate, endDate) {
  let months;
  months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  months -= startDate.getMonth();
  months += endDate.getMonth();

  // Если текущий день меньше указанного дня, уменьшаем число месяцев
  if (endDate.getDate() < startDate.getDate()) {
    months--;
  }

  return months <= 0 ? 0 : months; // Если результат меньше 0, выводим 0
}

function getFormattedDuration(totalMonths) {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [];

  if (years > 0) {
    // i18next автоматически выбирает нужную форму по значению count
    parts.push(i18next.t('year', { count: years }));
  }
  if (months > 0) {
    parts.push(i18next.t('month', { count: months }));
  }
  return '(' + parts.join(', ') + ')';
}

// Обновляем отображение опыта на странице
function updateWorkExperience() {
  const monthDifference = getFullMonthDifference(experienceDateStart, currentDate);
  const fullWorkExperience = allOtherWorkExperience + monthDifference;
  document.getElementById('fullWorkExperience').textContent = getFormattedDuration(fullWorkExperience);
}



// Работа с библиотекой i18next для локализации сайта

const languageSwitchButtons = document.querySelectorAll("[data-language-switch]");
const languageSwitchGroup = document.querySelector("[data-language-switch-group]");

const getLanguageFromUrl = function () {
  const language = new URLSearchParams(location.search).get("lang");
  if (!language) return undefined;

  const languageCode = language.toLowerCase().split(/[-_]/)[0];
  return languageCode === "ru" || languageCode === "en" ? languageCode : undefined;
};

const getCurrentLanguageCode = function () {
  const language = i18next.resolvedLanguage || i18next.language;
  return language.toLowerCase().split(/[-_]/)[0] === "ru" ? "ru" : "en";
};

const updateLanguageSwitch = function (language) {
  languageSwitchGroup.setAttribute("aria-label", language === "ru" ? "Язык сайта" : "Site language");
  languageSwitchButtons.forEach(function (button) {
    const isActive = button.getAttribute("data-language-switch") === language;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    button.disabled = false;
  });
};

const updateLanguageUrl = function (language) {
  const searchParams = new URLSearchParams(location.search);
  searchParams.set("lang", language);
  const query = searchParams.toString();
  const url = location.pathname + (query ? "?" + query : "") + location.hash;
  history.replaceState(history.state, "", url);
};

languageSwitchButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const language = this.getAttribute("data-language-switch");
    if (language !== "ru" && language !== "en") {
      console.error("Unsupported language selector value:", language);
      return;
    }

    i18next.changeLanguage(language, function (err) {
      if (err) {
        console.error("Failed to change language:", err);
        return;
      }

      updateContent();
      refreshActiveProjectVideos();
      updateWorkExperience();
      document.documentElement.lang = language;
      updateLanguageSwitch(language);
      updateLanguageUrl(language);
    });
  });
});

i18next
  .use(i18nextBrowserLanguageDetector)
  .use(i18nextHttpBackend)
  .init({
    lng: getLanguageFromUrl(),
    // Если язык не определён – используется английский по умолчанию
    fallbackLng: 'en',
    debug: true,
    load: 'languageOnly', // Используем только код языка без региона
    interpolation: {
      escapeValue: false // позволяет вставлять HTML
    },
    detection: {
      // Указываем порядок обнаружения, исключая localStorage и cookie
      order: ['navigator'],
      caches: [] // не кэшировать язык
    },
    backend: {
      // Путь к файлам перевода.
      loadPath: './scripts/translation_{{lng}}.json'
    }
  }, function(err, t) {
    if (err) {
      console.error(err);
      applyRoute({ modal: true, scroll: false }); // прямые ссылки на модалки работают и без переводов
      return;
    }
    // После загрузки переводов обновляем содержимое сайта
    console.log('Current language:', i18next.language);
    updateContent();
    const language = getCurrentLanguageCode();
    document.documentElement.lang = language;
    updateLanguageSwitch(language);
    // открываем модалку из адреса, когда переводы уже подставлены
    applyRoute({ modal: true, scroll: false });
    updateWorkExperience();
  });

// Функция обновления локализованного контента
function updateContent() {
  // Элементы, которым назначен атрибут data-i18n-text, будут заменены на перевод
  // Текстовое содержимое
  document.querySelectorAll('[data-i18n-text]').forEach(function(elem) {
    const key = elem.getAttribute('data-i18n-text');
    elem.innerHTML = i18next.t(key);
  });

  // Ссылки: перевод подставляется в атрибут href
  document.querySelectorAll('[data-i18n-href]').forEach(function (elem) {
    const key = elem.getAttribute('data-i18n-href');
    if (i18next.exists(key)) {
      elem.setAttribute('href', i18next.t(key));
    }
  });

  const updateLocalizedSources = function (selector, keyAttribute, sourceAttribute) {
    document.querySelectorAll(selector).forEach(function (elem) {
      const key = elem.getAttribute(keyAttribute);
      if (!i18next.exists(key)) {
        console.error("Missing localized media source:", key);
        return;
      }

      const source = i18next.t(key);
      if (typeof source !== "string" || source.trim() === "") {
        console.error("Invalid localized media source:", key);
        return;
      }

      elem.setAttribute(sourceAttribute, source);
    });
  };

  updateLocalizedSources("[data-i18n-src]", "data-i18n-src", "src");
  updateLocalizedSources("[data-i18n-data-src]", "data-i18n-data-src", "data-src");
}

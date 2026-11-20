'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



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
    // Обновляем отображаемое значение селекта – берем перевод по ключу из data-i18n
    selectValue.innerText = i18next.t(this.getAttribute("data-i18n"));
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
    selectValue.innerText = i18next.t(this.getAttribute("data-i18n"));
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
    link.classList.toggle("active", link.getAttribute("data-page-target") === pageName);
  });

  if (scrollToTop) window.scrollTo(0, 0);
  return true;
};

// Адреса (hash), которые понимает сайт:
//   (пусто) или #resume          - вкладка "Резюме" (по умолчанию)
//   #portfolio                   - вкладка "Портфолио"
//   #portfolio/project_r         - "Портфолио" с открытой модалкой проекта project_r
// Ключ проекта - значение атрибута data-modal-target. После публикации ссылок его лучше не менять.
const DEFAULT_PAGE = "about";
const PAGE_BY_SLUG = { resume: "about", about: "about", portfolio: "portfolio" };
const SLUG_BY_PAGE = { about: "resume", portfolio: "portfolio" };

// Меняет адрес без перезагрузки страницы: push - новая запись истории, иначе замена текущей.
// Если history API недоступен, откатываемся на location.hash.
const setRoute = function (hash, state, push) {
  const url = hash || location.pathname + location.search;
  try {
    if (push) history.pushState(state, "", url);
    else history.replaceState(state, "", url);
  } catch (e) {
    if (push) location.hash = hash;
    else location.replace(hash || "#");
  }
};

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const pageName = this.getAttribute("data-page-target");
    if (!showPage(pageName, true)) return;

    // вкладки не засоряют историю браузера; у "Резюме" адрес без хэша
    setRoute(pageName === DEFAULT_PAGE ? "" : "#" + SLUG_BY_PAGE[pageName], null, false);
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
const projectModalTriggers = document.querySelectorAll("[data-modal-target]");

let lastProjectModalTrigger = null;
let currentProjectModalKey = null;

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
const findProjectModalTrigger = function (key) { return findByAttr(projectModalTriggers, "data-modal-target", key); };

// Открывает модалку (только интерфейс, адрес не трогает). Возвращает false, если проекта нет.
const openProjectModal = function (key) {
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

  // шапка: название берём с карточки, иконку - из data-modal-icon блока контента
  const trigger = findProjectModalTrigger(key);
  const titleElem = trigger ? trigger.querySelector(".project-title") : null;
  projectModalTitle.textContent = titleElem ? titleElem.textContent : "";

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
  lastProjectModalTrigger = trigger;
  projectModalCloseBtn.focus();
  return true;
};

// Закрывает модалку (только интерфейс, адрес не трогает).
const closeProjectModal = function () {
  projectModalContainer.classList.remove("active");
  projectModalContainer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  projectModalContainer.querySelectorAll("video").forEach(unloadProjectVideo);

  currentProjectModalKey = null;
  if (lastProjectModalTrigger) lastProjectModalTrigger.focus();
};

// Закрытие по действию пользователя (крестик, оверлей, Esc).
const requestCloseProjectModal = function () {
  if (!projectModalContainer.classList.contains("active")) return;

  if (history.state && history.state.projectModal) {
    // модалку открыли кликом (запись в историю добавили мы): шаг назад,
    // а саму модалку закроет обработчик popstate
    history.back();
  } else {
    // открыта по прямой ссылке: "назад" увёл бы с сайта, поэтому просто заменяем адрес
    setRoute("#" + SLUG_BY_PAGE.portfolio, null, false);
    closeProjectModal();
  }
};

for (let i = 0; i < projectModalTriggers.length; i++) {
  projectModalTriggers[i].addEventListener("click", function (e) {
    // Ctrl/Cmd/Shift/средняя кнопка: пусть браузер откроет ссылку (href) в новой вкладке
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;

    e.preventDefault();
    const key = this.getAttribute("data-modal-target");
    if (openProjectModal(key)) {
      // новая запись истории: кнопка "Назад" закроет модалку
      setRoute("#" + SLUG_BY_PAGE.portfolio + "/" + key, { projectModal: true }, true);
    }
  });
}

projectModalCloseBtn.addEventListener("click", requestCloseProjectModal);
projectModalOverlay.addEventListener("click", requestCloseProjectModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") requestCloseProjectModal();
});



// routing: состояние сайта (вкладка + модалка) берётся из адреса

const hasOwn = function (obj, key) { return Object.prototype.hasOwnProperty.call(obj, key); };

const parseRoute = function () {
  const parts = location.hash.replace(/^#\/?/, "").split("/");
  const slug = parts[0].toLowerCase();
  const page = hasOwn(PAGE_BY_SLUG, slug) ? PAGE_BY_SLUG[slug] : DEFAULT_PAGE;

  // модалка бывает только на вкладке "Портфолио" и только для существующего проекта
  const modal = page === "portfolio" && parts[1] && findProjectModalContent(parts[1]) ? parts[1] : null;

  return { page: page, modal: modal };
};

// opts.modal  - применять ли часть адреса про модалку
// opts.scroll - прокручивать ли страницу вверх при смене вкладки
const applyRoute = function (opts) {
  const route = parseRoute();

  const activePage = document.querySelector("[data-page].active");
  if (!activePage || activePage.getAttribute("data-page") !== route.page) {
    showPage(route.page, opts.scroll);
  }

  if (!opts.modal) return;

  if (route.modal) openProjectModal(route.modal);
  else if (projectModalContainer.classList.contains("active")) closeProjectModal();
};

// кнопки "Назад"/"Вперёд" и ручное изменение адреса
window.addEventListener("popstate", function () { applyRoute({ modal: true, scroll: true }); });
window.addEventListener("hashchange", function () { applyRoute({ modal: true, scroll: true }); });

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

i18next
  .use(i18nextBrowserLanguageDetector)
  .use(i18nextHttpBackend)
  .init({
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
      loadPath: './assets_mine/translations/translation_{{lng}}.json'
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
    // открываем модалку из адреса, когда переводы уже подставлены
    applyRoute({ modal: true, scroll: false });
    updateWorkExperience();
  });

// Функция обновления текста на странице
function updateContent() {
  // Элементы, которым назначен атрибут data-i18n, будут заменены на перевод
  // Текстовое содержимое
  document.querySelectorAll('[data-i18n]').forEach(function(elem) {
    const key = elem.getAttribute('data-i18n');
    elem.innerHTML = i18next.t(key);
  });

  // Ссылки: перевод подставляется в атрибут href
  document.querySelectorAll('[data-i18n-href]').forEach(function (elem) {
    const key = elem.getAttribute('data-i18n-href');
    if (i18next.exists(key)) {
      elem.setAttribute('href', i18next.t(key));
    }
  });
}

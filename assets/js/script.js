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

const pageMap = {
  'Резюме': 'about',
  'CV': 'about',
  'Портфолио': 'portfolio',
  'Portfolio': 'portfolio'
};

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const selectedPage = pageMap[this.innerHTML];

    // Удаляем класс active у всех страниц и кнопок
    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.remove("active");
    }
    for (let k = 0; k < navigationLinks.length; k++) {
      navigationLinks[k].classList.remove("active");
    }

    // Активируем выбранную страницу и кнопку
    const activePage = document.querySelector(`[data-page="${selectedPage}"]`);
    if (activePage) {
      activePage.classList.add("active");
      this.classList.add("active");
      window.scrollTo(0, 0);
    }
  });
}



// Автоматический рассчёт времени

const allOtherWorkExperience = 2;
const VIRGroupStart = new Date('2024-01-15');
const currentDate = new Date();

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
  const monthDifference = getFullMonthDifference(VIRGroupStart, currentDate);
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
    if (err) return console.error(err);
    // После загрузки переводов обновляем содержимое сайта
    console.log('Current language:', i18next.language);
    updateContent();
    updateWorkExperience();
  });

// Функция обновления текста на странице
function updateContent() {
  // Элементы, которым назначен атрибут data-i18n, будут заменены на перевод
  document.querySelectorAll('[data-i18n]').forEach(function(elem) {
    const key = elem.getAttribute('data-i18n');
    elem.innerHTML = i18next.t(key);
  });
}

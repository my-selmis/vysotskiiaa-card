'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

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
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

// изменения для фильтров

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "все") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// конец изменений

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const pageMap = {
  'Резюме': 'about',
  'Резюме 2': 'resume',
  'Портфолио': 'portfolio'
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

const currentDate = new Date();
const VIRGroupStart = new Date('2024-01-15');

const allOtherWorkExperience = 2;

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

function getMonthsSpelling(date){
  var fulldate = "(";
  var years = Math.floor(date / 12)
  switch ( years ){
    case 0: break;
    case 1: fulldate += "1 год"; break;
    case 2: fulldate += "2 года"; break;
    case 3: fulldate += "3 года"; break;
    case 4: fulldate += "4 года"; break;
    default: fulldate += years + " лет"; break;
  }
  var months = date % 12;
  if ( years != 0 && months != 0 ) fulldate += ', ';
  switch ( months ){
    case 0: return fulldate + ')';
    case 1: return fulldate + months + ' месяц)';
    case 2: return fulldate + months + ' месяца)';
    case 3: return fulldate + months + ' месяца)';
    case 4: return fulldate + months + ' месяца)';
    case 11: return fulldate + months + ' месяцев)';
    default: return fulldate + months + ' месяцев)';
    }
}

const monthDifference = getFullMonthDifference(VIRGroupStart, currentDate);
const fullWorkExperience = allOtherWorkExperience + monthDifference;

document.getElementById('fullWorkExperience').textContent = getMonthsSpelling(fullWorkExperience);
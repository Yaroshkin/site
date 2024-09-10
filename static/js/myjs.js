function submitForm() {
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('phone');
    var messageInput = document.getElementById('message');

    var name = nameInput.value;
    var email = emailInput.value;
    var phone = phoneInput.value;
    var message = messageInput.value;

    // Проверка заполненности обязательных полей
    var isValid = true;
    if (name.trim() === '') {
        nameInput.style.borderColor = 'red';
        nameInput.setAttribute('placeholder', 'Поле обязательно для ввода');
        isValid = false;
    } else {
        nameInput.style.borderColor = '';
        nameInput.removeAttribute('placeholder');
    }

    // if (email.trim() === '') {
    //     emailInput.style.borderColor = 'red';
    //     emailInput.setAttribute('placeholder', 'Поле обязательно для ввода');
    //     isValid = false;
    // } else {
    //     emailInput.style.borderColor = '';
    //     emailInput.removeAttribute('placeholder');
    // }

    if (phone.trim() === '') {
        phoneInput.style.borderColor = 'red';
        phoneInput.setAttribute('placeholder', 'Поле обязательно для ввода');
        isValid = false;
    } else {
        phoneInput.style.borderColor = '';
        phoneInput.removeAttribute('placeholder');
    }

    if (message.trim() === '') {
        messageInput.style.borderColor = 'red';
        messageInput.setAttribute('placeholder', 'Поле обязательно для ввода');
        isValid = false;
    } else {
        messageInput.style.borderColor = '';
        messageInput.removeAttribute('placeholder');
    }

    // Проверка заполненности всех полей
    if (!isValid) {
        alert('Пожалуйста, заполните все обязательные поля.');
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/contact', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email) + '&phone=' + encodeURIComponent(phone) + '&message=' + encodeURIComponent(message));


    // Сброс только обязательных полей
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    messageInput.value = '';

   
}
$(document).ready(function () {
        // Активація каруселі
        $('#service-carousel').carousel();

        // Зміна активного елемента каруселі кожні 4 секунди
        setInterval(function () {
            $('#service-carousel').carousel('next');
        }, 4000);
    });
// Выберите элемент с текстом
var element = document.querySelector('.fade-in');

// Функция для проверки, виден ли элемент на экране
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Функция, которая будет вызываться при прокрутке страницы
function checkFade() {
  if (isElementInViewport(element)) {
    element.classList.add('fade-in');
    window.removeEventListener('scroll', checkFade);
  }
}

// Запустите проверку при загрузке страницы и при прокрутке
window.addEventListener('load', checkFade);
window.addEventListener('scroll', checkFade);

function openPopup() {
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}
function sanitizePhone(phone) {

        phone = phone.replace(/[^0-9]/g, '');

        if (phone.substring(0, 2) !== '38') {

            phone = '38' + phone;

        }

        return '+' + phone;

}
function submitPopupForm() {
    var nameInput = document.getElementById('popup-name');
    var emailInput = document.getElementById('popup-email');
    var phoneInput = document.getElementById('popup-phone');
    var messageInput = document.getElementById('popup-message');

    var name = nameInput.value;
    var email = emailInput.value;
    var phone = phoneInput.value;
    var message = messageInput.value;

    // Проверка заполненности всех полей
    if (name.trim() === '' || email.trim() === '' || phone.trim() === '' || message.trim() === '') {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    // Отправка данных формы в Telegram бота или другую обработку
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/contact', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email) + '&phone=' + encodeURIComponent(phone) + '&message=' + encodeURIComponent(message));

    phone = phone.replace('');
    
    dataLayer.push({
    'event': 'form_send_ok',
    'phone_number': sanitizePhone(phone),
    'email': email
    });
    
    console.log({
    'event': 'form_send_ok',
    'phone_number': sanitizePhone(phone),
    'email': email
    });
    
    // Сброс полей формы
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    messageInput.value = '';

    // Закрытие попапа
    closePopup();
}
// Add a scroll event listener to the window
        var navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', function() {
            if (window.scrollY > 5) {
                navbar.classList.add('fixed-top-scroll');
            } else {
                navbar.classList.remove('fixed-top-scroll');
            }
        });

        // JavaScript for smooth scrolling and language switch
    document.addEventListener("DOMContentLoaded", function () {
        let navHeight = document.querySelector(".navbar").offsetHeight;

        let headerText = document.querySelector(".nav-container p");

        document.addEventListener("scroll", function () {
            let scrollPosition = window.scrollY;

            if (scrollPosition > navHeight) {
                headerText.style.opacity = "0";
                headerText.style.transition = "opacity 0.5s ease-out";
            } else {
                headerText.style.opacity = "1";
                headerText.style.transition = "opacity 0.5s ease-in";
            }
        });

        // Language switch functionality
        let langUkr = document.getElementById("langUkr");
        let langRus = document.getElementById("langRus");

        langUkr.addEventListener("click", function () {
            // Code to switch to Ukrainian language
        });

        langRus.addEventListener("click", function () {
            // Code to switch to Russian language
        });
    });

    document.addEventListener("scroll", function () {
        const scrollLine = document.querySelector(".scroll-line");
        const scrollLineIcon = document.querySelector(".scroll-line-icon");
        const scrollPercentage = (window.scrollY / (document.body.offsetHeight - window.innerHeight)) * 100;

        scrollLine.style.width = `${scrollPercentage}%`;
        scrollLineIcon.style.left = `${scrollPercentage}%`;
        scrollLineIcon.style.opacity = 1; // Show the icon

        // Apply a transform to move the icon with the scroll line
        scrollLineIcon.style.transform = `translateX(-${scrollPercentage}+10%)`;
    });

    // Обработчик события при прокрутке страницы
    function fadeInOnScroll() {
        const fadeIns = document.querySelectorAll(".fade-in");

        fadeIns.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight * 0.85) {
                element.classList.add("show");
            }
        });
    }

    // Вызов функции при прокрутке
    window.addEventListener("scroll", fadeInOnScroll);
    // Вызов функции при загрузке страницы
    window.addEventListener("DOMContentLoaded", fadeInOnScroll);
     function togglePhoneNumbers() {
            const phoneButton = document.querySelector('.rngst_phone_button');
            phoneButton.classList.toggle('active');
        }
     function openPopup1() {
            document.getElementById("popup1").style.display = "flex";
        }

        function closePopup1() {
            document.getElementById("popup1").style.display = "none";
        }
        function submitPopupForm1() {
            var nameInput = document.getElementById('name');
            var phoneInput = document.getElementById('phone');

            var name = nameInput.value;
            var phone = phoneInput.value;


            // Проверка заполненности всех полей
            if (name.trim() === '' ||  phone.trim() === '' ) {
                alert('Пожалуйста, заполните все поля');
                return;
            }

            // Отправка данных формы в Telegram бота или другую обработку
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/contact1', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send('name=' + encodeURIComponent(name) +  '&phone=' + encodeURIComponent(phone));

            // Сброс полей формы
            nameInput.value = '';
            phoneInput.value = '';


            // Закрытие попапа
            closePopup();
        }
        document.addEventListener("DOMContentLoaded", function() {
            var currentYear = new Date().getFullYear();
            var yearSpan = document.getElementById("current-year");
            if (yearSpan) {
                yearSpan.textContent = currentYear;
            }
        });

            // Получаем текущий URL страницы
        const currentUrl = window.location.pathname;

        // Находим все элементы меню
        const menuItems = document.querySelectorAll('.navbar-nav .nav-item');

        // Проходимся по всем элементам меню и добавляем класс "active" к текущей странице
        menuItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            if (link.getAttribute('href') === currentUrl) {
                item.classList.add('active');
            }
        });
    const kgInput = document.getElementById('kg-input');
    const m3Input = document.getElementById('m3-input');

    kgInput.addEventListener('input', () => {
        kgInput.value = kgInput.value.replace(/\D/g, ''); // Оставляем только цифры
        updateCombinedValue();
    });

    m3Input.addEventListener('input', () => {
        const sanitizedValue = m3Input.value.replace(/[^\d.]/g, ''); // Оставляем только цифры и точки
        const decimalParts = sanitizedValue.split('.');

        if (decimalParts.length > 1) {
            // Ограничиваем количество десятичных мест до одного
            m3Input.value = decimalParts[0] + '.' + decimalParts[1].slice(0, 2);
        } else {
            m3Input.value = sanitizedValue;
        }

        updateCombinedValue();
    });

    function updateCombinedValue() {
        const combinedValue = kgInput.value + ' кг / ' + m3Input.value + ' м³';
        document.getElementById('popup-message').value = combinedValue;
    }

    var swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
            delay: 10000, // Время между слайдами (10 секунд)
            disableOnInteraction: false, // Не останавливать автоплей при взаимодействии
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        simulateTouch: false, // Отключить смахивание мышью
    });

    function submitForm1() {
        var categoryInput = document.getElementById('form-category');
        var kgInput = document.getElementById('kg-input');
        var m3Input = document.getElementById('m3-input');
        var phoneInput = document.getElementById('form-phone');
        var emailInput = document.getElementById('form-email');
    
        var category = categoryInput.value;
        var kg = kgInput.value;
        var m3 = m3Input.value;
        var phone = phoneInput.value;
        var email = emailInput.value;
    
        var message = kg + ' кг / ' + m3 + ' м³';
    
        // Проверка заполненности обязательных полей
        var isValid = true;
    
        if (category.trim() === '') {
            categoryInput.style.borderColor = 'red';
            isValid = false;
        } else {
            categoryInput.style.borderColor = '';
        }
    
        if (kg.trim() === '' || m3.trim() === '') {
            kgInput.style.borderColor = m3Input.style.borderColor = 'red';
            isValid = false;
        } else {
            kgInput.style.borderColor = m3Input.style.borderColor = '';
        }
    
        if (phone.trim() === '') {
            phoneInput.style.borderColor = 'red';
            phoneInput.setAttribute('placeholder', 'Поле обязательно для ввода');
            isValid = false;
        } else {
            phoneInput.style.borderColor = '';
            phoneInput.removeAttribute('placeholder');
        }
    
        if (!isValid) {
            alert('Пожалуйста, заполните все обязательные поля.');
            return;
        }
    
        // Отправка данных на сервер
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/contact', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(
            'name=' + encodeURIComponent(category) +
            '&email=' + encodeURIComponent(email) +
            '&phone=' + encodeURIComponent(phone) +
            '&message=' + encodeURIComponent(message)
        );
    
        // Сброс полей формы
        categoryInput.value = 'Електротовари';
        kgInput.value = '';
        m3Input.value = '';
        phoneInput.value = '';
        emailInput.value = '';
    
        alert('Сообщение отправлено!');
    }
    function scrollToForm() {
        var formElement = document.getElementById('form-block-form');
        var offset = formElement.offsetTop;
        
        window.scrollTo({
            top: offset - 300, // Подкорректируйте значение, чтобы форма была на нужной высоте
            behavior: 'smooth'
        });
    }
    
    function scrollToForm1() {
        var formElement = document.getElementById('form-block-form');
        var offset = formElement.offsetTop;
        
        window.scrollTo({
            top: offset - 300, // Подкорректируйте значение, чтобы форма была на нужной высоте
            behavior: 'smooth'
        });
    }
    
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 4, // Показывать 4 видео одновременно
        spaceBetween: 10, // Уменьшение расстояния между слайдами
        loop: true, // Включение бесконечного цикла
        slidesPerGroup: 1, // Пролистывать по одному слайду за раз
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000, // Время автопролистывания в миллисекундах (5 секунд)
            disableOnInteraction: false, // Продолжать автопролистывание при взаимодействии
        },
    });
    
    
    

function submitContactForm() {
    var nameInput = document.getElementById('name');
    var phoneInput = document.getElementById('phone');
    var messageInput = document.getElementById('message');

    var name = nameInput.value.trim();
    var phone = phoneInput.value.trim();
    var message = messageInput.value.trim();

    var isValid = true;

    // Проверка заполненности обязательных полей
    if (name === '') {
        nameInput.style.borderColor = 'red';
        nameInput.setAttribute('placeholder', 'Поле обязательно для ввода');
        isValid = false;
    } else {
        nameInput.style.borderColor = '';
        nameInput.removeAttribute('placeholder');
    }

    if (phone === '') {
        phoneInput.style.borderColor = 'red';
        phoneInput.setAttribute('placeholder', 'Поле обязательно для ввода');
        isValid = false;
    } else {
        phoneInput.style.borderColor = '';
        phoneInput.removeAttribute('placeholder');
    }

    if (!isValid) {
        alert('Пожалуйста, заполните все обязательные поля.');
        return;
    }

    // Отправка данных на сервер
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/telme', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(
        'name=' + encodeURIComponent(name) +
        '&phone=' + encodeURIComponent(phone) +
        '&message=' + encodeURIComponent(message)
    );

    // Сброс полей формы
    nameInput.value = '';
    phoneInput.value = '';
    messageInput.value = '';

   
}


// Добавляем обработчик события на кнопку
document.addEventListener('DOMContentLoaded', function() {
    var submitButton = document.querySelector('.btn-primary');
    if (submitButton) {
        submitButton.addEventListener('click', submitContactForm);
    }
});


document.addEventListener('DOMContentLoaded', function() {
    var openModalBtn = document.getElementById('openModalBtn');
    var modal = document.getElementById('videoModal');
    var closeModal = document.getElementsByClassName('close')[0];
    var videoPlayer = document.getElementById('videoPlayer');

    // Открытие модального окна
    openModalBtn.onclick = function() {
        modal.style.display = 'block';
        videoPlayer.play(); // Запуск воспроизведения видео
    }

    // Закрытие модального окна
    closeModal.onclick = function() {
        modal.style.display = 'none';
        videoPlayer.pause(); // Приостановка видео
        videoPlayer.currentTime = 0; // Сброс видео до начала
    }

    // Закрытие модального окна при клике вне его содержимого
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            videoPlayer.pause(); // Приостановка видео
            videoPlayer.currentTime = 0; // Сброс видео до начала
        }
    }
});


function scrollToForm2() {
    // Найти элемент формы
    var form = document.querySelector('.form-block-contact');
    if (form) {
        // Прокрутить страницу до элемента формы с небольшим отступом
        window.scrollTo({
            top: form.offsetTop - 250, // Отступ 50 пикселей (можно изменить по необходимости)
            behavior: 'smooth'
        });
    }
}




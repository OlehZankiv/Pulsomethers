window.onload = () => {
    //SLIDER
    var slider = tns({
        container: '.carousel__inner',
        items: 1,
        controls: false,
        dots: false,
        slideBy: 'page',
        nav: false
    });

    document.querySelector('.prev-arrow').addEventListener("click", () => {
        slider.goTo("next");
    });

    document.querySelector('.next-arrow').addEventListener("click", () => {
        slider.goTo("next");
    });

    //TABS
    let tabBtnContainer = document.querySelector(".catalog__tabs"),
        tabBtns = document.querySelectorAll(".catalog__tab"),
        tabs = document.querySelectorAll(".catalog__content");

    function showTab(tab) {
        tab.classList.toggle("catalog__content_active");
    }

    function hideTabs() {
        tabs.forEach((elem) => {
            elem.classList.remove("catalog__content_active");
        });
    }

    function toggleActiveBtn(btn) {
        tabBtns.forEach((elem) => {
            elem.classList.remove("catalog__tab_active");
        });
        btn.classList.add("catalog__tab_active");
    }
    tabBtnContainer.addEventListener("click", (event) => {
        tabBtns.forEach((elem, i) => {
            if (elem === event.target) {
                toggleActiveBtn(elem);
                hideTabs();
                showTab(tabs[i]);
            }
        });
    });

    let left = document.querySelectorAll(".catalog-item__content"),
        right = document.querySelectorAll(".catalog-item__list");

    toggleItemDescr(".catalog-item__link");
    toggleItemDescr(".catalog-item__back");

    function toggleItemDescr(btnAll) {
        btns = document.querySelectorAll(btnAll);
        btns.forEach((item, i) => {
            item.addEventListener("click", function (event) {
                event.preventDefault();
                left[i].classList.toggle("catalog-item__content_active");
                right[i].classList.toggle("catalog-item__list_active");
            });
        });
    }

    //Maps
    let footerMap = document.querySelector(".footer__map"),
        map = document.querySelector(".footer__map iframe");

    footerMap.addEventListener("click", () => {
        map.style.pointerEvents = "auto";
    });

    footerMap.addEventListener("mouseleave", () => {
        map.style.pointerEvents = "none";
    });

    //Modal

    let btnCons = document.querySelectorAll("[data-modal=consultation]"),
        overlay = document.querySelector(".overlay"),
        modalCons = document.querySelector("#consultation"),
        modalOrd = document.querySelector("#order"),
        modalTh = document.querySelector("#thanks"),
        close = document.querySelectorAll(".modal__close");

    btnCons.forEach((item) => {
        item.addEventListener("click", () => {
            fadeIn(overlay, 200, "block");
            fadeIn(modalCons, 200, "flex");
        });
    });

    let btnsBuy = document.querySelectorAll(".button_mini"),
        productsName = document.querySelectorAll(".catalog-item__subtitle"),
        modalOrdDescr = document.querySelector("#order .modal__descr");

    btnsBuy.forEach((elem, i) => {
        elem.addEventListener("click", () => {
            modalOrdDescr.textContent = productsName[i].textContent;
            fadeIn(overlay, 200, "block");
            fadeIn(modalOrd, 200, "flex");
        });
    });


    close.forEach((elem) => {
        elem.addEventListener("click", () => {
            fadeOut(overlay, 200);
            fadeOut(modalCons, 200);
            fadeOut(modalOrd, 200);
            fadeOut(modalTh, 200);
        });
    });

    function fadeIn(elem, ms, display) {
        if (!elem)
            return;

        elem.style.opacity = 0;
        elem.style.filter = "alpha(opacity=0)";
        elem.style.visibility = "visible";

        switch (display) {
            case "block":
                elem.style.display = "block";
                break;
            case "flex":
                elem.style.display = "flex";
                break;
        }

        if (ms) {
            var opacity = 0;
            var timer = setInterval(function () {
                opacity += 50 / ms;
                if (opacity >= 1) {
                    clearInterval(timer);
                    opacity = 1;
                }
                elem.style.opacity = opacity;
                elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
            }, 50);
        } else {
            elem.style.opacity = 1;
            elem.style.filter = "alpha(opacity=1)";
        }
    }

    function fadeOut(elem, ms) {
        if (!elem)
            return;

        if (ms) {
            var opacity = 1;
            var timer = setInterval(function () {
                opacity -= 50 / ms;
                if (opacity <= 0) {
                    clearInterval(timer);
                    opacity = 0;
                    elem.style.display = "none";
                    elem.style.visibility = "hidden";
                }
                elem.style.opacity = opacity;
                elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
            }, 50);
        } else {
            elem.style.opacity = 0;
            elem.style.filter = "alpha(opacity=0)";
            elem.style.display = "none";
            elem.style.visibility = "hidden";
        }
    }


    //Form validation
    function validateForm(selector) {
        $(selector).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите своё имя",
                phone: "Пожалуйста, введите номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введён адрес почты"
                }
            }
        })
    }
    validateForm("#consultation form");
    validateForm("#consultation-form");
    validateForm("#order form");

    //Send message
    $("form").submit(function (event) {
        event.preventDefault();

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");

            fadeOut(modalCons, 1);
            fadeOut(modalOrd, 1);
            fadeIn(modalTh, 200, "flex");
            fadeIn(overlay, 200, "block");

            $("form").trigger("reset");
        });
        return false;
    });
}
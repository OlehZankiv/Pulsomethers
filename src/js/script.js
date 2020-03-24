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
};
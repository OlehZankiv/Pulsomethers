window.onload = () => {
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
};

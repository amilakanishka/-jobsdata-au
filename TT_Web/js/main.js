
'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");


    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Canvas Menu
    $(".canvas__open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("active");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("active");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    //Search Switch
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    /*------------------
		Navigation
	--------------------*/
    $(".header__menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*--------------------------
        Testimonial Slider
    ----------------------------*/
    $(".car__item__pic__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false
    });

    /*-----------------------
		Range Slider
	------------------------ */
    var rangeSlider = $(".salary-range");
    rangeSlider.slider({
        range: true,
        min: 1,
        max: 100000,
        values: [1000, 3200],
        slide: function (event, ui) {
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1] + "");
        }
    });
    $("#amount").val("$" + $(".salary-range").slider("values", 0) + " - $" + $(".salary-range").slider("values", 1) + "");

    var jobSlider = $(".job-salary-range");
    jobSlider.slider({
        range: true,
        min: 1,
        max: 4000,
        values: [900, 3000],
        slide: function (event, ui) {
            $("#salaryamount").val("$" + ui.values[0] + " - $" + ui.values[1] + "");
        }
    });
    $("#jobamount").val("$" + $(".job-salary-range").slider("values", 0) + " - $" + $(".salary-range-range").slider("values", 1) + ".100");

    var filterSlider = $(".filter-price-range");
    filterSlider.slider({
        range: true,
        min: 1,
        max: 1200000,
        values: [180000, 1000000],
        slide: function (event, ui) {
            $("#filterAmount").val("[ " + "$" + ui.values[0] + " - $" + ui.values[1] + " ]");
        }
    });
    $("#filterAmount").val("[ " + "$" + $(".filter-price-range").slider("values", 0) + " - $" + $(".filter-price-range").slider("values", 1) + " ]");

    /*--------------------------
        Select
    ----------------------------*/
    $("select").niceSelect();

    /*------------------
		Single Product
	--------------------*/
    $('.job-thumbs-track .ct').on('click', function () {
        $('.job-thumbs-track .ct').removeClass('active');
        var imgurl = $(this).data('imgbigurl');
        var bigImg = $('.job-big-img').attr('src');
        if (imgurl != bigImg) {
            $('.job-big-img').attr({
                src: imgurl
            });
        }
    });

    /*------------------
        Counter Up
    --------------------*/
    $('.counter-num').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

})(jQuery);
$(document).ready(function () {
    if ($(window).width() <= 767) {
        $(".filter-heading").attr('data-toggle', '');
        $('select[data-id="shortByFilter_web"]').attr('id', '');
        $('select[data-id="shortByFilter_mob"]').attr('id', 'shortByFilter');
    } else {
        $(".filter-heading").attr('data-toggle', 'collapse');
        $(".filter-header-group").show();
        $('select[data-id="shortByFilter_mob"]').attr('id', '');
        $('select[data-id="shortByFilter_web"]').attr('id', 'shortByFilter');
    }

    $(window).resize(function () {
        if ($(window).width() <= 767) {
            $(".filter-heading").attr('data-toggle', '');
            $('select[data-id="shortByFilter_web"]').attr('id', '');
            $('select[data-id="shortByFilter_mob"]').attr('id', 'shortByFilter');
        } else {
            $(".filter-heading").attr('data-toggle', 'collapse');
            $(".filter-header-group").show();
            $('select[data-id="shortByFilter_mob"]').attr('id', '');
            $('select[data-id="shortByFilter_web"]').attr('id', 'shortByFilter');
        }
    });

    $('.filter-heading').click(function () {
        if ($(window).width() <= 767) {

            if (!($(this).hasClass('active'))) {
                $('.filter-heading').not($(this)).removeClass('active');
                $(this).addClass('active');
                $('.filter-heading-group').not($(this).next('.filter-heading-group')).slideUp();
                $(this).next('.filter-heading-group').slideDown();

            } else {
                $(this).removeClass('active');
                $(this).next('.filter-heading-group').slideUp();
            }
        }
    });
    $('.filter-header').click(function () {
        if ($(window).width() <= 767) {

            if (!($(this).hasClass('active'))) {
                $(this).addClass('active');
                $(this).next('.filter-header-group').fadeIn();
            } else {
                $(this).removeClass('active');
                $(this).next('.filter-header-group').fadeOut();
            }
        }
    });

    $(document).mouseup(function (e) {
        if ($(window).width() <= 767) {
            var container = $('.side-bar');
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.find('.filter-header').removeClass('active');
                container.find('.filter-header-group').fadeOut();
            }
        }
    })
});

$(document).ready(function () {
    if ($(window).scrollTop() + 80 >= $('.side-bar').offset().top) {
        $('.side-bar-inner').addClass('fixed');
    } else {
        $('.side-bar-inner').removeClass('fixed');
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() + 80 >= $('.side-bar').offset().top) {
            $('.side-bar-inner').addClass('fixed');
        } else {
            $('.side-bar-inner').removeClass('fixed');
        }
    });

    $('#filterSubCategories').on('show.bs.collapse', '.collapse', function () {
        if ($(window).width() <= 767) {
            $('#filterSubCategories').find('.collapse.in').collapse('hide');
        }
    });
});
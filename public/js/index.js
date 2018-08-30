/**
 * Created by Eliket-Grp on 24/07/2018.
 */
$(document).ready(function () {
    //initialize swiper when document ready
    var mySwiper = new Swiper ('.swiper-container', {
        // Optional parameters
        loop: true,
        autoplay: {
            delay: 0,
            autoplay: false
        },
        speed: 0,
        // If we need pagination
        pagination: {
            el: '.swiper-pagination'
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar'
        }



    });
    force.config( { moveEasing: 'easeOutBack' } );
    //force.bindHashes();

    $(document).on('click', '.nav-hamburger', function (e) {
        $('header nav').slideToggle();
    });

    $(document).on('click', 'header nav li a', function (e) {
        e.preventDefault();
        var target = $(e.currentTarget),
            hash = target.attr('href'),
            linkTarget = $(hash);

        if(linkTarget.length){
            var offsetTop = linkTarget.offset().top;
            $('body, html').animate({ 'scrollTop': offsetTop - 64 }, 1000);
        }
    });

    var fixHeader = function () {
        var header = $('#stick-header');
        if($(document).width() < 1024){
            header.removeClass('fixed-header');
            return;
        }

        var height = header.outerHeight(),
            scrollTop = $(window).scrollTop();

        if(height < scrollTop){
            header.addClass('fixed-header')
        }else{
            header.removeClass('fixed-header');
        }
    };


    $(window).on('resize', fixHeader);

    $(window).on('scroll', fixHeader);

    fixHeader();

    $(document).on('submit', '#contact-form', function (e) {
        e.preventDefault();
        var form = $(e.currentTarget),
            data = form.serialize();
        $.post(form.attr('action'), data, function (result) {
            var code = result.code,
                message = result.message;
            form.append($('<div class="alert alert-'+code+'">'+message+'</div>'));
            if('success' === code){
                form.trigger('reset');
            }
            setTimeout(function () {
                $('#contact-form').find('.alert').remove();
            }, 5000);
        });
    })
});
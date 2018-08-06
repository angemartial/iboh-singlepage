/**
 * Created by Eliket-Grp on 24/07/2018.
 */
$(document).ready(function () {
    //initialize swiper when document ready
    var mySwiper = new Swiper ('.swiper-container', {
        // Optional parameters
        loop: true,
        autoplay: {
            delay: 7000,
            autoplay: true
        },
        speed: 5000,
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
    force.bindHashes();


});
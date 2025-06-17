$(document).ready(function () {

    // Função do carousel
$('.owl-carousel').owlCarousel({
    loop: true,
    autoplay: true,
    dots: false,
    autoplayTimeout: 3000,
    responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 }
        }
    })

    // Função do menu de sabores
    $('.btn-menu').click(function(){
        $('.btn-menu').removeClass('active');
        $(this).addClass('active');
        $('.sabores__container__listagem').hide();
        let target = $(this).data('target');
        $(target).fadeIn();
    })

    // Função do Menu Hamburguer
    $('#menu-toggle').click(function(){
        $('.header__container').toggleClass('open');
    })
})
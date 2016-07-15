$(document).ready(function() {
    
    (function () {
        var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
        });
    })();

    (function () {
        $('.deliver__send_link').click( function(e){
            e.preventDefault();
            $("html, body").delay(200).animate({scrollTop: $('#send_mail').offset().top }, 2000);
        });}
    )();

    (function () {
        var tabs = $('.team__tabs');
        var paragraphs = $('.contributer__description');

        tabs.on('click', function(event) {
            console.log(event);
            event.preventDefault();
            tabs.removeClass('team__tabs_active');
            paragraphs.removeClass('contributer__description_active');
            $(this).addClass('team__tabs_active');
            var tab = this;
            tabs.each(function(index, el) {
                if (el === tab) {
                    $(paragraphs[index]).addClass('contributer__description_active');
                }
            });
        });
    })();


    (function () {
        var phone = $('.send-mail_phone');
        phone.inputmask({'mask':'8 (999) 999-99-99'});
    })();

    (function () {
        var questions = $('.questions__item');

	    questions.on('click', function() {
		console.log(this);
		questions.removeClass('questions__item_active');
		$(this).addClass('questions__item_active');
	});
    })();

});

(function () {
    ymaps.ready(init);
    var myMap;

    function init() {
        myMap = new ymaps.Map("map__content", {
            center: [58.612137, 49.589505],
            zoom: 16,
            controls: ['zoomControl']

        });
        myPlacemark = new ymaps.Placemark([58.612137, 49.589505], {
            balloonContent: 'Hipsweet Мы не знаем где находимся!'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/map.png',
            iconImageSize: [42, 59]
        });
        myMap.geoObjects.add(myPlacemark);
        myMap.behaviors.disable('scrollZoom');
    }
})();
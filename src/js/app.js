window.onload = function () {

    console.log('start');

    var navigateDroupdownsItems = document.querySelectorAll('.nav__item_dropdown');
    var changeStatus = function () {
            console.log(this);
            this.classList.toggle('dropdown_is-active');
        };

    for (var i=0; i < navigateDroupdownsItems.length; i++) {
        navigateDroupdownsItems[i].addEventListener('mouseover', changeStatus, 'false');
        navigateDroupdownsItems[i].addEventListener('mouseout', changeStatus, 'false');
    }
    
};

ymaps.ready(init);
    var myMap;

    function init(){     
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



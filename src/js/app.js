window.onload = function () {

    console.log('start');

    var navigateDroupdownsItems = document.getElementsByClassName('nav__item_dropdown');


    for (var i=0; i < navigateDroupdownsItems.length; i++) {
        var changeStatus = function () {
            console.log(this);
            this.classList.toggle('dropdown_is-active');
        };

        navigateDroupdownsItems[i].addEventListener('mouseover', changeStatus, 'false');
        navigateDroupdownsItems[i].addEventListener('mouseout', changeStatus, 'false');
    }
    
};





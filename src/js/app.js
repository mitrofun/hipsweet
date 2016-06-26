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





var menuItems = document.querySelectorAll('.menuitem');

    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener('click',  () => {
            var submenu = menuItem.querySelector('.submenu');
            if (submenu.style.display === 'none') {
                submenu.style.display = 'block';
            } else {
                submenu.style.display = 'none';
            }
        });
    });
import { collapseSection, expandSection } from "../utility/animate-toggle";
import { addCloseListeners, removeCloseListeners } from "../utility/listeners";
import { FlyoutMenu } from "./flyout-nav";

export default function menuToggle() {
    const toggle = document.getElementById("primary-mobile-menu");
    const menu = document.getElementById("site-navigation")
    toggle && toggle.addEventListener('click', toggleMobileMenu);
    const links = document.querySelectorAll('.menu-item a');

    links.forEach(link => link.addEventListener('click', toggleMobileMenu));


    function closeMenu() {
        collapseSection(menu);
        toggle.classList.remove('menu-open')  
        document.body.classList.remove('modal-open');
        removeCloseListeners();   
        // Get all open menus so that submenus are also closed on menu close.
        const openMenu = document.querySelectorAll('.menu-item-has-children.submenu-open');

        openMenu.forEach(openMenu => {
            FlyoutMenu.closeSubMenu(openMenu);
        })
    }

    function toggleMobileMenu() {
        if (toggle.classList.contains('menu-open')) {
            closeMenu()
        } else {
            expandSection(menu);
            document.body.classList.add('modal-open');
            toggle.classList.add('menu-open');
            addCloseListeners(menu, closeMenu, toggle);
        }
    }
}
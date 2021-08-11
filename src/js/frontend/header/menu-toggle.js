import { collapseSection, expandSection } from "../utility/animate-toggle";

export default function menuToggle() {
    const toggle = document.getElementById("primary-mobile-menu");
    const menu = document.getElementById("site-navigation")
    toggle.addEventListener('click', toggleMobileMenu);

    function toggleMobileMenu() {
        if (toggle.classList.contains('menu-open')) {
            collapseSection(menu);
            toggle.classList.remove('menu-open')
        } else {
            expandSection(menu);
            toggle.classList.add('menu-open');
        }
    }
}
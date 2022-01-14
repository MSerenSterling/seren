import { expandSection, collapseSection } from "../utility/animate-toggle";


export default function bindFlyoutMenuListeners() {
    const flyoutToggles = document.querySelectorAll(".toggle-flyout");
    const menuItemsHaveChildren = document.querySelectorAll(".menu-item-has-children");
    
    flyoutToggles.forEach(flyoutToggle =>  {
        flyoutToggle.addEventListener('click', FlyoutMenu.handleClick);
    })
    if (window.innerWidth > 980) {
        menuItemsHaveChildren.forEach(menuItem => {
            menuItem.addEventListener('focusout', FlyoutMenu.handleFocusOut);
            menuItem.addEventListener('mouseenter', FlyoutMenu.isEdge);
        })
    }
}

export const FlyoutMenu = {
    handleFocusOut(e) {
        // Don't close if focus is moving within the same menu
        if (e.relatedTarget && e.relatedTarget.closest('.flyout-menu')) {
            return;
        }
        // Get all open menus so that submenus are also closed on menu close.
        const openMenu = document.querySelectorAll('.menu-item-has-children.submenu-open');
    
        openMenu.forEach(openMenu => {
            // Do not close menu related to click to prevent double firing.
            if (e.relatedTarget && openMenu === e.relatedTarget.closest('.submenu-open')) {
                return
            }
            FlyoutMenu.closeSubMenu(openMenu);
        })
    },
    handleClick(e) {
        console.log(e)
        const menuItem = e.target.classList.contains('menu-item-has-children') ? e.target : e.target.closest('.menu-item-has-children');

        console.log(menuItem)

        if (menuItem.classList.contains('submenu-open')) {
            FlyoutMenu.closeSubMenu(menuItem);
        } else {
            FlyoutMenu.openSubMenu(menuItem);
        }
        e.preventDefault();
    },
    isEdge() {
        let dropdown = this.querySelector('.flyout-menu')
        let dropdownRect = dropdown.getBoundingClientRect()
        let offsetLeft = dropdownRect.left;
        let width = dropdownRect.width;
        let docWidth = window.innerWidth;

        let submenuVisible = (offsetLeft + width <= docWidth);

        if (!submenuVisible) {
            dropdown.classList.add('edge')
        }
    },
    closeSubMenu(menuItem) {
        if (window.innerWidth < 980) {
            collapseSection(menuItem.querySelector('.flyout-menu'))
        }
        menuItem.classList.remove('submenu-open');
        // Aria labels on toggle and toggle-flyout
        this.getAriaElements(menuItem.children);
    },
    openSubMenu(menuItem) {
        if (window.innerWidth < 980) {
            expandSection(menuItem.querySelector('.flyout-menu'))
        }
        this.getAriaElements(menuItem.children);
        menuItem.classList.add('submenu-open');
    },
    getAriaElements(liElements) {
        const ariaElements = [...liElements].filter(child => child.hasAttribute('aria-expanded'));
        this.setAriaExpanded(ariaElements);
    },
    setAriaExpanded(ariaElements) {
        ariaElements.forEach(ariaElement => {
            ariaElement.setAttribute('aria-expanded', ariaElement.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
        })
    }
}


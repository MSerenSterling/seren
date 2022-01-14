export function addCloseListeners(element,callback, toggle = null) {
    escapeListener.addListener(callback);
    clickOutsideListener.addListener(element,callback, toggle)
}

export function removeCloseListeners() {
    escapeListener.removeListener();
    clickOutsideListener.removeListener();
}

// Close on escape
const escapeListener = {
    listener: null,
    addListener(callback) { 
        document.addEventListener('keydown', this.listener = this.handleEscape.bind(callback))},
    handleEscape(e) { 
        console.log(e)
        if(e.key != "Escape") {
            return
        }
        e.preventDefault();
        this(); 
    },
    removeListener() { 
        document.removeEventListener('keydown', this.listener)
    }
}

const clickOutsideListener = {
    toggle: null,
    listener: null,
    element: null,
    addListener(element, callback, toggle) {
        this.toggle = toggle; 
        this.element = element;
        document.addEventListener('click', this.listener = this.handleClick.bind(callback))
    },
    handleClick(e) {
        console.log(e)
        if (clickOutsideListener.element.contains(e.target) || clickOutsideListener.toggle.contains(e.target)) {
            return
        }
        this();
    },
    removeListener() {
        document.removeEventListener('click', this.listener);
    }
}

export default function setHeaderHeightVariable() {
    const header = document.querySelector('.site-header');
    
    document.documentElement.style.setProperty('--headerHeight', `${header.offsetHeight}px`);
}

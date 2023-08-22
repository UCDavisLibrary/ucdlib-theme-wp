/**
 * @description Adjusts the scroll position when an anchor is clicked/hash is changed
 * To account for the fixed header
 */
class anchorAdjustment {

  constructor() {
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        this.adjustScrollPosition();
      }, 150);
    });
    window.addEventListener('hashchange', () => {
      setTimeout(() => {
        this.adjustScrollPosition();
      }, 150);

    });
  }

  /**
   * @description Scrolls to the anchor position after accounting for the header height
   * @returns
   */
  adjustScrollPosition() {
    const hash = window.location.hash;
    if ( !hash ) return;
    const anchor = document.querySelector(hash);
    if ( !anchor ) return;
    const headerHeight = this.getHeaderHeight();
    if ( !headerHeight ) return;
    const anchorPosition = anchor.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: anchorPosition, behavior: 'smooth' });
  }

  /**
   * @description Gets the height of the theme header, which can vary depending on the view
   * @returns {Number}
   */
  getHeaderHeight(){
    const defaultHeaderHeight = 0;
    let headerHeight = defaultHeaderHeight;

    const header = document.querySelector('ucd-theme-header');
    const primaryNav = header?._slottedComponents?.primaryNav;
    if ( !primaryNav ) return defaultHeaderHeight;
    const isMobileView = primaryNav.breakPoints.isMobile();
    if ( isMobileView ){
      const mobileBar = header?.renderRoot?.querySelector?.('.mobile-bar');
      headerHeight = mobileBar ? mobileBar.offsetHeight : defaultHeaderHeight;
    } else {
      headerHeight = (header?.style?.marginBottom || '').replace('px', '') || defaultHeaderHeight;
    }

    return headerHeight;
  }

}

export default new anchorAdjustment();

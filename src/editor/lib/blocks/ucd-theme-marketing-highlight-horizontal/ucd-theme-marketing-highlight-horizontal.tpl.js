import { html, css } from 'lit';
import MarketingHighlightHorizontalStyles from "@ucd-lib/theme-sass/4_component/_marketing-highlight-horizontal.css.js";
import brandStyles from "@ucd-lib/theme-sass/4_component/_category-brand.css.js"
import imageAspectStyles from "@ucd-lib/theme-sass/6_utility/_u-aspect.css.js";

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    .show-placeholder:before {
      content: attr(placeholder);
      position: absolute;
      pointer-events: none;
      opacity: .6;
    }
  `;

  return [
    MarketingHighlightHorizontalStyles,
    brandStyles,
    imageAspectStyles,
    elementStyles];
}

export function render() { 
return html`
  <a class="marketing-highlight-horizontal ${this.brandColor ? "category-brand--"+this.brandColor: ''}">
    <div class="marketing-highlight-horizontal__image aspect--16x9">
      <img src=${this.imgSrc} alt="16x9 Image" loading="lazy" />
    </div>
    ${!this.hideTitle ? html`
      <div class="marketing-highlight-horizontal__body">
        <h3 class="marketing-highlight-horizontal__title">
          <slot 
            id="title-slot"
            class=${this.title ? '' : 'show-placeholder'}
            name="title" 
            placeholder="Write a title..."
            @input=${this._onTitleInput}>${this.title}</slot>
        </h3>
      </div>
    ` : html``}
  </a>

`;}
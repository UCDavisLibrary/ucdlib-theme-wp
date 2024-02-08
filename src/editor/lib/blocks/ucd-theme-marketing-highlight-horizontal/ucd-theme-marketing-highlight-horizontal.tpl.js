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
    .u-background-image {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .show-placeholder:before {
      content: attr(placeholder);
      position: absolute;
      pointer-events: none;
      opacity: .6;
    }
    .marketing-highlight-horizontal--overlay .marketing-highlight-horizontal__title {
      min-width: 275px;
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
  <a class=${this.mainClasses()}>
    <div class="marketing-highlight-horizontal__image">
      <div class="u-background-image aspect--16x9" style=${`background-image:url(${this.imgSrc})`}></div>
    </div>
    ${!this.hideTitle ? html`
      <div class="marketing-highlight-horizontal__body">
        <h5 class="marketing-highlight-horizontal__title">
          <slot
            id="title-slot"
            class=${this.title ? '' : 'show-placeholder'}
            name="title"
            placeholder="Write a title..."
            @input=${this._onTitleInput}>${this.title}</slot>
        </h5>
      </div>
    ` : html``}
  </a>

`;}

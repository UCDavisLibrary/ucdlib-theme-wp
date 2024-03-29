import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import brandStyles from "@ucd-lib/theme-sass/4_component/_category-brand.css.js"
import posterStyles from "@ucd-lib/theme-sass/4_component/_vm-poster.css.js";
import imageAspectStyles from "@ucd-lib/theme-sass/6_utility/_u-aspect.css.js";

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    img {
      max-width: 100%;
      height: auto;
      border-style: none;
    }
    .vm-poster__body-text {
      width: 100%;
    }
    .u-background-image {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .show-placeholder:before {
      content: attr(placeholder);
      position: absolute;
      color: white; 
      pointer-events: none;
      opacity: .6;
  }

  `;

  return [
    brandStyles,
    posterStyles,
    imageAspectStyles,
    elementStyles];
}

export function render() { 
return html`
  <a class=${classMap(this._getBaseClasses())}>
    <div class="aspect--16x9 u-background-image" style=${`background-image:url(${this.imgSrc})`}>
    </div>
    <div class="${this._prefix}__body">
      <div class="${this._prefix}__body-text">
        <h2 class="${this._prefix}__title">
          <slot 
            id="title-slot"
            class=${this.title ? '' : 'show-placeholder'}
            name="title" 
            placeholder="Write a title..."
            @input=${this._onTitleInput}>${this.title}</slot>
        </h2>
        <p>
          <slot 
            id="excerpt-slot"
            class=${this.excerpt ? '' : 'show-placeholder'}
            name="excerpt" 
            placeholder="Write text..."
            @input=${this._onExcerptInput}>${this.excerpt}</slot>
        </p>
      </div>
    </div>
  </a>


`;}
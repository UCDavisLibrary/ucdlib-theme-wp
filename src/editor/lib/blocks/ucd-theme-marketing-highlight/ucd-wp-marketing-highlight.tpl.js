import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import marketingHighlightStyles from "@ucd-lib/theme-sass/4_component/_marketing-highlight.css.js";
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
    .marketing-highlight__image img {
      z-index: 1;
    }
    #badge-slot {
      text-align: right;
    }
    .show-placeholder:before {
      content: attr(placeholder);
      position: absolute;
      pointer-events: none;
      opacity: .6;
    }
    #badge-slot.show-placeholder {
      min-width: 60px;
      width: 60px;
    }
    .no-content ::slotted([slot=badge]) {
      width: 120px;
      min-width: 120px;
    }
  `;

  return [
    marketingHighlightStyles,
    brandStyles,
    imageAspectStyles,
    elementStyles
  ];
}

export function render() { 
return html`
  <a class=${classMap(this._getBaseClasses())}>
    ${this.imgSrc ? html`
      <div class="${this._prefix}__image aspect--4x3 u-background-image" role="img" aria-label=${this.imgAlt} style=${`background-image:url(${this.imgSrc})`}>
        ${this.hideBadge ? html`` : html`
        <h3 class="${this._prefix}__type ${this.badge ? 'has-content': 'no-content'}">
          <slot 
            id="badge-slot"
            class=${this.badge ? '' : 'show-placeholder'}
            name="badge" 
            placeholder="Write text..."
            @input=${this._onBadgeInput}>${this.badge}</slot>
        </h3>
        `}
      </div>
    ` : html``}
    <div class="${this._prefix}__body">
    ${this.hideTitle ? html`` : html`
      <h3 class="${this._prefix}__title">
        <slot 
          id="title-slot"
          class=${this.title ? '' : 'show-placeholder'}
          name="title" 
          placeholder="Write a title..."
          @input=${this._onTitleInput}>${this.title}</slot>
      </h3>
    `}
      ${this.hideExcerpt ? html`` : html`
      <p>
        <slot 
            id="excerpt-slot"
            class=${this.excerpt ? '' : 'show-placeholder'}
            name="excerpt" 
            placeholder="Write text..."
            @input=${this._onExcerptInput}>${this.excerpt}</slot>
      </p>
      `}
      
      ${this.hideButton ? html`` : html`
        <span class="${this._prefix}__cta">
          <slot 
            id="button-slot"
            class=${this.buttonText ? '' : 'show-placeholder'}
            name="button" 
            placeholder="Write text..."
            @input=${this._onButtonTextInput}>${this.buttonText}</slot>
        </span>      
      `}

    </div>
  </a>
`;}
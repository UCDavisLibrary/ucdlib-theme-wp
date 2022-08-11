import { html, css } from 'lit';
import brandStyles from "@ucd-lib/theme-sass/4_component/_category-brand.css.js"
import { classMap } from 'lit/directives/class-map.js';
import heroBannerStyles from "@ucd-lib/theme-sass/4_component/_hero-banner.css.js";

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
    .show-placeholder:before {
      content: attr(placeholder);
      position: absolute;
      pointer-events: none;
      opacity: .6;
    }
    .u-background-image {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .no-image {
      background-color: #73abdd;
    }
    .hero-banner__film {
      background: var(--category-brand, #fff);
      height: 100%;
      grid-area: hero;
      opacity: 60%;
    }
    .hero-banner__body {
      width: auto;
    }
  `;

  return [
    brandStyles,
    heroBannerStyles,
    elementStyles
  ];
}

export function render() { 
return html`
  <section class=${classMap(this._getBaseClasses())}>
    <div class="hero-banner__image u-background-image" style=${this.imgSrc ? `background-image:url(${this.imgSrc})`: ''}></div>
    ${this.color ? html`
      <div class="hero-banner__film"></div>
    ` : html``}
    <div class="hero-banner__body">
      <div class="hero-banner__title">
        <slot 
          id="title-slot"
          class=${this.title ? '' : 'show-placeholder'}
          name="title" 
          placeholder="Write a title..."
          @input=${this._onTitleInput}>${this.title}</slot>
      </div>
      <div class="hero-banner__summary">
        <p>
          <slot 
            id="excerpt-slot"
            class=${this.excerpt ? '' : 'show-placeholder'}
            name="excerpt" 
            placeholder="Write text..."
            @input=${this._onExcerptInput}>${this.excerpt}</slot>
        </p>
      </div>
      <div class="hero-banner__button-group">
        <a class="hero-banner__button">
          <slot 
              id="button-slot"
              class=${this.buttonText ? '' : 'show-placeholder'}
              name="button" 
              placeholder="Write text..."
              @input=${this._onButtonTextInput}>${this.buttonText}</slot>
        </a>
      </div>
    </div>
  </section>

`;}
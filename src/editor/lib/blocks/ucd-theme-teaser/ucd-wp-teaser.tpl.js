import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import headingsStyles from "@ucd-lib/theme-sass/1_base_html/_headings.css.js";
import teaserStyles from "@ucd-lib/theme-sass/4_component/_vm-teaser.css.js"
import brandStyles from "@ucd-lib/theme-sass/4_component/_category-brand.css.js"
import aspectStyles from "@ucd-lib/theme-sass/6_utility/_u-aspect.css.js";

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
    .vm-teaser__figure {
      width: 20%;
      max-width: 135px;
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
  `;

  return [
    headingsStyles,
    brandStyles,
    teaserStyles,
    aspectStyles,
    elementStyles
  ];
}

export function render() { 
return html`
  <article class=${classMap(this._getBaseClasses())}>
    ${!this.hideImage ? html`
    <div class="vm-teaser__figure category">
      <a style=${styleMap({display: 'block', 'background-image': `url(${this.imgSrc})`})} class="aspect--1x1 u-background-image">
      </a>
    </div>
    ` : html``}
    <div class="vm-teaser__body">
      <h3 class="vm-teaser__title"><a>
        ${this.editable ? html`
          <slot 
            id="title-slot"
            class=${this.title ? '' : 'show-placeholder'}
            name="title" 
            placeholder="Write a title..."
            @input=${this._onTitleInput}>${this.title}</slot>
        ` : html`
          <span>${this.title}</span>
        `}
      </a></h3>

      ${!this.hideByline ? html`
        <ul class="vm-teaser__byline">
          ${this.author ? html`
            <li><span class="byline">by ${this.author}</span></li>
          ` : html``}
          ${this.date ? html`
            <li>${this.date}</li>
          ` : html``}
        </ul>
      ` : html``}

      ${!this.hideCategories && this.categories.length ? html`
        <ul class="vm-teaser__categories">
          ${this.categories.map(c => html`
            <li class="vm-teaser__cat-marker ${c.color}">
              <a href=${c.link}>${c.name}</a>
            </li>
          `)}
        </ul>
      ` : html``}

      ${!this.hideExcerpt ? html`
        <div class="vm-teaser__summary">
          ${this.editable ? html`
            <slot 
              id="excerpt-slot"
              class=${this.excerpt ? '' : 'show-placeholder'}
              name="excerpt" 
              placeholder="Write text..."
              @input=${this._onExcerptInput}>${this.excerpt}</slot>
          ` : html`
            <span>${this.excerpt}</span>
          `}
          ` : html``}
        </div>
    </div>
  </article>

`;}
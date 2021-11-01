import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { StyleUtils } from '../../utils';
import headingsStyles from "@ucd-lib/theme-sass/1_base_html/_headings.css.js";
import teaserStyles from "@ucd-lib/theme-sass/4_component/_vm-teaser.css.js"
import brandStyles from "@ucd-lib/theme-sass/4_component/_category-brand.css.js"

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
    .vm-teaser__figure {
      width: 135px;
      height: 135px;
    }
    .vm-teaser__figure img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `;

  return [
    headingsStyles,
    brandStyles,
    teaserStyles,
    StyleUtils.CssUnstyledInput,
    elementStyles
  ];
}

export function render() { 
return html`
  <article class=${classMap(this._getBaseClasses())}>
    ${!this.hideImage ? html`
    <div class="vm-teaser__figure category">
      <a>
        <img src=${this.imgSrc} alt="Thumbnail" width="135" loading="lazy" />
      </a>
    </div>
    ` : html``}
    <div class="vm-teaser__body">
      <h3 class="vm-teaser__title"><a>
        ${this.editable ? html`
          <input 
            type="text" 
            @input=${this._onTitleInput}
            .value=${this.title}
            placeholder="Write a title...">
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
            <ucd-wp-textarea .value=${this.excerpt} @input=${this._onExcerptInput}></ucd-wp-textarea>
          ` : html`
            <span>${this.excerpt}</span>
          `}
          ` : html``}
        </div>
    </div>
  </article>

`;}
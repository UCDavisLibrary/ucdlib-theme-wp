import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { StyleUtils } from '../../utils';
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
  `;

  return [
    brandStyles,
    posterStyles,
    imageAspectStyles,
    StyleUtils.CssUnstyledInput,
    elementStyles];
}

export function render() { 
return html`
  <a class=${classMap(this._getBaseClasses())}>
    <div class="aspect--16x9">
      <img src=${this.imgSrc} width="1280" height="720" loading="lazy" />
    </div>
    <div class="${this._prefix}__body">
      <div class="${this._prefix}__body-text">
        <h2 class="${this._prefix}__title">
        <input 
            type="text" 
            @input=${this._onTitleInput}
            .value=${this.title}
            placeholder="Write a title...">
        </h2>
        <p><ucd-wp-textarea .value=${this.excerpt} @input=${this._onExcerptInput}></ucd-wp-textarea></p>
      </div>
    </div>
  </a>


`;}
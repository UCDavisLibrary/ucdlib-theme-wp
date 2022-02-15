import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import { StyleUtils } from '../../utils';
import brandStyles from "@ucd-lib/theme-sass/4_component/_category-brand.css.js";
import iconStyles from "@ucd-lib/theme-sass/4_component/_icons.css.js";
import panelStyles from "@ucd-lib/theme-sass/4_component/_panel.css.js";
import oBoxStyles from "@ucd-lib/theme-sass/3_objects/_index.css.js";

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }

    ucdlib-icon {
      cursor: pointer;
    }
    .icon {
      display: flex;
      align-items: center;
    }

    a.icon--circle-arrow-right::before {
      color: var(--category-brand, #73abdd);
    }

    ucdlib-icon.panel__custom-icon {
      color: var(--category-brand, #022851)
    }
    .panel__title ucdlib-icon {
      width: 1.6055rem;
      height: 1.6055rem;
      margin-right: .5rem;
    }
    .panel {
      background-color: transparent;
    }
    @media (min-width: 768px) {
      .panel__title ucdlib-icon {
        width: 2.47rem;
        height: 2.47rem;
        margin-right: 1rem;
      }
    }
  `;

  return [
    StyleUtils.CssUnstyledInput,
    brandStyles,
    iconStyles,
    oBoxStyles,
    panelStyles,
    elementStyles
  ];
}

export function render() { 
return html`
<div class=${classMap(this._getBaseClasses())}>
  <h2 class="panel__title">
    <ucdlib-icon 
      @click=${this.dispatchIconChangeRequest}
      icon=${this.icon} 
      class="panel__custom-icon ${this.color}">
    </ucdlib-icon>
    <input 
      type="text" 
      @input=${this._onTitleInput}
      .value=${this.title}
      placeholder="Write a short title...">
  </h2>
  <section>
    <slot></slot>
    ${!this.hideMoreLink ? html`
      <a class="icon icon--circle-arrow-right ${this.color ? `category-brand--${this.color}` : ''}">
      <input 
      type="text" 
      @input=${this._onMoreTextInput}
      .value=${this.moreText}
      placeholder="See More...">
      </a>
    ` : html``}
  </section>
</div>

`;}
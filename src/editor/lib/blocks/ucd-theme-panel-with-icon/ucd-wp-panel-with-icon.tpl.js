import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import brandStyles from "@ucd-lib/theme-sass/4_component/_category-brand.css.js";
import iconStyles from "@ucd-lib/theme-sass/4_component/_icons.css.js";
import panelStyles from "@ucd-lib/theme-sass/4_component/_panel.css.js";
import oBoxStyles from "@ucd-lib/theme-sass/3_objects/_index.css.js";

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
    #title-slot:before {
      left: 35px;
    }
    ::slotted([slot=title]) {
      flex-grow: 1;
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
      min-width: 1.6055rem;
    }
    .panel {
      background-color: transparent;
    }
    .panel--icon .panel__title {
      align-items: center;
    }
    @media (min-width: 768px) {
      .panel__title ucdlib-icon {
        width: 2.47rem;
        height: 2.47rem;
        margin-right: 1rem;
        min-width: 2.47rem;
      }
      #title-slot:before {
        left: 55px;
      }
    }
  `;

  return [
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
    <slot 
      id="title-slot"
      class=${this.title ? '' : 'show-placeholder'}
      name="title" 
      placeholder="Write a title..."
      @input=${this._onTitleInput}>${this.title}</slot>
  </h2>
  <section>
    <slot name="content"></slot>
    ${!this.hideMoreLink ? html`
      <a class="icon icon--circle-arrow-right ${this.color ? `category-brand--${this.color}` : ''}">
      <slot 
        id="more-slot"
        class=${this.moreText ? '' : 'show-placeholder'}
        name="more" 
        placeholder="See More..."
        @input=${this._onMoreTextInput}>${this.moreText}</slot>
      </a>
    ` : html``}
  </section>
</div>

`;}
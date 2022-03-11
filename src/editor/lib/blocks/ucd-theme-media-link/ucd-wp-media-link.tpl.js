import { html, css } from 'lit';

import headingsStyles from "@ucd-lib/theme-sass/1_base_html/_headings.css.js";
import mediaLinkStyles from "@ucd-lib/theme-sass/4_component/_wysiwyg-media-link.css";

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
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
    .media-link__figure {
      width: 135px;
      height: 135px;
    }
  `;

  return [
    headingsStyles,
    mediaLinkStyles,
    elementStyles
  ];
}

export function render() { 
return html`
  <a class="media-link">
    ${ !this.hideImage ? html`
      <div 
        class="media-link__figure u-background-image"
        style=${`background-image:url(${this.imgSrc})`}
        ></div>
    ` : html``}
    <div class="media-link__body">
      <h3 class="media-link__title">
        <slot 
          id="title-slot"
          class=${this.title ? '' : 'show-placeholder'}
          name="title" 
          placeholder="Write a title..."
          @input=${this._onTitleInput}>${this.title}</slot>
      </h3>
      <p>
      <slot 
        id="excerpt-slot"
        class=${this.excerpt ? '' : 'show-placeholder'}
        name="excerpt" 
        placeholder="Write text..."
        @input=${this._onExcerptInput}>${this.excerpt}</slot>
      </p>
    </div>
  </a>

`;}
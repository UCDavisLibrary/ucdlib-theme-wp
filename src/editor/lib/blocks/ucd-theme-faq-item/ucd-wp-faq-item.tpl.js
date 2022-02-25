import { html, css } from 'lit';
import listCss from "@ucd-lib/theme-sass/2_base_class/_lists.css.js";

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
  `;

  return [
    listCss, 
    elementStyles
  ];
}

export function render() { 
return html`
  <ul class="list--${this.listStyle}">
    <li>
    <slot 
      id="question-slot"
      class=${this.question ? '' : 'show-placeholder'}
      name="question" 
      placeholder="Write text..."
      @input=${this._onQuestionInput}>${this.question}</slot>
    </li>
    <li><slot name="answer"></slot></li>
  </ul>


`;}
import { LitElement } from 'lit';
import {render, styles} from "./ucd-wp-faq-item.tpl.js";

import { MainComponentElement, Mixin } from '../../utils';

export default class UcdWpFaqItem extends Mixin(LitElement)
.with(MainComponentElement) {

  static get properties() {
    return {
      question: {type: String},
      listStyle: {type: String, attribute: 'list-style'}
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.question = "";
    this.listStyle = 'accordion';
  }

  updated(props){
    this.updateSlotContent(props, 'question', 'question-slot');
  }

  _onQuestionInput(e){
    this.question = e.target.textContent || "";
    this.dispatchUpdate('question');
  }

}

customElements.define('ucd-wp-faq-item', UcdWpFaqItem);
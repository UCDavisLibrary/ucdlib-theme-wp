import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-trumba-events-filter.tpl.js";
import { loadTrumbaWidgets } from '../lib/trumba.js';
import {Mixin, MainDomElement } from '@ucd-lib/theme-elements/utils/mixins'


export default class UcdlibTrumbaEventsFilter extends Mixin(LitElement)
  .with(MainDomElement) {

  static get properties() {
    return {
      uid : {type: String}
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();

    this.uid = ''+Date.now();
    this.config = {
      eventType : {
        spudId: "trumba_event_type_"+this.uid,
        webName: "uc-davis-colleges-and-schools-libraries",
        teaserBase: "",
        spudType: "filter",
        spudConfig: ""
      },
      textSearch : {
        spudId : "trumba_text_search_"+this.uid,
        webName : "uc-davis-colleges-and-schools-libraries",
        teaserBase : "",
        spudType : "searchlabeled",
        spudConfig : ""
      }
    }

    this.render = render.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    loadTrumbaWidgets(this, this.config);
  }

}

customElements.define('ucdlib-trumba-events-filter', UcdlibTrumbaEventsFilter);
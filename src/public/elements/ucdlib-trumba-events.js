import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-trumba-events.tpl.js";
import { loadTrumbaWidgets } from '../lib/trumba.js';
import {Mixin, MainDomElement } from '@ucd-lib/theme-elements/utils/mixins'

export default class UcdlibTrumbaEvents extends Mixin(LitElement)
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
      main : {
        spudId: "trumba_main_"+this.uid,
        webName: "uc-davis-colleges-and-schools-libraries",
        detailBase: "",
        spudType: "main",
        openInNewWindow: 0
      },
      tabs : {
        spudId : "trumba_tabs_"+this.uid,
        webName : "uc-davis-events",
        teaserBase : "",
        spudType : "tabchooser",
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

customElements.define('ucdlib-trumba-events', UcdlibTrumbaEvents);
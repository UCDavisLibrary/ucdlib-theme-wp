import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-trumba-events-upcoming.tpl.js";
import { loadTrumbaWidgets } from '../lib/trumba.js';
import {Mixin, MainDomElement } from '@ucd-lib/theme-elements/utils/mixins'

export default class UcdlibTrumbaEventsUpcoming extends Mixin(LitElement)
  .with(MainDomElement) {

  static get properties() {
    return {
      uid : {state: true},
      config : {state: true},
      events: {type: Number},
    }
  }

  static get styles() {
    return styles();
  }

  willUpdate(props){
    if ( props.has('events') ){
      this.config = {
        upcoming : {
          spudId: "trumba_upcoming_"+this.uid,
          webName: "uc-davis-colleges-and-schools-libraries",
          detailBase: "/events-and-workshops/",
          spudType: "upcoming",
          openInNewWindow: 0,
          spudConfig : "3 Events with Recurring Events",
          HideFooter : true,
          url : {
            filterfield1 : "34613",
            filter1 : "_628020_628023_628024_675087_628026_675112_675111_659056_711112_675090_628028_628029_676751_628025_628030_639579_628031_628033_676750_628032_",
            events: this.events
          },
        }
      }
    }
  }

  constructor() {
    super();
    this.uid = ''+Date.now();
    this.events = 3;

    this.render = render.bind(this);
  }

  firstUpdated() {
    loadTrumbaWidgets(this, this.config);
  }

}

customElements.define('ucdlib-trumba-events-upcoming', UcdlibTrumbaEventsUpcoming);
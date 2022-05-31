import { html, css } from 'lit';

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
  `;

  return [elementStyles];
}

export function render() { 
return html`

<h2>Calendar Filter</h2>

<div class="trumba-spud" id="trumba_event_type_${this.uid}" data-trumba-spud="trumba_event_type_${this.uid}"></div>

<h2>Search Events</h2>
    
<div class="trumba-spud" id="trumba_text_search_${this.uid}" data-trumba-spud="trumba_text_search_${this.uid}"></div>


`;}